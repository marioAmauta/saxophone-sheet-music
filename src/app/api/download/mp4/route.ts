import { NextRequest, NextResponse } from "next/server";
import { Innertube, UniversalCache } from "youtubei.js";
import { z } from "zod";

import { getYouTubeVideoId } from "@/lib/utils";

const videoInfoSchema = z.object({
  videoUrl: z.string().url(),
  songName: z.string().min(1, "Song name is required"),
  artistName: z.string().min(1, "Artist name is required")
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    const videoInfo = videoInfoSchema.safeParse(searchParams);

    if (!videoInfo.success) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const innerTube = await Innertube.create({ cache: new UniversalCache(true) });

    const { videoUrl, artistName, songName } = videoInfo.data;

    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const downloadedVideo = await innerTube.download(videoId, {
      quality: "best"
    });

    const fileName = `${songName} - ${artistName}.mp4`;

    return new Response(downloadedVideo, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${fileName}"`
      }
    });
  } catch (error) {
    console.error("Error downloading video:", error);

    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
