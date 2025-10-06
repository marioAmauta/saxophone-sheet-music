import prisma from "@/db";

export async function deleteArtist({ artistName }: { artistName: string }) {
  try {
    const foundArtist = await prisma.artist.findUnique({
      where: {
        artistName
      }
    });

    if (foundArtist) {
      const deletedArtist = await prisma.artist.delete({
        where: {
          artistName
        }
      });

      console.log(`Artist with name: ${deletedArtist.artistName} deleted`);
    }
  } catch (error) {
    console.error("Error deleting artist:", error);
  } finally {
    await prisma.$disconnect();
  }
}
