"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BarChart3,
  Building2,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Headphones,
  LockKeyhole,
  Mail,
  Map,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Store,
  Sun,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ONBOARDING_KEYS, saveOnboardingStep } from "@/store/onboarding-store";

const steps = [
  { number: 1, title: "Dados da Barbearia", text: "Informações básicas", href: "/cadastro/barbearia", active: true },
  { number: 2, title: "Sua Conta", text: "Dados de acesso", href: "/cadastro/plano" },
  { number: 3, title: "Configurações Iniciais", text: "Preferências básicas", href: "/cadastro/configuracoes-iniciais" },
  { number: 4, title: "Confirmação", text: "Revise seus dados", href: "/cadastro/confirmacao" },
];

const benefits = [
  { title: "Agendamentos online", text: "Mais praticidade para você e seus clientes", icon: CalendarDays },
  { title: "Gestão completa", text: "Clientes, serviços, profissionais e mais", icon: UsersRound },
  { title: "Financeiro inteligente", text: "Controle suas finanças e aumente lucros", icon: CircleDollarSign },
  { title: "Relatórios avançados", text: "Dados que ajudam nas melhores decisões", icon: BarChart3 },
];

const barberShopSchema = z.object({
  name: z.string().min(2, "Informe o nome da barbearia."),
  document: z.string().optional(),
  fantasyName: z.string().min(2, "Informe o nome fantasia."),
  phone: z.string().min(10, "Informe o telefone principal."),
  whatsapp: z.string().min(10, "Informe o WhatsApp."),
  email: z.string().email("Informe um e-mail válido."),
  address: z.string().min(8, "Informe o endereço completo."),
  city: z.string().min(2, "Informe a cidade."),
  state: z.string().min(2, "Selecione o estado."),
});

type BarberShopForm = z.infer<typeof barberShopSchema>;

const defaultValues: BarberShopForm = {
  name: "",
  document: "",
  fantasyName: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  city: "",
  state: "",
};

