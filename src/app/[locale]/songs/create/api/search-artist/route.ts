import { NextRequest, NextResponse } from "next/server";

import { getArtistsByName } from "@/data-access/artist";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const artistName = searchParams.get("artistName") || "";

  const foundArtists = await getArtistsByName({ artistName });

  return NextResponse.json(foundArtists);
}
