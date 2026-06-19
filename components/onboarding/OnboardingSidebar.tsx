import Image from "next/image";
import Link from "next/link";
import { Headphones, Phone } from "lucide-react";

import { StepIndicator } from "@/components/onboarding/StepIndicator";

export function OnboardingSidebar({ currentStep = 3 }: { currentStep?: number }) {
  return (
    <aside className="hidden min-h-screen w-[305px] shrink-0 flex-col bg-[#071018] px-8 py-12 text-white xl:flex">
      <Link href="/" className="block" aria-label="Ir para a página inicial">
        <Image src="/barberpro-logo-login.png" alt="BarberPro" width={190} height={150} priority className="h-[150px] w-[190px] object-contain" />
      </Link>

      <StepIndicator currentStep={currentStep} />

      <div className="mt-auto rounded-lg border border-white/10 bg-white/5 p-5">
        <Link href="/#contato" className="flex items-center gap-3">
          <Headphones className="h-6 w-6 text-barber-gold" />
          <p className="font-bold">Precisa de ajuda?</p>
        </Link>
        <p className="mt-4 text-sm text-slate-300">Fale com nosso suporte</p>
        <Link href="/#contato" className="mt-4 flex items-center gap-2 text-base font-bold text-barber-gold">
          <Phone className="h-5 w-5" /> (11) 99999-9999
        </Link>
      </div>
    </aside>
  );
}
