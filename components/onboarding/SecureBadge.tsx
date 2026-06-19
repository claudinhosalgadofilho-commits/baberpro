import { Lock } from "lucide-react";

export function SecureBadge() {
  return (
    <div className="hidden items-center gap-2 text-sm font-bold md:flex">
      <Lock className="h-4 w-4" />
      Ambiente 100% seguro
    </div>
  );
}
