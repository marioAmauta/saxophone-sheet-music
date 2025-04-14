import { range } from "@/lib/utils";

import { PageContainer } from "@/components/layout/sections";
import { SongsList } from "@/components/songs-list";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const mockData = range({ start: 0, stop: 4 });

  return (
    <PageContainer>
      <Skeleton className="h-6 w-60 rounded-full" />
      <Separator />
      <div className="flex justify-between">
        <Skeleton className="h-6 w-36 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <SongsList>
        {mockData.map((item) => (
          <div
            key={`app-loading-skeleton-${item}`}
            className="bg-secondary relative flex animate-pulse items-center justify-between gap-4 rounded-lg p-5 shadow-sm transition-colors"
          >
            <div className="flex flex-col gap-4">
              <Skeleton className="bg-background h-5 w-16 rounded-full" />
              <Skeleton className="bg-background h-5 w-40 rounded-full" />
            </div>
            <Skeleton className="bg-background h-5 w-16 self-start rounded-full" />
          </div>
        ))}
      </SongsList>
    </PageContainer>
  );
}
