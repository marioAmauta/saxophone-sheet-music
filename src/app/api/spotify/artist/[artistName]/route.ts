import { NextResponse } from "next/server";

import { getAccessToken } from "@/api/spotify/utils";

import { ApiRoutes } from "@/lib/api-routes";

export async function GET(_req: Request, { params }: { params: Promise<{ artistName: string }> }) {
  try {
    const { artistName } = await params;

    const token = await getAccessToken();

    const searchUrl = ApiRoutes.spotifySearchApi({
      query: `?q=${artistName}&type=artist&limit=1`
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
      throw new Error("Failed to fetch artist data");
    }

    const artist = await res.json();

    const artistData = artist.artists.items[0];

    return NextResponse.json({
      genre: artistData.genres[0],
      images: artistData.images
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
