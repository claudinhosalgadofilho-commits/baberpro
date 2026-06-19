import type { ReactNode } from "react";
import type { ComponentType } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FormCard({
  title,
  description,
  icon: Icon,
  iconClass,
  children,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconClass?: string;
  children: ReactNode;
}) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-barber-gold/10 text-barber-gold", iconClass)}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p>
          </div>
        </div>
        <div className="mt-7">{children}</div>
      </CardContent>
    </Card>
  );
}
