import { ApiRoutes } from "@/lib/api-routes";

export async function getArtistImages({ artistName }: { artistName: string }) {
  try {
    const searchUrl = ApiRoutes.spotifySearchApi({
      query: `?q=${artistName}&type=artist&limit=1`
    });

    const token = await getAccessToken();

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24 * 3 // 3 days
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch artist images");
    }

    const artistImages = await response.json();

    return artistImages.artists.items[0].images;
  } catch (error) {
    console.error(error);
  }
}

export async function getAlbumImages({ songName, artistName }: { songName: string; artistName: string }) {
  try {
    const searchUrl = ApiRoutes.spotifySearchApi({
      query: `?q=track:${songName} artist:${artistName}&type=track,artist&limit=1`
    });

    const token = await getAccessToken();

    const res = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24 * 3 // 3 days
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch album images");
    }

    const albumImages = await res.json();

    return albumImages.tracks.items[0].album.images;
  } catch (error) {
    console.error(error);
  }
}

async function getAccessToken() {
  try {
    const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
      "base64"
    );

    const res = await fetch(ApiRoutes.spotifyTokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials",
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 // 1 hour
      }
    });

    const token = await res.json();

    return token.access_token;
  } catch (error) {
    console.error(error);
  }
}
