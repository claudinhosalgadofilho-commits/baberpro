"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  CreditCard,
  Grid2X2,
  Headphones,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Moon,
  Package,
  Phone,
  Save,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  UserCog,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Grid2X2 },
  { label: "Agenda", href: "/agendamentos", icon: CalendarDays },
  { label: "Clientes", href: "/clientes", icon: UsersRound },
  { label: "Serviços", href: "/servicos", icon: Sparkles },
  { label: "Profissionais", href: "/profissionais", icon: UsersRound },
  { label: "Financeiro", href: "/financeiro", icon: CircleDollarSign, expandable: true },
  { label: "Estoque", href: "/estoque", icon: Package },
  { label: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { label: "Marketing", href: "/marketing", icon: Send, expandable: true },
  { label: "Configurações", href: "/configuracoes", icon: Settings, active: true, expandable: true },
  { label: "Ajuda", href: "/#contato", icon: CircleHelp },
];

const weekDays = [
  ["Segunda-feira", "08:00", "20:00", true],
  ["Terça-feira", "08:00", "20:00", true],
  ["Quarta-feira", "08:00", "20:00", true],
  ["Quinta-feira", "08:00", "20:00", true],
  ["Sexta-feira", "08:00", "21:00", true],
  ["Sábado", "08:00", "18:00", true],
  ["Domingo", "Fechado", "-", false],
] as const;

const users = [
  { name: "João Santos", role: "Administrador", access: "Acesso total", initials: "JS" },
  { name: "Carlos Eduardo", role: "Barbeiro", access: "Agenda e clientes", initials: "CE" },
  { name: "Bruno Costa", role: "Barbeiro", access: "Agenda e serviços", initials: "BC" },
];

export default function ConfiguracoesPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1 px-4 py-5 md:px-7 lg:px-8">
          <Topbar dark={dark} setDark={setDark} />

          <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase text-barber-gold">Sistema BarberPro</p>
              <h1 className="mt-2 text-3xl font-black tracking-normal md:text-4xl">Configurações</h1>
              <p className="mt-3 max-w-3xl text-lg text-slate-500 dark:text-slate-300">
                Ajuste dados da barbearia, horários, regras de agendamento, integrações, equipe e segurança.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="h-12 rounded-lg border-slate-200 bg-white px-6 text-base font-bold dark:bg-card">
                Cancelar
              </Button>
              <Button className="h-12 rounded-lg bg-barber-gold px-6 text-base font-bold text-white hover:bg-[#bd8f13]">
                <Save className="mr-2 h-5 w-5" />
                Salvar alterações
              </Button>
            </div>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            <OverviewCard icon={Store} title="Unidade principal" value="Barbearia Estilo" description="Plano profissional ativo" tone="gold" />
            <OverviewCard icon={Clock3} title="Funcionamento" value="08:00 - 20:00" description="Domingo fechado" tone="green" />
            <OverviewCard icon={ShieldCheck} title="Segurança" value="100%" description="Ambiente protegido" tone="blue" />
          </div>

          <div className="mt-6 grid gap-5 2xl:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5">
              <BusinessSettings />
              <ScheduleSettings />
              <AppointmentSettings />
            </div>

            <div className="space-y-5">
              <SystemPreferences />
              <IntegrationsCard />
              <UsersCard />
              <SecurityCard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-[292px] shrink-0 flex-col bg-[#071018] px-6 py-8 text-white xl:flex">
      <Link href="/" className="mx-auto block" aria-label="Ir para a página inicial">
        <Image src="/barberpro-logo-login.png" alt="BarberPro" width={200} height={155} priority className="h-[155px] w-[200px] object-contain" />
      </Link>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex h-[52px] items-center gap-4 rounded-lg px-5 py-4 text-base font-semibold transition-colors",
              item.active ? "bg-barber-gold text-white shadow-[0_12px_28px_rgba(212,160,23,0.28)]" : "text-slate-100 hover:bg-white/8 hover:text-barber-gold",
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="min-w-0 flex-1">{item.label}</span>
            {item.expandable && <ChevronRight className="h-4 w-4" />}
          </Link>
        ))}
      </nav>

      <Card className="mt-auto border-white/10 bg-white/[0.035] text-white shadow-none">
        <CardContent className="p-6 text-center">
          <CrownIcon />
          <p className="mt-4 text-sm">Seu plano</p>
          <p className="text-base font-black text-barber-gold">PROFISSIONAL</p>
          <Button asChild variant="outline" className="mt-5 h-11 w-full rounded-lg border-barber-gold bg-transparent text-white hover:bg-barber-gold/15">
            <Link href="/cadastro/plano">Gerenciar plano</Link>
          </Button>
          <p className="mt-4 text-sm text-slate-300">Vencimento: 25/06/2025</p>
        </CardContent>
      </Card>

      <Link href="/configuracoes" className="mt-6 flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/5">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="bg-[#1F2937] text-base">JS</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-bold">João Santos</p>
          <p className="text-sm text-slate-300">Administrador</p>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-300" />
      </Link>
    </aside>
  );
}

