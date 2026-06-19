"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  Grid2X2,
  Headphones,
  Menu,
  Moon,
  Package,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Grid2X2 },
  { label: "Agenda", href: "/agendamentos", icon: CalendarDays, active: true },
  { label: "Clientes", href: "/clientes", icon: UsersRound },
  { label: "Serviços", href: "/configuracoes", icon: Sparkles },
  { label: "Profissionais", href: "/equipe", icon: UsersRound },
  { label: "Financeiro", href: "/financeiro", icon: CircleDollarSign, expandable: true },
  { label: "Estoque", href: "/estoque", icon: Package, expandable: true },
  { label: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { label: "Marketing", href: "/configuracoes", icon: Send, expandable: true },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
  { label: "Ajuda", href: "/#contato", icon: CircleHelp },
];

const professionals = ["Carlos Eduardo", "Bruno Costa", "Lucas Silva", "Rafael Almeida"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

const appointments = [
  { pro: 0, hour: 1, time: "09:00 - 10:00", client: "João Victor", service: "Corte + Barba", status: "Confirmado" },
  { pro: 0, hour: 2.7, time: "10:30 - 11:30", client: "Paulo Henrique", service: "Corte Degradê", status: "Agendado" },
  { pro: 0, hour: 5.5, time: "13:30 - 14:30", client: "Marcos Vinícius", service: "Corte + Barba", status: "Pendente" },
  { pro: 0, hour: 7, time: "15:00 - 16:00", client: "Felipe Rocha", service: "Corte + Pigmentação", status: "Concluído" },
  { pro: 0, hour: 9, time: "17:00 - 18:00", client: "Gustavo Lima", service: "Barba", status: "Confirmado" },
  { pro: 0, hour: 10.5, time: "18:30 - 19:30", client: "Leonardo Santos", service: "Corte Degradê", status: "Concluído" },
  { pro: 1, hour: 0.55, time: "08:30 - 09:30", client: "Rafael Martins", service: "Corte Degradê", status: "Concluído" },
  { pro: 1, hour: 2.1, time: "10:00 - 11:00", client: "André Luiz", service: "Corte + Sobrancelha", status: "Pendente" },
  { pro: 1, hour: 3.55, time: "11:30 - 12:30", client: "Henrique Alves", service: "Corte + Barba", status: "Confirmado" },
  { pro: 1, hour: 6.75, time: "14:00 - 15:00", client: "Matheus Silva", service: "Corte Degradê", status: "Agendado" },
  { pro: 1, hour: 8.5, time: "16:00 - 17:00", client: "Bruno Ferreira", service: "Corte + Barba", status: "Pendente" },
  { pro: 1, hour: 11, time: "19:00 - 20:00", client: "Diego Souza", service: "Corte Degradê", status: "Confirmado" },
  { pro: 2, hour: 1.35, time: "09:30 - 10:30", client: "Carlos Alberto", service: "Corte + Barba", status: "Confirmado" },
  { pro: 2, hour: 3.05, time: "11:00 - 12:00", client: "Vinícius Pereira", service: "Corte Degradê", status: "Concluído" },
  { pro: 2, hour: 5.35, time: "13:00 - 14:00", client: "Gabriel Oliveira", service: "Barba", status: "Pendente" },
  { pro: 2, hour: 7.45, time: "15:30 - 16:30", client: "Igor Cardoso", service: "Corte + Pigmentação", status: "Agendado" },
  { pro: 2, hour: 9.5, time: "17:30 - 18:30", client: "Adriano Marques", service: "Corte + Barba", status: "Confirmado" },
  { pro: 3, hour: 0.25, time: "08:00 - 09:00", client: "Thiago Mendes", service: "Corte + Sobrancelha", status: "Pendente" },
  { pro: 3, hour: 1.75, time: "09:30 - 10:30", client: "Felipe Augusto", service: "Corte Degradê", status: "Agendado" },
  { pro: 3, hour: 3.55, time: "11:00 - 12:00", client: "Pedro Henrique", service: "Corte + Barba", status: "Confirmado" },
  { pro: 3, hour: 6.95, time: "14:30 - 15:30", client: "Alexandre Gonçalves", service: "Corte Degradê", status: "Concluído" },
  { pro: 3, hour: 8.85, time: "16:30 - 17:30", client: "Juan Carlos", service: "Barba", status: "Pendente" },
  { pro: 3, hour: 10, time: "18:00 - 19:00", client: "Rodrigo Lima", service: "Corte + Pigmentação", status: "Agendado" },
];

const statusStyles: Record<string, { card: string; dot: string; icon: ComponentType<{ className?: string }>; text: string }> = {
  Confirmado: { card: "border-emerald-200 bg-emerald-50/80", dot: "bg-emerald-600", icon: Check, text: "text-emerald-700" },
  "Em andamento": { card: "border-amber-200 bg-amber-50/80", dot: "bg-amber-500", icon: Clock3, text: "text-amber-700" },
  Agendado: { card: "border-blue-200 bg-blue-50/80", dot: "bg-blue-600", icon: Check, text: "text-blue-700" },
  Concluído: { card: "border-violet-200 bg-violet-50/80", dot: "bg-violet-600", icon: Check, text: "text-violet-700" },
  Cancelado: { card: "border-slate-200 bg-slate-50", dot: "bg-slate-500", icon: X, text: "text-slate-600" },
  Pendente: { card: "border-orange-200 bg-orange-50/80", dot: "bg-orange-500", icon: Clock3, text: "text-orange-700" },
};

const calendarDays = [
  ["28", "muted"], ["28", "muted"], ["1"], ["2"], ["3"], ["3"], ["4"],
  ["5"], ["6"], ["7"], ["8"], ["9"], ["10"], ["11"],
  ["12"], ["13"], ["14"], ["15", "active"], ["16"], ["17"], ["18"],
  ["19"], ["20"], ["21"], ["22"], ["23"], ["24"], ["25"],
  ["26"], ["27"], ["28"], ["29"], ["30"], ["31"], [""],
];

export default function AgendamentosPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1 px-4 py-4 md:px-7 lg:px-8">
          <Topbar dark={dark} setDark={setDark} />

          <div className="mt-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-slate-700 hover:bg-slate-100">
                  <Link href="/dashboard" aria-label="Voltar para dashboard">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <span className="text-2xl font-black">Agenda</span>
              </div>
              <h1 className="mt-8 text-3xl font-black tracking-normal md:text-4xl">Agenda diária</h1>
              <div className="mt-3 flex items-center gap-4 text-lg text-slate-600 dark:text-slate-300">
                Quarta-feira, 15 de maio de 2024
                <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg border-slate-200 bg-white dark:bg-card">
                  <CalendarDays className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:bg-card">
                <Button variant="navy" className="h-12 rounded-none px-7 text-base">
                  Dia
                </Button>
                <Button asChild variant="ghost" className="h-12 rounded-none border-l border-slate-200 px-7 text-base">
                  <Link href="/agendamentos/semana">Semana</Link>
                </Button>
                <Button variant="ghost" className="h-12 rounded-none border-l border-slate-200 px-7 text-base">
                  Mês
                </Button>
              </div>
              <Button variant="outline" className="h-12 rounded-lg border-slate-200 bg-white px-6 text-base dark:bg-card">
                Hoje
              </Button>
              <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:bg-card">
                <Button variant="ghost" size="icon" className="h-12 w-14 rounded-none">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-14 rounded-none border-l border-slate-200">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <Button className="h-12 rounded-lg bg-[#071018] px-7 text-base text-white hover:bg-[#17213a]">
                <Plus className="mr-2 h-5 w-5" />
                Novo agendamento
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-5 2xl:grid-cols-[1fr_330px]">
            <AgendaGrid />
            <RightPanel />
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-[264px] shrink-0 flex-col bg-[#071018] px-4 py-7 text-white xl:flex">
      <Link href="/" className="mx-auto block" aria-label="Ir para a página inicial">
        <Image src="/barberpro-logo-login.png" alt="BarberPro" width={200} height={155} priority className="h-[155px] w-[200px] object-contain" />
      </Link>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex h-[52px] items-center gap-4 rounded-lg px-4 text-base font-semibold transition-colors",
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
        <CardContent className="p-5 text-center">
          <CrownIcon />
          <p className="mt-4 text-sm">Seu plano</p>
          <p className="font-black text-barber-gold">PROFISSIONAL</p>
          <Button asChild variant="outline" className="mt-5 h-11 w-full rounded-lg border-barber-gold bg-transparent text-white hover:bg-barber-gold/15">
            <Link href="/cadastro-conta">Gerenciar plano</Link>
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
    <header className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg text-slate-700 xl:hidden">
        <Menu className="h-6 w-6" />
      </Button>

      <div className="order-3 min-w-[220px] flex-1 md:order-none md:ml-auto md:max-w-[380px]">
        <div className="relative">
          <Input className="h-12 rounded-lg border-slate-200 bg-white pl-5 pr-12 text-base shadow-sm dark:bg-card" placeholder="Buscar clientes, serviços..." />
          <Search className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-700" />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-white text-slate-800 shadow-sm dark:bg-card dark:text-white">
          <Sun className="h-5 w-5" />
        </Button>
        <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
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

function AgendaGrid() {
  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[1040px]">
            <div className="grid grid-cols-[92px_repeat(4,minmax(210px,1fr))] border-b border-slate-200">
              <div className="flex h-16 items-center justify-center border-r border-slate-200 font-semibold">Horário</div>
              {professionals.map((professional) => (
                <div key={professional} className="flex h-16 items-center justify-center gap-4 border-r border-slate-200 last:border-r-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-slate-200 text-slate-900">{initials(professional)}</AvatarFallback>
                  </Avatar>
                  <span className="font-black">{professional}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[92px_repeat(4,minmax(210px,1fr))]">
              <div>
                {hours.map((hour) => (
                  <div key={hour} className="flex h-[68px] items-center justify-center border-b border-r border-slate-200 text-base font-medium text-slate-700 dark:text-slate-300">
                    {hour}
                  </div>
                ))}
              </div>

              {professionals.map((professional, proIndex) => (
                <div key={professional} className="relative border-r border-slate-200 last:border-r-0">
                  {hours.map((hour) => (
                    <div key={hour} className="h-[68px] border-b border-slate-200" />
                  ))}
                  {appointments
                    .filter((item) => item.pro === proIndex)
                    .map((item) => (
                      <AppointmentCard key={`${item.client}-${item.time}`} item={item} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 p-5">
          <div className="flex flex-wrap gap-4 rounded-lg border border-slate-200 bg-white p-3 dark:bg-background">
            {["Confirmado", "Em andamento", "Agendado", "Concluído", "Cancelado", "Pendente"].map((status) => (
              <div key={status} className="flex items-center gap-3 px-2 text-sm font-medium">
                <span className={cn("h-3 w-3 rounded-full", statusStyles[status].dot)} />
                {status}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentCard({ item }: { item: (typeof appointments)[number] }) {
  const style = statusStyles[item.status];
  const Icon = style.icon;

  return (
    <div
      className={cn("absolute left-3 right-3 min-h-[64px] rounded-lg border p-3 shadow-sm", style.card)}
      style={{ top: `${item.hour * 68 + 10}px` }}
    >
      <div className={cn("flex items-start justify-between gap-3", style.text)}>
        <p className="text-sm font-bold">{item.time}</p>
        <span className={cn("mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white", style.dot)}>
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <p className="mt-2 truncate text-base font-black text-barber-ink">{item.client}</p>
      <p className="mt-1 truncate text-sm font-medium text-slate-700">{item.service}</p>
    </div>
  );
}

function RightPanel() {
  return (
    <aside className="space-y-4">
      <Card className="rounded-lg border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.07)] dark:bg-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-black">Maio 2024</h2>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-y-3 text-center">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day) => (
              <span key={day} className="text-sm font-bold text-slate-500">
                {day}
              </span>
            ))}
            {calendarDays.map(([day, state], index) => (
              <span
                key={`${day}-${index}`}
                className={cn(
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  state === "muted" && "text-slate-400",
                  state === "active" && "bg-[#071018] text-white",
                )}
              >
                {day}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.07)] dark:bg-card">
        <CardContent className="p-0">
          <h2 className="border-b border-slate-200 p-5 text-xl font-black">Filtros</h2>
          <div className="space-y-4 p-5">
            <FilterSelect icon={UserRound} label="Profissional" />
            <FilterSelect icon={Sparkles} label="Serviço" />
            <FilterSelect icon={Check} label="Status" />
            <Button variant="outline" className="h-12 w-full rounded-lg border-slate-200 bg-white text-base dark:bg-background">
              <RotateCcw className="mr-2 h-5 w-5" />
              Limpar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.07)] dark:bg-card">
        <CardContent className="p-0">
          <h2 className="border-b border-slate-200 p-5 text-xl font-black">Resumo do dia</h2>
          <div className="space-y-4 p-5">
            <SummaryItem label="Agendamentos" value="24" icon={CalendarDays} />
            <SummaryItem label="Confirmados" value="18" icon={Check} valueClass="text-emerald-600" badgeClass="bg-emerald-600" />
            <SummaryItem label="Em andamento" value="3" icon={Clock3} valueClass="text-barber-gold" badgeClass="bg-barber-gold" />
            <SummaryItem label="Pendentes" value="3" icon={Clock3} valueClass="text-orange-600" badgeClass="bg-orange-500" />
            <SummaryItem label="Cancelados" value="0" icon={X} valueClass="text-red-600" badgeClass="bg-red-600" />

            <div className="border-t border-slate-200 pt-5">
              <p className="font-black">Taxa de ocupação</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-3xl font-black">85%</span>
                <div className="h-3 flex-1 rounded-full bg-slate-200">
                  <div className="h-3 w-[85%] rounded-full bg-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function FilterSelect({ icon: Icon, label }: { icon: ComponentType<{ className?: string }>; label: string }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4" />
        {label}
      </label>
      <Select defaultValue="todos">
        <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-white dark:bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="ativos">Ativos</SelectItem>
          <SelectItem value="prioridade">Prioridade</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  icon: Icon,
  valueClass,
  badgeClass,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  valueClass?: string;
  badgeClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className={cn("flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-slate-700", badgeClass && `${badgeClass} text-white`)}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="font-medium">{label}</span>
      </div>
      <span className={cn("font-black", valueClass)}>{value}</span>
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

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
