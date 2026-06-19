"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  ImageIcon,
  Settings,
  Store,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import { BottomProgress } from "@/components/onboarding/BottomProgress";
import { FormCard } from "@/components/onboarding/FormCard";
import { OnboardingFooter } from "@/components/onboarding/OnboardingFooter";
import { OnboardingSidebar } from "@/components/onboarding/OnboardingSidebar";
import { SecureBadge } from "@/components/onboarding/SecureBadge";
import { ThemeToggle } from "@/components/onboarding/ThemeToggle";
import { WorkingHoursEditor } from "@/components/onboarding/WorkingHoursEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  ONBOARDING_INITIAL_SETTINGS_KEY,
  readOnboardingData,
  saveOnboardingData,
} from "@/lib/onboarding-store";

const days = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

const schema = z.object({
  fantasyName: z.string().min(2, "Informe o nome fantasia."),
  segment: z.string().min(2, "Informe o segmento."),
  foundationYear: z.string().regex(/^\d{4}$/, "Informe um ano válido."),
  openingDate: z.string().min(1, "Informe a data de abertura."),
  description: z.string().optional(),
  logoName: z.string().optional(),
  workingHours: z
    .array(
      z.object({
        day: z.string(),
        active: z.boolean(),
        open: z.string(),
        close: z.string(),
      }),
    )
    .min(7),
  serviceInterval: z.string().min(1),
  minAdvance: z.string().min(1),
  maxAdvance: z.string().min(1),
  cancellationLimit: z.string().min(1),
  autoWhatsappConfirmation: z.boolean(),
  currency: z.string().min(1),
  timezone: z.string().min(1),
  language: z.string().min(1),
  firstWeekDay: z.string().min(1),
  enableStock: z.boolean(),
  enableFinance: z.boolean(),
});

type InitialSettingsForm = z.infer<typeof schema>;

const defaultValues: InitialSettingsForm = {
  fantasyName: "Barbearia Estilo",
  segment: "Barbearia",
  foundationYear: "2020",
  openingDate: "2020-01-15",
  description: "Barbearia tradicional com foco em qualidade, atendimento e estilo.",
  logoName: "logo.png",
  workingHours: days.map((day) => ({
    day,
    active: day !== "Domingo",
    open: "08:00",
    close: day === "Sexta-feira" ? "21:00" : "20:00",
  })),
  serviceInterval: "30 minutos",
  minAdvance: "1 hora",
  maxAdvance: "30 dias",
  cancellationLimit: "2 horas de antecedência",
  autoWhatsappConfirmation: true,
  currency: "Real (R$)",
  timezone: "(GMT-03:00) Brasília",
  language: "Português (Brasil)",
  firstWeekDay: "Segunda-feira",
  enableStock: true,
  enableFinance: true,
};

