"use client";

import { Mail, Plus, Search, UserRound } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AppointmentFormValues } from "@/components/appointments/appointment-schema";
import { selectedClient } from "@/components/appointments/mock-data";

export function ClientSelector({ form }: { form: UseFormReturn<AppointmentFormValues> }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
          <UserRound className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-black">1. Dados do cliente</h2>
      </div>

      <div className="mb-3 flex items-center justify-between gap-4">
        <label className="text-sm font-bold">Cliente <span className="text-red-500">*</span></label>
        <Button
          type="button"
          variant="ghost"
          className="h-8 px-0 text-sm font-bold text-violet-700 hover:bg-transparent"
          onClick={() => {
            form.setValue("clientId", selectedClient.id, { shouldValidate: true });
            form.setValue("clientName", selectedClient.name, { shouldValidate: true });
          }}
        >
          Novo cliente <Plus className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <Input className="h-12 rounded-lg pr-12 text-base" placeholder="Buscar cliente por nome ou WhatsApp" />
        <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" />
      </div>

      {form.formState.errors.clientId?.message && <p className="mt-2 text-xs font-semibold text-red-600">{form.formState.errors.clientId.message}</p>}

      <div className="mt-5 flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-slate-200 text-lg text-slate-900">LO</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-lg font-black">{selectedClient.name}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <UserRound className="h-4 w-4" /> {selectedClient.whatsapp}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Mail className="h-4 w-4" /> {selectedClient.email}
          </p>
        </div>
        <Button type="button" variant="outline" className="h-11 rounded-lg bg-white dark:bg-background">
          Ver perfil
        </Button>
      </div>
    </section>
  );
}
