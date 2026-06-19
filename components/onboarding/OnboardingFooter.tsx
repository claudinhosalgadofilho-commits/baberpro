import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OnboardingFooter({ isSubmitting }: { isSubmitting?: boolean }) {
  return (
    <div className="rounded-lg border border-[#F2D08B] bg-[#FFF9EF] p-5 dark:bg-card">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-barber-gold/10 text-barber-gold">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <p className="text-lg font-black">Importante</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Você poderá alterar todas essas configurações posteriormente nas configurações do sistema.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" className="h-14 rounded-lg border-slate-300 bg-white px-10 text-base text-slate-950 dark:bg-background dark:text-white">
            <Link href="/cadastro/conta">Voltar</Link>
          </Button>
          <Button type="submit" className="h-14 rounded-lg px-10 text-base" disabled={isSubmitting}>
            Continuar <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
