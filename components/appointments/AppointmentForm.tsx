"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { AppointmentActions } from "@/components/appointments/AppointmentActions";
import { AppointmentSummary } from "@/components/appointments/AppointmentSummary";
import { ClientSelector } from "@/components/appointments/ClientSelector";
import { NotesField } from "@/components/appointments/NotesField";
import { ServiceSelector } from "@/components/appointments/ServiceSelector";
import { TimeGrid } from "@/components/appointments/TimeGrid";
import { appointmentSchema, type AppointmentFormValues } from "@/components/appointments/appointment-schema";
import { professionals, selectedClient, services } from "@/components/appointments/mock-data";

const defaultValues: AppointmentFormValues = {
  clientId: selectedClient.id,
  clientName: selectedClient.name,
  date: "2024-05-15",
  professionalId: professionals[0].id,
  professionalName: professionals[0].name,
  startTime: "10:30",
  notes: "",
  services: [
    {
      serviceId: services[0].id,
      name: services[0].name,
      description: services[0].description,
      professionalId: professionals[0].id,
      professionalName: professionals[0].name,
      price: services[0].price,
      duration: services[0].duration,
    },
    {
      serviceId: services[1].id,
      name: services[1].name,
      description: services[1].description,
      professionalId: professionals[0].id,
      professionalName: professionals[0].name,
      price: services[1].price,
      duration: services[1].duration,
    },
  ],
};

export function AppointmentForm() {
  const router = useRouter();
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: AppointmentFormValues) {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      window.localStorage.removeItem("barberpro:appointment:draft");
      router.push("/agendamentos");
      return;
    }

    window.localStorage.setItem("barberpro:appointment:draft", JSON.stringify(values));
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 xl:grid-cols-[1.08fr_0.88fr]">
      <div className="space-y-5">
        <ClientSelector form={form} />
        <ServiceSelector form={form} />
        <NotesField form={form} />
      </div>
      <div className="space-y-5">
        <TimeGrid form={form} />
        <AppointmentSummary form={form} />
      </div>
      <div className="xl:col-span-2">
        <AppointmentActions form={form} />
      </div>
    </form>
  );
}