function Topbar({ dark, setDark }: { dark: boolean; setDark: (value: boolean) => void }) {
  return (
    <header className="flex flex-wrap items-center gap-4">
      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg text-slate-700 xl:hidden">
        <Menu className="h-6 w-6" />
      </Button>

      <Button variant="ghost" size="icon" className="hidden h-11 w-11 rounded-lg text-slate-700 xl:flex">
        <Menu className="h-6 w-6" />
      </Button>

      <div className="order-3 min-w-[220px] flex-1 md:order-none md:ml-auto md:max-w-[520px]">
        <div className="relative">
          <Input className="h-14 rounded-lg border-slate-200 bg-white pl-6 pr-14 text-base shadow-sm dark:bg-card" placeholder="Buscar configurações, usuários, integrações..." />
          <Search className="absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-600" />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <div className="flex h-12 items-center gap-2 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
          <div className="flex h-10 w-11 items-center justify-center rounded-lg bg-white text-barber-gold shadow-sm dark:bg-card">
            <Sun className="h-5 w-5" />
          </div>
          <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
          <Moon className="mr-2 h-4 w-4 text-barber-gold" />
        </div>

        <Button variant="outline" size="icon" className="relative h-12 w-12 rounded-full border-slate-200 bg-white shadow-sm dark:bg-card">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-barber-gold text-xs font-black text-white">3</span>
        </Button>

        <Link href="/configuracoes" className="hidden h-14 items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 shadow-sm dark:bg-card lg:flex">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-barber-gold text-white">BE</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="font-black">Barbearia Estilo</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">Unidade principal</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </Link>
      </div>
    </header>
  );
}

