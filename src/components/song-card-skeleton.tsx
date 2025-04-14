export function LoadingCardSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 lg:grid-cols-3">
      <SongCardSkeleton />
      <SongCardSkeleton />
      <SongCardSkeleton />
      <SongCardSkeleton />
      <SongCardSkeleton />
      <SongCardSkeleton />
    </div>
  );
}

function SongCardSkeleton() {
  return (
    <div className="skeleton bg-base-200 flex w-full flex-col gap-4 p-8 shadow-xl">
      <div className="skeleton h-4 w-20 self-end"></div>
      <div className="skeleton h-4 w-32"></div>
      <div className="skeleton h-4 w-52"></div>
      <div className="skeleton h-32 w-full"></div>
    </div>
  );
}
