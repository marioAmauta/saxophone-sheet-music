import prisma from "@/db";
import { utApi } from "@/server/uploadthing";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ message: "Invalid authorization header" }, { status: 401 });
    }

    const unusedSheetFiles = await prisma.sheetFile.findMany({
      where: {
        songId: null
      },
      select: {
        id: true,
        key: true
      }
    });

    const unusedAudioFiles = await prisma.audioFile.findMany({
      where: {
        songId: null
      },
      select: {
        id: true,
        key: true
      }
    });

    const filesToDelete = [...unusedSheetFiles, ...unusedAudioFiles];

    const deleteResult = await utApi.deleteFiles(filesToDelete.map((file) => file.key));

    await prisma.sheetFile.deleteMany({
      where: {
        id: {
          in: unusedSheetFiles.map((file) => file.id)
        }
      }
    });

    await prisma.audioFile.deleteMany({
      where: {
        id: {
          in: unusedAudioFiles.map((file) => file.id)
        }
      }
    });

    const deleteFilesCount = deleteResult.deletedCount;

    const message = `${deleteFilesCount} files deleted`;

    console.log({ message });

    return Response.json({ message }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
