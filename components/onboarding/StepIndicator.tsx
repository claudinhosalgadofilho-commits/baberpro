import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export const onboardingSteps = [
  { number: 1, title: "Dados da Barbearia", pendingText: "Informações básicas", href: "/cadastro/barbearia" },
  { number: 2, title: "Sua Conta", pendingText: "Plano e acesso", href: "/cadastro/conta" },
  { number: 3, title: "Configurações Iniciais", pendingText: "Preferências básicas", href: "/cadastro/configuracoes-iniciais" },
  { number: 4, title: "Confirmação", pendingText: "Revise e finalize", href: "/cadastro/confirmacao" },
];

export function StepIndicator({ compact = false, currentStep = 3 }: { compact?: boolean; currentStep?: number }) {
  if (compact) {
    return (
      <div className="grid gap-3 md:grid-cols-4">
        {onboardingSteps.map((step) => {
          const done = step.number < currentStep;
          const active = step.number === currentStep;

          return (
          <Link key={step.href} href={step.href} className="flex flex-col items-center gap-3 text-center">
            <div className="flex w-full items-center gap-4">
              <span className={cn("h-px flex-1", done ? "bg-transparent" : "bg-slate-300")} />
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                  done ? "border border-blue-700 bg-white text-blue-700" : active ? "bg-barber-gold text-white" : "bg-slate-300 text-white",
                )}
              >
                {done ? <Check className="h-5 w-5" /> : step.number}
              </span>
              <span className="h-px flex-1 bg-slate-300" />
            </div>
            <span className={cn("text-sm font-semibold", active ? "text-barber-gold" : "text-slate-500")}>{step.title}</span>
          </Link>
          );
        })}
      </div>
    );
  }

  return (
    <nav className="mt-24 space-y-0">
      {onboardingSteps.map((step, index) => {
        const done = step.number < currentStep;
        const active = step.number === currentStep;

        return (
        <Link key={step.href} href={step.href} className="group grid grid-cols-[42px_1fr] gap-5">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border text-base font-bold transition-colors",
                done || active
                  ? "border-barber-gold bg-barber-gold text-white"
                  : "border-slate-600 bg-slate-800 text-slate-300 group-hover:border-barber-gold group-hover:text-barber-gold",
              )}
            >
              {done ? <Check className="h-5 w-5" /> : step.number}
            </span>
            {index < onboardingSteps.length - 1 && (
              <span className={cn("h-16 w-px", done || active ? "bg-barber-gold" : "bg-slate-600")} />
            )}
          </div>
          <div className="pb-7">
            <p className="text-base font-bold text-white">{step.title}</p>
            <p className="mt-2 text-sm text-slate-300">{done ? "Concluído" : step.pendingText}</p>
          </div>
        </Link>
        );
      })}
    </nav>
  );
}
