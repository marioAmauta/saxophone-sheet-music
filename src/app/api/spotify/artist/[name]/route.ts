import { NextResponse } from "next/server";

async function getAccessToken() {
  try {
    const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
      "base64"
    );

    const res = await fetch(process.env.SPOTIFY_TOKEN_URL!, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials",
      cache: "force-cache",
      next: {
        revalidate: 3600
      }
    });

    const data = await res.json();

    return data.access_token;
  } catch (error) {
    console.error(error);
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params;

    const token = await getAccessToken();

    const searchUrl = `${process.env.SPOTIFY_API_URL}/search?q=${name}&type=artist&limit=1`;

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
