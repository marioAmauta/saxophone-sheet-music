import { range } from "@/lib/utils";

import { PageContainer } from "@/components/layout/sections";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSongDetail() {
  const mockData = range({ start: 0, stop: 3 });

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-40 rounded-full" />
        <Skeleton className="h-4 w-28 rounded-full" />
        <Skeleton className="h-4 w-24 rounded-full" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-36 rounded-full" />
        <Separator />
      </div>
      <div className="mx-auto grid max-w-(--breakpoint-sm) gap-6 md:gap-8">
        {mockData.map((item) => (
          <Button key={`song-detail-loading-skeleton-${item}`} variant="outline" className="flex gap-4">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-36 rounded" />
          </Button>
        ))}
        <Separator className="md:hidden" />
        <Button variant="outline" className="mx-auto flex w-fit gap-4 md:hidden">
          <Skeleton className="size-5" />
          <Skeleton className="h-5 w-16 rounded" />
        </Button>
      </div>
    </PageContainer>
  );
}