function OverviewCard({
  icon: Icon,
  title,
  value,
  description,
  tone,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
  tone: "gold" | "green" | "blue";
}) {
  const tones = {
    gold: "border-[#F4DFAE] bg-[#FFFBF3] text-barber-gold",
    green: "border-emerald-100 bg-[#F7FFFB] text-emerald-600",
    blue: "border-blue-100 bg-[#F8FBFF] text-blue-700",
  };

  return (
    <Card className={cn("rounded-lg shadow-[0_14px_35px_rgba(15,23,42,0.07)] dark:bg-card", tones[tone])}>
      <CardContent className="flex items-center gap-5 p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/80">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-slate-500 dark:text-slate-300">{title}</p>
          <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{value}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-300">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function BusinessSettings() {
  return (
    <FormCard icon={Store} title="Dados da barbearia" description="Informações principais exibidas no sistema e nos comprovantes.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome fantasia" value="Barbearia Estilo" icon={Store} />
        <Field label="CNPJ" value="00.000.000/0000-00" icon={CreditCard} />
        <Field label="Telefone principal" value="(11) 99999-9999" icon={Phone} />
        <Field label="E-mail comercial" value="contato@barbearia.com.br" icon={Mail} />
      </div>
      <Field className="mt-5" label="Endereço completo" value="Rua das Navalhas, 248 - Centro, São Paulo - SP" icon={MapPin} />
      <div className="mt-5 flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center">
        <Avatar className="h-20 w-20 rounded-lg">
          <AvatarFallback className="rounded-lg bg-black text-barber-gold">BE</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-black">Logo da barbearia</p>
          <p className="mt-1 text-sm text-slate-500">PNG ou JPG até 2MB. Usada no perfil, relatórios e mensagens.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-lg bg-white dark:bg-background">Alterar</Button>
          <Button variant="outline" className="rounded-lg border-red-200 bg-red-50 text-red-600 hover:bg-red-100">Remover</Button>
        </div>
      </div>
    </FormCard>
  );
}

function ScheduleSettings() {
  return (
    <FormCard icon={Clock3} title="Horário de funcionamento" description="Configure dias abertos, horários e intervalos da unidade.">
      <div className="space-y-3">
        {weekDays.map(([day, open, close, active]) => (
          <div key={day} className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
            <div className="flex items-center justify-between gap-4">
              <p className="font-black">{day}</p>
              <Switch checked={active} aria-label={`Ativar ${day}`} />
            </div>
            <Input value={open} readOnly className="h-11 rounded-lg bg-white md:w-32 dark:bg-background" />
            <Input value={close} readOnly className="h-11 rounded-lg bg-white md:w-32 dark:bg-background" />
            <Button variant="outline" className={cn("h-11 rounded-lg", active ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-400")}>
              + Intervalo
            </Button>
          </div>
        ))}
      </div>
    </FormCard>
  );
}

function AppointmentSettings() {
  return (
    <FormCard icon={CalendarDays} title="Regras de agendamento" description="Defina limites, confirmações e comportamento da agenda.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Intervalo padrão entre serviços" value="30 minutos" />
        <Field label="Antecedência mínima para agendar" value="1 hora" />
        <Field label="Antecedência máxima para agendar" value="30 dias" />
        <Field label="Cancelamento permitido com até" value="2 horas de antecedência" />
      </div>
      <ToggleRow className="mt-5" title="Confirmação automática por WhatsApp" description="Enviar lembrete e confirmação sem ação manual." checked />
      <ToggleRow title="Bloquear horários ocupados" description="Evita conflitos de agenda entre profissionais e serviços." checked />
    </FormCard>
  );
}

function SystemPreferences() {
  return (
    <FormCard icon={Settings} title="Preferências do sistema" description="Padrões usados em relatórios, telas e cadastros.">
      <div className="grid gap-4">
        <Field label="Moeda" value="Real (R$)" />
        <Field label="Fuso horário" value="(GMT-03:00) Brasília" />
        <Field label="Idioma" value="Português (Brasil)" />
        <Field label="Primeiro dia da semana" value="Segunda-feira" />
      </div>
      <ToggleRow className="mt-5" title="Controle de estoque" description="Produtos, alertas e baixa automática." checked />
      <ToggleRow title="Módulo financeiro" description="Receitas, despesas, caixa e relatórios." checked />
    </FormCard>
  );
}

function IntegrationsCard() {
  return (
    <FormCard icon={Send} title="Integrações" description="Canais de confirmação e automações.">
      <IntegrationRow title="WhatsApp Business" status="Conectado" checked />
      <IntegrationRow title="E-mail transacional" status="Ativo" checked />
      <IntegrationRow title="SMS" status="Pendente" />
      <IntegrationRow title="Pagamentos Pix" status="Configurar" />
    </FormCard>
  );
}

function UsersCard() {
  return (
    <FormCard icon={UserCog} title="Usuários e permissões" description="Equipe com acesso ao BarberPro.">
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.name} className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-slate-200 text-slate-900">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-black">{user.name}</p>
              <p className="text-sm text-slate-500">{user.role} - {user.access}</p>
            </div>
            <Button variant="outline" className="hidden rounded-lg bg-white dark:bg-background sm:inline-flex">Editar</Button>
          </div>
        ))}
      </div>
      <Button className="mt-5 h-11 w-full rounded-lg bg-barber-gold text-white hover:bg-[#bd8f13]">Convidar usuário</Button>
    </FormCard>
  );
}

function SecurityCard() {
  return (
    <FormCard icon={ShieldCheck} title="Segurança" description="Proteção de dados e sessão da barbearia.">
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-center gap-3">
          <LockKeyhole className="h-6 w-6 text-blue-700" />
          <p className="font-black text-blue-950">Ambiente 100% seguro</p>
        </div>
        <p className="mt-2 text-sm text-blue-900">Sessões protegidas, isolamento por tenant e dados preparados para PostgreSQL.</p>
      </div>
      <ToggleRow className="mt-5" title="Exigir senha forte" description="Aplicar regras mínimas para novos usuários." checked />
      <ToggleRow title="Registrar logs de alterações" description="Auditoria de ações importantes no sistema." checked />
    </FormCard>
  );
}

function FormCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF4DE] text-barber-gold">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-black">{label}</span>
      <div className="relative mt-2">
        {Icon && <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />}
        <Input value={value} readOnly className={cn("h-12 rounded-lg border-slate-200 bg-white text-base dark:bg-background", Icon && "pl-12")} />
      </div>
    </label>
  );
}

function ToggleRow({ title, description, checked, className }: { title: string; description: string; checked?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-5 border-t border-slate-100 py-4", className)}>
      <div>
        <p className="font-black">{title}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p>
      </div>
      <Switch checked={checked} aria-label={title} />
    </div>
  );
}

function IntegrationRow({ title, status, checked }: { title: string; status: string; checked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-slate-100 py-4 first:border-t-0 first:pt-0">
      <div>
        <p className="font-black">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{status}</p>
      </div>
      <div className="flex items-center gap-3">
        {checked && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        <Switch checked={checked} aria-label={title} />
      </div>
    </div>
  );
}

function CrownIcon() {
  return (
    <div className="mx-auto flex h-10 w-10 items-center justify-center text-barber-gold">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="M4 8l4.2 4.3L12 5l3.8 7.3L20 8v11H4V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
