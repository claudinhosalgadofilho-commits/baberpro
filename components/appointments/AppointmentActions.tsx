"use client";

import { Check, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import type { AppointmentFormValues } from "@/components/appointments/appointment-schema";

export function AppointmentActions({ form }: { form: UseFormReturn<AppointmentFormValues> }) {
  const router = useRouter();

  function saveDraft() {
    window.localStorage.setItem("barberpro:appointment:draft", JSON.stringify(form.getValues()));
  }

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
      <Button type="button" variant="outline" className="h-14 rounded-lg bg-white px-10 text-base dark:bg-background" onClick={() => router.push("/agendamentos")}>
        Cancelar
      </Button>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="outline" className="h-14 rounded-lg border-violet-300 bg-white px-8 text-base text-violet-700 dark:bg-background" onClick={saveDraft}>
          <Save className="mr-2 h-5 w-5" />
          Salvar rascunho
        </Button>
        <Button type="submit" className="h-14 rounded-lg bg-violet-700 px-8 text-base text-white hover:bg-violet-800">
          <Check className="mr-2 h-5 w-5" />
          Confirmar agendamento
        </Button>
      </div>
    </div>
  );
}
