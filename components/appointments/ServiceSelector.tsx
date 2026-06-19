"use client";

import { Plus, Scissors, Trash2, UsersRound } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ProfessionalSelector } from "@/components/appointments/ProfessionalSelector";
import type { AppointmentFormValues } from "@/components/appointments/appointment-schema";
import { professionals, services } from "@/components/appointments/mock-data";

export function ServiceSelector({ form }: { form: UseFormReturn<AppointmentFormValues> }) {
  const selectedServices = form.watch("services");

  function addService(serviceId = services[0].id) {
    const service = services.find((item) => item.id === serviceId) || services[0];
    form.setValue(
      "services",
      [
        ...selectedServices,
        {
          serviceId: service.id,
          name: service.name,
          description: service.description,
          professionalId: professionals[0].id,
          professionalName: professionals[0].name,
          price: service.price,
          duration: service.duration,
        },
      ],
      { shouldValidate: true },
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
          <Scissors className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-black">2. Serviços</h2>
      </div>

      <label className="text-sm font-bold">Adicionar serviços <span className="text-red-500">*</span></label>
      <select className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base dark:bg-background" onChange={(event) => addService(event.target.value)} defaultValue="">
        <option value="" disabled>Buscar serviço</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>{service.name}</option>
        ))}
      </select>
      {form.formState.errors.services?.message && <p className="mt-2 text-xs font-semibold text-red-600">{form.formState.errors.services.message}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
              <th className="py-3 font-semibold">Serviço</th>
              <th className="py-3 font-semibold">Profissional</th>
              <th className="py-3 font-semibold">Preço</th>
              <th className="py-3 font-semibold">Duração</th>
              <th className="py-3 text-right font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {selectedServices.map((service, index) => (
              <tr key={`${service.serviceId}-${index}`} className="border-b border-slate-100">
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                      {index === 0 ? <Scissors className="h-5 w-5" /> : <UsersRound className="h-5 w-5" />}
                    </span>
                    <div>
                      <p className="font-black">{service.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{service.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <ProfessionalSelector
                    compact
                    value={service.professionalId}
                    onChange={(id) => {
                      const professional = professionals.find((item) => item.id === id) || professionals[0];
                      const next = [...selectedServices];
                      next[index] = { ...service, professionalId: id, professionalName: professional.name };
                      form.setValue("services", next, { shouldValidate: true });
                    }}
                  />
                </td>
                <td className="py-4">
                  <input
                    className="h-10 w-24 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold dark:bg-background"
                    value={`R$ ${service.price},00`}
                    readOnly
                  />
                </td>
                <td className="py-4">
                  <select
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:bg-background"
                    value={service.duration}
                    onChange={(event) => {
                      const next = [...selectedServices];
                      next[index] = { ...service, duration: Number(event.target.value) };
                      form.setValue("services", next, { shouldValidate: true });
                    }}
                  >
                    {[15, 30, 40, 45, 60, 70].map((duration) => (
                      <option key={duration} value={duration}>{duration} min</option>
                    ))}
                  </select>
                </td>
                <td className="py-4 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    onClick={() => form.setValue("services", selectedServices.filter((_, serviceIndex) => serviceIndex !== index), { shouldValidate: true })}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button type="button" variant="outline" className="mt-5 h-11 rounded-lg bg-white dark:bg-background" onClick={() => addService()}>
        <Plus className="mr-2 h-4 w-4" />
        Adicionar outro serviço
      </Button>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-lg font-black">
        <span>Total</span>
        <div className="flex gap-10">
          <span>R$ {selectedServices.reduce((sum, service) => sum + service.price, 0)},00</span>
          <span>{selectedServices.reduce((sum, service) => sum + service.duration, 0)} min</span>
        </div>
      </div>
    </section>
  );
}
