import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors duration-200",
  {
    variants: {
      status: {
        pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        processing: "bg-blue-100 text-blue-800 border border-blue-300",
        shipped: "bg-indigo-100 text-indigo-800 border border-indigo-300",
        delivered: "bg-green-100 text-green-800 border border-green-300",
        cancelled: "bg-red-100 text-red-800 border border-red-300",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

interface StatusChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof statusVariants> {
  label?: string;
}

export function StatusChip({ status, label, className, ...props }: StatusChipProps) {
  return (
    <span className={cn(statusVariants({ status }), className)} {...props}>
      <span
        className={cn(
          "size-2 rounded-full",
          status === "pending" && "bg-yellow-500",
          status === "processing" && "bg-blue-500",
          status === "shipped" && "bg-indigo-500",
          status === "delivered" && "bg-green-500",
          status === "cancelled" && "bg-red-500"
        )}
      />
      {label || status}
    </span>
  );
}
