"use client";

import { CalendarDays, Clock3 } from "lucide-react";
import { addMinutes, format, parse } from "date-fns";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfessionalDisplay, ProfessionalSelector } from "@/components/appointments/ProfessionalSelector";
import type { AppointmentFormValues } from "@/components/appointments/appointment-schema";
import { availableTimes, occupiedTimes, professionals } from "@/components/appointments/mock-data";
import { cn } from "@/lib/utils";

export function TimeGrid({ form }: { form: UseFormReturn<AppointmentFormValues> }) {
  const selectedTime = form.watch("startTime");
  const totalDuration = form.watch("services").reduce((sum, service) => sum + service.duration, 0);
  const selectedProfessional = form.watch("professionalId");
  const endTime = selectedTime ? format(addMinutes(parse(selectedTime, "HH:mm", new Date()), totalDuration), "HH:mm") : "--:--";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
          <CalendarDays className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-black">4. Data e horário</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold">Data <span className="text-red-500">*</span></span>
          <div className="relative mt-2">
            <Input type="date" className="h-14 rounded-lg pr-12 text-base" {...form.register("date")} />
            <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          </div>
          {form.formState.errors.date?.message && <p className="mt-1 text-xs font-semibold text-red-600">{form.formState.errors.date.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-bold">Profissional <span className="text-red-500">*</span></span>
          <div className="mt-2 grid grid-cols-[1fr] gap-2">
            <ProfessionalSelector
              value={selectedProfessional}
              onChange={(id) => {
                const professional = professionals.find((item) => item.id === id) || professionals[0];
                form.setValue("professionalId", id, { shouldValidate: true });
                form.setValue("professionalName", professional.name, { shouldValidate: true });
              }}
            />
          </div>
        </label>
      </div>

      <div className="mt-6">
        <p className="mb-4 font-black">Horários disponíveis</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {availableTimes.map((time) => {
            const occupied = occupiedTimes.includes(time);
            const active = selectedTime === time;

            return (
              <Button
                key={time}
                type="button"
                variant="outline"
                disabled={occupied}
                className={cn(
                  "h-12 rounded-lg bg-white text-base dark:bg-background",
                  active && "border-violet-700 bg-violet-700 text-white hover:bg-violet-700",
                  occupied && "cursor-not-allowed opacity-45",
                )}
                onClick={() => form.setValue("startTime", time, { shouldValidate: true })}
              >
                {time}
              </Button>
            );
          })}
        </div>
        {form.formState.errors.startTime?.message && <p className="mt-2 text-xs font-semibold text-red-600">{form.formState.errors.startTime.message}</p>}
      </div>

      <div className="mt-5 grid gap-3 rounded-lg bg-violet-100 px-5 py-4 text-violet-800 sm:grid-cols-2">
        <p className="flex items-center gap-2 font-bold">
          <Clock3 className="h-5 w-5" />
          Duração total: <span>{totalDuration} min</span>
        </p>
        <p className="font-bold">Término previsto: <span>{endTime}</span></p>
      </div>
    </section>
  );
}
