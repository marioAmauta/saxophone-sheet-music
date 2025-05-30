import { SongDetail } from "@/app/songs/song-detail";

type SongDetailPageProps = {
  params: Params<{ slug: string }>;
};

export default function SongDetailPage({ params }: SongDetailPageProps) {
  return <SongDetail params={params} songSegment="songs" />;
}
