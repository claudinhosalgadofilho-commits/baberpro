"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Crown,
  Gem,
  Headphones,
  Lock,
  Moon,
  Phone,
  Rocket,
  Scissors,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const steps = [
  { number: 1, title: "Dados da Barbearia", text: "Concluído", href: "/cadastro-barbearia", done: true },
  { number: 2, title: "Sua Conta", text: "Plano e acesso", href: "/cadastro-conta", active: true },
  { number: 3, title: "Configurações Iniciais", text: "Preferências básicas", href: "/cadastro-configuracoes" },
  { number: 4, title: "Confirmação", text: "Revise seus dados", href: "/cadastro-confirmacao" },
];

const plans = [
  {
    name: "BÁSICO",
    icon: Scissors,
    iconClass: "bg-slate-200 text-slate-900",
    description: "Ideal para barbearias iniciando a gestão.",
    price: "79",
    cents: ",90",
    color: "text-slate-950",
    featured: false,
    features: [
      "Até 2 barbeiros",
      "Agenda online",
      "Gestão de clientes",
      "Financeiro básico",
      "Relatórios essenciais",
      "Suporte via e-mail",
    ],
  },
  {
    name: "PROFISSIONAL",
    icon: Crown,
    iconClass: "bg-barber-gold text-white shadow-[0_16px_35px_rgba(212,160,23,0.35)]",
    description: "Perfeito para barbearias em crescimento.",
    price: "129",
    cents: ",90",
    color: "text-barber-gold",
    featured: true,
    features: [
      "Até 6 barbeiros",
      "Agenda online avançada",
      "Gestão de clientes completa",
      "Financeiro avançado",
      "Comissões e metas",
      "Estoque e produtos",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
  },
  {
    name: "EMPRESARIAL",
    icon: Gem,
    iconClass: "bg-slate-900 text-white",
    description: "Para barbearias com múltiplas unidades.",
    price: "199",
    cents: ",90",
    color: "text-slate-950",
    featured: false,
    features: [
      "Barbeiros ilimitados",
      "Agenda online avançada",
      "Gestão de clientes completa",
      "Financeiro avançado",
      "Comissões e metas",
      "Estoque e produtos",
      "Relatórios personalizados",
      "Integrações (WhatsApp, PIX)",
      "Suporte prioritário",
    ],
  },
  {
    name: "PREMIUM",
    icon: Rocket,
    iconClass: "bg-slate-900 text-white",
    description: "Plano completo com todos os recursos e benefícios.",
    price: "299",
    cents: ",90",
    color: "text-slate-950",
    featured: false,
    features: [
      "Tudo do plano Empresarial",
      "White Label (sua marca)",
      "App para clientes",
      "App para barbeiros",
      "Marketing e fidelidade",
      "Relatórios inteligentes (BI)",
      "Suporte dedicado 24/7",
      "Onboarding personalizado",
    ],
  },
];

const guarantees = [
  {
    title: "Teste grátis por 7 dias",
    text: "Explore todos os recursos sem compromisso.",
    icon: ShieldCheck,
    highlighted: true,
  },
  {
    title: "Sem cartão de crédito",
    text: "Não é necessário cartão para testar.",
  },
  {
    title: "Cancele quando quiser",
    text: "Sem multas ou taxas de cancelamento.",
  },
  {
    title: "Seus dados estão protegidos",
    text: "Utilizamos criptografia de ponta a ponta para sua segurança.",
    icon: Lock,
    card: true,
  },
];

export default function CadastroContaPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <section className="grid min-h-screen xl:grid-cols-[305px_1fr]">
        <aside className="hidden flex-col bg-[#071018] px-8 py-12 text-white xl:flex">
          <Link href="/" className="block" aria-label="Ir para a página inicial">
            <Image
              src="/barberpro-logo-login.png"
              alt="BarberPro"
              width={190}
              height={150}
              priority
              className="h-[150px] w-[190px] object-contain"
            />
          </Link>

          <nav className="mt-24 space-y-0">
            {steps.map((step, index) => (
              <Link key={step.href} href={step.href} className="group grid grid-cols-[42px_1fr] gap-5">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border text-base font-bold transition-colors",
                      step.done || step.active
                        ? "border-barber-gold bg-barber-gold text-white"
                        : "border-slate-600 bg-slate-800 text-slate-300 group-hover:border-barber-gold group-hover:text-barber-gold",
                    )}
                  >
                    {step.done ? <Check className="h-5 w-5" /> : step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <span className={cn("h-16 w-px", step.done || step.active ? "bg-barber-gold" : "bg-slate-600")} />
                  )}
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

        <section className="flex min-h-screen flex-col px-5 py-7 md:px-10 xl:px-12">
          <header className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost" className="h-11 px-0 text-base font-bold text-barber-gold hover:bg-transparent hover:text-[#bd8f13]">
              <Link href="/cadastro-barbearia">
                <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
              </Link>
            </Button>

            <Link href="/" className="xl:hidden" aria-label="Ir para a página inicial">
              <Image src="/barberpro-logo-login.png" alt="BarberPro" width={112} height={88} className="h-[74px] w-[96px] object-contain" />
            </Link>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
                <div className="flex h-9 w-12 items-center justify-center rounded-md bg-white text-barber-gold shadow-sm dark:bg-card">
                  <Sun className="h-4 w-4" />
                </div>
                <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
                <Moon className="mr-2 h-4 w-4 text-barber-gold" />
              </div>
              <div className="hidden items-center gap-2 text-sm font-bold md:flex">
                <Lock className="h-4 w-4" />
                Ambiente 100% seguro
              </div>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[1540px] flex-1 flex-col py-8 md:py-10">
            <div className="mx-auto max-w-[760px] text-center">
              <h1 className="text-4xl font-black leading-tight tracking-normal md:text-5xl">
                Escolha o plano ideal para <span className="text-barber-gold">sua barbearia</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-500 dark:text-slate-300">
                Todos os planos incluem acesso completo aos recursos essenciais para gerenciar sua barbearia com eficiência.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 2xl:grid-cols-4">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>

            <Card className="mt-7 rounded-lg border-[#F2D08B] bg-[#FFF9EF] shadow-[0_16px_42px_rgba(212,160,23,0.11)] dark:border-barber-gold/25 dark:bg-card">
              <CardContent className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_1fr_1.15fr] xl:items-center">
                {guarantees.map((item, index) => (
                  <div
                    key={item.title}
                    className={cn(
                      "flex min-h-[86px] items-center gap-5",
                      index > 0 && "xl:border-l xl:border-slate-300 xl:pl-8 dark:xl:border-slate-700",
                      item.card && "rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-background",
                    )}
                  >
                    {item.icon && (
                      <div
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
                          item.highlighted ? "bg-barber-gold/10 text-barber-gold" : "text-barber-ink dark:text-white",
                        )}
                      >
                        <item.icon className="h-7 w-7" />
                      </div>
                    )}
                    <div>
                      <p className="font-black">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-8 grid gap-3 md:grid-cols-4">
              {steps.map((step) => (
                <Link key={step.href} href={step.href} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex w-full items-center gap-4">
                    <span className={cn("h-px flex-1", step.done ? "bg-transparent" : "bg-slate-300")} />
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                        step.done ? "border border-slate-500 bg-white text-slate-700" : step.active ? "bg-barber-gold text-white" : "bg-slate-300 text-white",
                      )}
                    >
                      {step.done ? <Check className="h-5 w-5" /> : step.number}
                    </span>
                    <span className="h-px flex-1 bg-slate-300" />
                  </div>
                  <span className={cn("text-sm font-semibold", step.active ? "text-barber-gold" : "text-slate-500")}>{step.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function PlanCard({
  plan,
}: {
  plan: {
    name: string;
    icon: ComponentType<{ className?: string }>;
    iconClass: string;
    description: string;
    price: string;
    cents: string;
    color: string;
    featured: boolean;
    features: string[];
  };
}) {
  const Icon = plan.icon;

  return (
    <Card
      className={cn(
        "relative rounded-lg bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-1 dark:bg-card",
        plan.featured ? "border-barber-gold shadow-[0_22px_55px_rgba(212,160,23,0.14)]" : "border-slate-200",
      )}
    >
      {plan.featured && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-barber-gold px-4 py-2 text-xs font-black uppercase text-white shadow-lg">
          Mais escolhido
        </div>
      )}
      <CardContent className="flex h-full flex-col p-8">
        <div className="text-center">
          <h2 className={cn("text-xl font-black", plan.featured && "text-barber-gold")}>{plan.name}</h2>
          <div className={cn("mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full", plan.iconClass)}>
            <Icon className="h-9 w-9" />
          </div>
          <p className="mx-auto mt-6 min-h-[56px] max-w-[250px] text-base leading-7 text-slate-500 dark:text-slate-300">{plan.description}</p>
          <div className="mt-5 flex items-end justify-center gap-1">
            <span className="mb-3 text-base font-black">R$</span>
            <span className={cn("text-5xl font-black leading-none", plan.color)}>{plan.price}</span>
            <span className="mb-2 text-lg font-black">{plan.cents}</span>
            <span className="mb-2 text-sm text-slate-500">/mês</span>
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">Cobrado mensalmente</p>
        </div>

        <div className="my-6 h-px bg-slate-200 dark:bg-slate-700" />

        <ul className="flex-1 space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm font-medium leading-5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          variant={plan.featured ? "default" : "outline"}
          className={cn(
            "mt-9 h-12 rounded-lg text-base font-black",
            !plan.featured && "border-slate-300 bg-white text-slate-950 hover:bg-slate-50 dark:bg-background dark:text-white dark:hover:bg-slate-900",
          )}
        >
          <Link href="/cadastro/configuracoes-iniciais">Escolher plano</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
