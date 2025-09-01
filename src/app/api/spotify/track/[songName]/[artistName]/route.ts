import { NextResponse } from "next/server";

import { getAccessToken } from "@/api/spotify/utils";

import { ApiRoutes } from "@/lib/api-routes";

export async function GET(_req: Request, { params }: { params: Promise<{ songName: string; artistName: string }> }) {
  try {
    const { songName, artistName } = await params;

    const token = await getAccessToken();

    const searchUrl = ApiRoutes.spotifySearchApi({
      query: `?q=track:${songName} artist:${artistName}&type=track,artist&limit=1`
    });

    const res = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "force-cache",
      next: {
        revalidate: 3600 * 12
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch song data");
    }

    const song = await res.json();

    const songData = song.tracks.items[0].album;

    return NextResponse.json({
      images: songData.images
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
