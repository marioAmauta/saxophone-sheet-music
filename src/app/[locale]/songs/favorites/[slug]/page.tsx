import { SongDetail } from "@/app/songs/song-detail";

type FavoriteSongDetailPageProps = {
  params: Params<{ slug: string }>;
};

export default function FavoriteSongDetailPage({ params }: FavoriteSongDetailPageProps) {
  return <SongDetail params={params} songSegment="favoriteSongs" />;
}