export default function CadastroBarbeariaPage() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const form = useForm<BarberShopForm>({
    resolver: zodResolver(barberShopSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const stored = window.localStorage.getItem(ONBOARDING_KEYS.barberShop);
    if (stored) {
      form.reset({ ...defaultValues, ...JSON.parse(stored) });
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => saveOnboardingStep(ONBOARDING_KEYS.barberShop, values));
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = form.handleSubmit((values) => {
    saveOnboardingStep(ONBOARDING_KEYS.barberShop, values);
    router.push("/cadastro/plano");
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <section className="grid min-h-screen xl:grid-cols-[305px_minmax(520px,1fr)_minmax(560px,1fr)]">
        <aside className="hidden flex-col bg-[#071018] px-8 py-12 text-white xl:flex">
          <Link href="/" className="block" aria-label="Ir para a página inicial">
            <Image src="/barberpro-logo-login.png" alt="BarberPro" width={190} height={150} priority className="h-[150px] w-[190px] object-contain" />
          </Link>

          <nav className="mt-20 space-y-0">
            {steps.map((step, index) => (
              <Link key={step.href} href={step.href} className="group grid grid-cols-[42px_1fr] gap-5">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border text-base font-bold transition-colors",
                      step.active
                        ? "border-barber-gold bg-barber-gold text-white"
                        : "border-slate-600 bg-slate-800 text-slate-300 group-hover:border-barber-gold group-hover:text-barber-gold",
                    )}
                  >
                    {step.number}
                  </span>
                  {index < steps.length - 1 && <span className={cn("h-16 w-px", step.active ? "bg-barber-gold" : "bg-slate-600")} />}
                </div>
                <div className="pb-7">
                  <p className="text-base font-bold text-white">{step.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{step.text}</p>
                </div>
              </Link>
            ))}
          </nav>

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

        <section className="relative hidden min-h-screen overflow-hidden bg-barber-navy text-white lg:block">
          <Image src="/barberpro-hero.png" alt="Barbearia BarberPro" fill priority className="object-cover" sizes="42vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071018] via-[#071018]/88 to-[#071018]/55" />
          <div className="relative z-10 flex min-h-full flex-col justify-center px-10 py-12">
            <div className="max-w-[560px]">
              <div className="mb-8 flex w-fit items-center gap-2 rounded-full border border-barber-gold/60 bg-barber-gold/10 px-5 py-3 text-sm font-bold text-barber-gold">
                <ShieldCheck className="h-4 w-4" /> +2.500 barbearias já usam o BarberPro
              </div>
              <h1 className="text-5xl font-black leading-[1.12] md:text-6xl">
                Vamos começar! Cadastre sua <span className="text-barber-gold">barbearia</span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-9 text-slate-100">
                Preencha os dados da sua barbearia para criar sua conta e começar a organizar seu negócio de forma profissional.
              </p>

              <div className="mt-10 divide-y divide-white/15">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-5 py-5">
                    <benefit.icon className="h-10 w-10 shrink-0 text-barber-gold" />
                    <div>
                      <p className="text-lg font-bold">{benefit.title}</p>
                      <p className="mt-2 text-base text-slate-200">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="mt-12 max-w-[455px] border-white/10 bg-[#0F172A]/80 text-white shadow-2xl backdrop-blur">
                <CardContent className="flex gap-5 p-6">
                  <LockKeyhole className="mt-1 h-8 w-8 shrink-0 text-barber-gold" />
                  <div>
                    <p className="font-bold">Seus dados estão protegidos</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">Utilizamos criptografia e seguimos as melhores práticas de segurança.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen flex-col bg-[#F8FAFC] px-5 py-8 dark:bg-background md:px-9">
          <header className="flex items-center justify-end gap-9">
            <div className="flex items-center gap-3 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
              <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-white text-barber-gold shadow-sm dark:bg-card">
                <Sun className="h-5 w-5" />
              </div>
              <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
              <Moon className="mr-3 h-5 w-5 text-barber-gold" />
            </div>
            <p className="hidden text-lg font-semibold md:block">Já tem uma conta?</p>
            <Button asChild variant="outline" className="h-14 rounded-lg border-barber-gold px-8 text-base text-barber-gold hover:bg-barber-gold/10">
              <Link href="/login">Fazer login</Link>
            </Button>
          </header>

          <form onSubmit={onSubmit} className="flex flex-1 flex-col justify-center py-9">
            <Card className="w-full rounded-xl border-slate-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.14)] dark:border-slate-800 dark:bg-card">
              <CardContent className="p-7 md:p-11">
                <h2 className="text-3xl font-black md:text-4xl">Dados da sua barbearia</h2>
                <p className="mt-3 text-lg text-slate-500 dark:text-slate-300">Informações básicas para começarmos</p>

                <div className="mt-9 grid gap-7 md:grid-cols-2">
                  <Field label="Nome da barbearia" required icon={Store} placeholder="Ex.: Barbearia Estilo & Cia" error={form.formState.errors.name?.message} {...form.register("name")} />
                  <Field label="CNPJ" icon={Building2} placeholder="00.000.000/0000-00" optional error={form.formState.errors.document?.message} {...form.register("document")} />

                  <div className="md:col-span-2">
                    <Field label="Nome fantasia" required icon={Store} placeholder="Ex.: Barbearia Estilo" error={form.formState.errors.fantasyName?.message} {...form.register("fantasyName")} />
                  </div>

                  <Field label="Telefone principal" required icon={Phone} placeholder="(11) 99999-9999" error={form.formState.errors.phone?.message} {...form.register("phone")} />
                  <Field label="WhatsApp" required icon={Phone} placeholder="(11) 99999-9999" error={form.formState.errors.whatsapp?.message} {...form.register("whatsapp")} />

                  <div className="md:col-span-2">
                    <Field label="E-mail comercial" required icon={Mail} placeholder="contato@barbearia.com.br" error={form.formState.errors.email?.message} {...form.register("email")} />
                  </div>

                  <div className="md:col-span-2">
                    <Field label="Endereço completo" required icon={MapPin} placeholder="Rua, número, bairro, cidade, estado, CEP" error={form.formState.errors.address?.message} {...form.register("address")} />
                  </div>

                  <Field label="Cidade" required icon={Building2} placeholder="Sua cidade" error={form.formState.errors.city?.message} {...form.register("city")} />

                  <div className="space-y-3">
                    <Label text="Estado" required />
                    <div className="relative">
                      <Map className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-500" />
                      <Controller
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-[64px] rounded-lg pl-14 text-base">
                              <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                            <SelectContent>
                              {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RS", "SC", "SE", "SP", "TO"].map((uf) => (
                                <SelectItem key={uf} value={uf}>
                                  {uf}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    {form.formState.errors.state?.message && <p className="text-xs font-semibold text-red-600">{form.formState.errors.state.message}</p>}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button type="submit" className="h-14 rounded-lg px-9 text-base">
                    Continuar <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr]">
              {steps.map((step) => (
                <Link key={step.href} href={step.href} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex w-full items-center gap-4">
                    <span className={cn("h-px flex-1", step.active ? "bg-transparent" : "bg-slate-300")} />
                    <span className={cn("flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold", step.active ? "bg-barber-gold text-white" : "bg-slate-300 text-white")}>
                      {step.number}
                    </span>
                    <span className="h-px flex-1 bg-slate-300" />
                  </div>
                  <span className={cn("text-sm font-semibold", step.active ? "text-barber-gold" : "text-slate-500")}>{step.title}</span>
                </Link>
              ))}
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="text-sm font-bold">
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Field({
  label,
  placeholder,
  icon: Icon,
  required,
  optional,
  error,
  ...inputProps
}: {
  label: string;
  placeholder: string;
  icon: ComponentType<{ className?: string }>;
  required?: boolean;
  optional?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-3">
      <Label text={optional ? `${label} (opcional)` : label} required={required} />
      <div className="relative">
        <Icon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <Input className="h-[64px] rounded-lg pl-14 text-base" placeholder={placeholder} {...inputProps} />
      </div>
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}