export default function ConfiguracoesIniciaisPage() {
  const router = useRouter();
  const form = useForm<InitialSettingsForm>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(readOnboardingData(ONBOARDING_INITIAL_SETTINGS_KEY, defaultValues));
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      saveOnboardingData(ONBOARDING_INITIAL_SETTINGS_KEY, values);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = form.handleSubmit((values) => {
    saveOnboardingData(ONBOARDING_INITIAL_SETTINGS_KEY, values);
    router.push("/cadastro/confirmacao");
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <div className="flex min-h-screen">
        <OnboardingSidebar currentStep={3} />

        <section className="min-w-0 flex-1 px-5 py-7 md:px-10 xl:px-12">
          <header className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost" className="h-11 px-0 text-base font-bold text-barber-gold hover:bg-transparent hover:text-[#bd8f13]">
              <Link href="/cadastro/conta">
                <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
              </Link>
            </Button>

            <Link href="/" className="xl:hidden" aria-label="Ir para a página inicial">
              <Image src="/barberpro-logo-login.png" alt="BarberPro" width={112} height={88} className="h-[74px] w-[96px] object-contain" />
            </Link>

            <div className="flex items-center gap-5">
              <ThemeToggle />
              <SecureBadge />
            </div>
          </header>

          <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-[1540px] flex-col py-8 md:py-10">
            <div className="mx-auto max-w-[820px] text-center">
              <h1 className="text-4xl font-black leading-tight tracking-normal md:text-5xl">
                Configure <span className="text-barber-gold">sua barbearia</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-500 dark:text-slate-300">
                Defina as preferências e configurações iniciais para personalizar seu sistema de acordo com o funcionamento da sua barbearia.
              </p>
            </div>

            <div className="mt-9 grid gap-5 xl:grid-cols-[0.92fr_1.28fr]">
              <BusinessInfoCard form={form} />
              <FormCard title="Horário de Funcionamento" description="Defina os dias e horários de funcionamento da barbearia." icon={Clock3} iconClass="bg-emerald-100 text-emerald-600">
                <WorkingHoursEditor control={form.control} />
              </FormCard>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[0.92fr_1.28fr]">
              <SchedulingCard form={form} />
              <PreferencesCard form={form} />
            </div>

            <div className="mt-5">
              <OnboardingFooter isSubmitting={form.formState.isSubmitting} />
            </div>

            <div className="mt-8">
              <BottomProgress currentStep={3} />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function BusinessInfoCard({ form }: { form: ReturnType<typeof useForm<InitialSettingsForm>> }) {
  return (
    <FormCard title="Informações da Barbearia" description="Defina detalhes operacionais da sua barbearia." icon={Store} iconClass="bg-violet-100 text-violet-700">
      <div className="grid gap-5 md:grid-cols-[1fr_0.68fr]">
        <Field label="Nome fantasia" error={form.formState.errors.fantasyName?.message}>
          <Input className="h-11 rounded-lg" {...form.register("fantasyName")} />
        </Field>
        <Field label="Segmento" error={form.formState.errors.segment?.message}>
          <Input className="h-11 rounded-lg" {...form.register("segment")} />
        </Field>
        <Field label="Ano de fundação" error={form.formState.errors.foundationYear?.message}>
          <Input className="h-11 rounded-lg" {...form.register("foundationYear")} />
        </Field>
        <Field label="Data de abertura" error={form.formState.errors.openingDate?.message}>
          <div className="relative">
            <Input type="date" className="h-11 rounded-lg pr-10" {...form.register("openingDate")} />
            <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          </div>
        </Field>
        <div className="md:col-span-2">
          <Field label="Descrição (opcional)">
            <textarea
              className="min-h-[72px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...form.register("description")}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-bold">Logo da barbearia</p>
        <div className="flex flex-col gap-4 rounded-lg border border-slate-200 p-3 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#071018] text-barber-gold">
            <ImageIcon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <p className="font-bold">{form.watch("logoName") || "logo.png"}</p>
            <p className="mt-1 text-sm text-slate-500">PNG • 512x512px</p>
          </div>
          <Button type="button" variant="outline" className="h-10 rounded-lg bg-white dark:bg-background">
            Alterar
          </Button>
          <Button type="button" variant="outline" className="h-10 rounded-lg border-red-200 bg-white text-red-600 hover:bg-red-50 dark:bg-background">
            Remover
          </Button>
        </div>
      </div>
    </FormCard>
  );
}

function SchedulingCard({ form }: { form: ReturnType<typeof useForm<InitialSettingsForm>> }) {
  return (
    <FormCard title="Configurações de Agendamento" description="Defina regras básicas para agendamentos." icon={CalendarDays} iconClass="bg-blue-100 text-blue-700">
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField label="Intervalo padrão entre serviços" {...form.register("serviceInterval")} options={["15 minutos", "30 minutos", "45 minutos", "60 minutos"]} />
        <SelectField label="Antecedência mínima para agendar" {...form.register("minAdvance")} options={["30 minutos", "1 hora", "2 horas", "1 dia"]} />
        <SelectField label="Antecedência máxima para agendar" {...form.register("maxAdvance")} options={["7 dias", "15 dias", "30 dias", "60 dias"]} />
        <SelectField label="Cancelamento permitido com até" {...form.register("cancellationLimit")} options={["1 hora de antecedência", "2 horas de antecedência", "6 horas de antecedência", "1 dia de antecedência"]} />
      </div>
      <ToggleRow
        className="mt-6"
        title="Confirmação automática de agendamentos"
        text="Enviar confirmação por WhatsApp automaticamente."
        checked={form.watch("autoWhatsappConfirmation")}
        onCheckedChange={(checked) => form.setValue("autoWhatsappConfirmation", checked)}
      />
    </FormCard>
  );
}

function PreferencesCard({ form }: { form: ReturnType<typeof useForm<InitialSettingsForm>> }) {
  return (
    <FormCard title="Preferências do Sistema" description="Personalize algumas preferências do sistema." icon={Settings} iconClass="bg-orange-100 text-orange-600">
      <div className="grid gap-5 lg:grid-cols-3">
        <SelectField label="Moeda" {...form.register("currency")} options={["Real (R$)"]} />
        <SelectField label="Fuso horário" {...form.register("timezone")} options={["(GMT-03:00) Brasília"]} />
        <SelectField label="Idioma" {...form.register("language")} options={["Português (Brasil)"]} />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr]">
        <SelectField label="Primeiro dia da semana" {...form.register("firstWeekDay")} options={["Segunda-feira", "Domingo"]} />
        <div className="space-y-5">
          <ToggleRow title="Ativar controle de estoque" text="Habilite o módulo de estoque e produtos." checked={form.watch("enableStock")} onCheckedChange={(checked) => form.setValue("enableStock", checked)} />
          <ToggleRow title="Ativar módulo financeiro" text="Habilite contas a receber, contas a pagar e fluxo de caixa." checked={form.watch("enableFinance")} onCheckedChange={(checked) => form.setValue("enableFinance", checked)} />
        </div>
      </div>
    </FormCard>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function SelectField({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <select className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm dark:bg-background" {...props}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ToggleRow({
  title,
  text,
  checked,
  onCheckedChange,
  className,
}: {
  title: string;
  text: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className || ""}`}>
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{text}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
