"use client";

import * as React from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color?: string;
  }
>;

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
}

export function ChartContainer({
  className,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

interface ChartTooltipProps {
  content?: React.ReactNode;
}

export function ChartTooltip({ content }: ChartTooltipProps) {
  return content;
}

interface ChartTooltipContentProps {
  nameKey?: string;
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  nameKey,
  hideLabel,
  ...props
}: ChartTooltipContentProps & TooltipProps<ValueType, NameType>) {
  const { active, payload, label } = props;

  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="mb-1 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      )}
      {payload.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm"
          style={{ color: item.color }}
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="font-medium">
            {nameKey ? item.payload[nameKey] : item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
