"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
  className?: string;
  prefixText?: string;
};

export function AppBreadcrumb({
  items,
  className,
  prefixText = "Você está em:",
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {prefixText && <span className="text-sm font-bold">{prefixText}</span>}

      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;

            return (
              <React.Fragment key={item.href ?? item.label ?? i}>
                <BreadcrumbItem>
                  {item.href && !isLast ? (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
