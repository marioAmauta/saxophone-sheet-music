import { ApiRoutes } from "@/lib/api-routes";

export async function getAccessToken() {
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
        revalidate: 3600
      }
    });

    const data = await res.json();

    return data.access_token;
  } catch (error) {
    console.error(error);
  }
}
