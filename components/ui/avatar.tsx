"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) => (
  <AvatarPrimitive.Root className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
);

const AvatarFallback = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) => (
  <AvatarPrimitive.Fallback
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-barber-navy text-sm font-bold text-white", className)}
    {...props}
  />
);

export { Avatar, AvatarFallback };
