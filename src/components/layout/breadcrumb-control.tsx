import { Fragment } from "react";

import { BreadcrumbItemType } from "@/lib/types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

type BreadcrumbControlProps = {
  breadcrumbItems: BreadcrumbItemType[];
};

export function BreadcrumbControl({ breadcrumbItems }: BreadcrumbControlProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="justify-center">
        {breadcrumbItems.map(({ label, href }, index) => {
          const key = `${href}-breadcrumb-item`;

          const isLastItem = breadcrumbItems.length === index + 1;

          if (href) {
            return (
              <Fragment key={key}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                </BreadcrumbItem>
                {!isLastItem ? <BreadcrumbSeparator /> : null}
              </Fragment>
            );
          }

          return (
            <BreadcrumbItem key={key}>
              <BreadcrumbPage>{label}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
