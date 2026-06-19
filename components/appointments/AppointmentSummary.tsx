"use client";

import { CalendarCheck } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { UseFormReturn } from "react-hook-form";

import type { AppointmentFormValues } from "@/components/appointments/appointment-schema";

export function AppointmentSummary({ form }: { form: UseFormReturn<AppointmentFormValues> }) {
  const values = form.watch();
  const totalDuration = values.services.reduce((sum, service) => sum + service.duration, 0);
  const totalPrice = values.services.reduce((sum, service) => sum + service.price, 0);
  const formattedDate = values.date ? format(parseISO(values.date), "dd/MM/yyyy (EEEE)", { locale: ptBR }) : "-";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
          <CalendarCheck className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-black">Resumo do agendamento</h2>
      </div>

      <div className="space-y-4">
        <SummaryLine label="Cliente" value={values.clientName || "-"} />
        <SummaryLine label="Profissional" value={values.professionalName || "-"} />
        <SummaryLine label="Data" value={formattedDate} />
        <SummaryLine label="Horário" value={values.startTime || "-"} />
        <SummaryLine label="Serviços" value={`${values.services.length} serviços`} />
        <SummaryLine label="Duração total" value={`${totalDuration} min`} />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
        <span className="text-lg font-black">Valor total</span>
        <span className="text-3xl font-black text-violet-700">R$ {totalPrice},00</span>
      </div>
    </section>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}
