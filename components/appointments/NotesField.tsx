"use client";

import { FileText } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import type { AppointmentFormValues } from "@/components/appointments/appointment-schema";

export function NotesField({ form }: { form: UseFormReturn<AppointmentFormValues> }) {
  const notes = form.watch("notes") || "";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
          <FileText className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-black">3. Observações <span className="text-base font-medium">(opcional)</span></h2>
      </div>
      <textarea
        className="min-h-[88px] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring dark:bg-background"
        placeholder="Alguma observação sobre o agendamento?"
        maxLength={200}
        {...form.register("notes")}
      />
      <p className="mt-2 text-right text-sm text-slate-500">{notes.length}/200</p>
    </section>
  );
}
