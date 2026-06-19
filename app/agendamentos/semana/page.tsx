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
  Menu,
  Package,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  UsersRound,
  X,
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

const days = [
  { label: "Segunda", date: "13/05" },
  { label: "Terça", date: "14/05" },
  { label: "Quarta", date: "15/05", active: true },
  { label: "Quinta", date: "16/05" },
  { label: "Sexta", date: "17/05" },
  { label: "Sábado", date: "18/05", weekend: true },
  { label: "Domingo", date: "19/05", sunday: true },
];

const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

const appointments = [
  { day: 0, hour: 1, time: "09:00 - 10:00", client: "João Victor", service: "Corte + Barba", status: "Confirmado", avatar: true },
  { day: 0, hour: 2.6, time: "10:30 - 11:30", client: "Paulo Henrique", service: "Corte Degradê", status: "Agendado" },
  { day: 0, hour: 5.2, time: "13:30 - 14:30", client: "Marcos Vinícius", service: "Corte + Barba", status: "Pendente" },
  { day: 0, hour: 6.85, time: "15:00 - 16:00", client: "Felipe Rocha", service: "Corte + Pigmentação", status: "Concluído" },
  { day: 0, hour: 9, time: "17:00 - 18:00", client: "Gustavo Lima", service: "Barba", status: "Confirmado" },
  { day: 0, hour: 10.65, time: "18:30 - 19:30", client: "Leonardo Santos", service: "Corte Degradê", status: "Concluído" },
  { day: 1, hour: 0.55, time: "08:30 - 09:30", client: "Rafael Martins", service: "Corte Degradê", status: "Concluído" },
  { day: 1, hour: 2.05, time: "10:00 - 11:00", client: "André Luiz", service: "Corte + Sobrancelha", status: "Pendente" },
  { day: 1, hour: 3.55, time: "11:30 - 12:30", client: "Henrique Alves", service: "Corte + Barba", status: "Confirmado" },
  { day: 1, hour: 6.8, time: "14:00 - 15:00", client: "Matheus Silva", service: "Corte Degradê", status: "Agendado" },
  { day: 1, hour: 8.5, time: "16:00 - 17:00", client: "Bruno Ferreira", service: "Corte + Barba", status: "Pendente" },
  { day: 1, hour: 11, time: "19:00 - 20:00", client: "Diego Souza", service: "Corte Degradê", status: "Confirmado" },
  { day: 2, hour: 1.25, time: "09:30 - 10:30", client: "Carlos Alberto", service: "Corte + Barba", status: "Confirmado" },
  { day: 2, hour: 3.05, time: "11:00 - 12:00", client: "Vinícius Pereira", service: "Corte Degradê", status: "Concluído" },
  { day: 2, hour: 5, time: "13:00 - 14:00", client: "Gabriel Oliveira", service: "Barba", status: "Pendente" },
  { day: 2, hour: 7.35, time: "15:30 - 16:30", client: "Igor Cardoso", service: "Corte + Pigmentação", status: "Agendado" },
  { day: 2, hour: 9.5, time: "17:30 - 18:30", client: "Adriano Marques", service: "Corte + Barba", status: "Confirmado" },
  { day: 3, hour: 0.25, time: "08:00 - 09:00", client: "Thiago Mendes", service: "Corte + Sobrancelha", status: "Pendente" },
  { day: 3, hour: 2.6, time: "10:30 - 11:30", client: "Felipe Augusto", service: "Corte Degradê", status: "Agendado" },
  { day: 3, hour: 3.55, time: "11:30 - 12:30", client: "Pedro Henrique", service: "Corte + Barba", status: "Confirmado" },
  { day: 3, hour: 6.9, time: "14:30 - 15:30", client: "Alexandre Gonçalves", service: "Corte Degradê", status: "Concluído" },
  { day: 3, hour: 8.55, time: "16:30 - 17:30", client: "Juan Carlos", service: "Barba", status: "Pendente" },
  { day: 3, hour: 10, time: "18:00 - 19:00", client: "Rodrigo Lima", service: "Corte + Pigmentação", status: "Agendado" },
  { day: 4, hour: 1, time: "09:00 - 10:00", client: "Lucas Silva", service: "Corte + Barba", status: "Confirmado" },
  { day: 4, hour: 3, time: "11:00 - 12:00", client: "Bruno Costa", service: "Corte Degradê", status: "Concluído" },
  { day: 4, hour: 5.2, time: "13:30 - 14:30", client: "Victor Hugo", service: "Corte + Sobrancelha", status: "Pendente" },
  { day: 4, hour: 7.35, time: "15:30 - 16:30", client: "Rafael Almeida", service: "Corte + Barba", status: "Confirmado" },
  { day: 4, hour: 10.65, time: "18:30 - 19:30", client: "Murilo França", service: "Corte Degradê", status: "Concluído" },
  { day: 5, hour: 0.55, time: "08:30 - 09:30", client: "Diego Nunes", service: "Corte Degradê", status: "Agendado" },
  { day: 5, hour: 2.05, time: "10:00 - 11:00", client: "Felipe Souza", service: "Corte + Barba", status: "Confirmado" },
  { day: 5, hour: 3.9, time: "11:30 - 12:30", client: "Willian Borges", service: "Barba", status: "Pendente" },
  { day: 5, hour: 6.75, time: "14:00 - 15:00", client: "Carlos Eduardo", service: "Corte Degradê", status: "Concluído" },
  { day: 5, hour: 8.4, time: "16:00 - 17:00", client: "Jean Carlos", service: "Corte + Barba", status: "Confirmado" },
  { day: 5, hour: 10, time: "18:00 - 19:00", client: "Robert Silva", service: "Corte + Pigmentação", status: "Agendado" },
];

const statusStyles: Record<string, { card: string; dot: string; icon: ComponentType<{ className?: string }>; text: string }> = {
  Confirmado: { card: "border-emerald-200 bg-emerald-50/80", dot: "bg-emerald-600", icon: Check, text: "text-emerald-700" },
  "Em andamento": { card: "border-amber-200 bg-amber-50/80", dot: "bg-amber-500", icon: Clock3, text: "text-amber-700" },
  Agendado: { card: "border-blue-200 bg-blue-50/80", dot: "bg-blue-600", icon: Check, text: "text-blue-700" },
  Concluído: { card: "border-violet-200 bg-violet-50/80", dot: "bg-violet-600", icon: Check, text: "text-violet-700" },
  Cancelado: { card: "border-slate-200 bg-slate-50", dot: "bg-red-600", icon: X, text: "text-red-700" },
  Pendente: { card: "border-orange-200 bg-orange-50/80", dot: "bg-slate-400", icon: Clock3, text: "text-orange-700" },
};

export default function AgendaSemanalPage() {
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
                  <Link href="/agendamentos" aria-label="Voltar para agenda diária">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <span className="text-2xl font-black">Agenda</span>
              </div>
              <h1 className="mt-8 text-3xl font-black tracking-normal md:text-4xl">Agenda semanal</h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">13 a 19 de maio de 2024</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button variant="outline" className="h-12 rounded-lg border-slate-200 bg-white px-6 text-base dark:bg-card">Hoje</Button>
              <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:bg-card">
                <Button variant="ghost" size="icon" className="h-12 w-14 rounded-none"><ChevronLeft className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="h-12 w-14 rounded-none border-l border-slate-200"><ChevronRight className="h-5 w-5" /></Button>
              </div>
              <Button variant="outline" className="h-12 rounded-lg border-slate-200 bg-white px-5 text-base dark:bg-card">
                <CalendarDays className="mr-2 h-5 w-5" />
                13 a 19 de maio de 2024
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button className="h-12 rounded-lg bg-[#071018] px-7 text-base text-white hover:bg-[#17213a]">
                <Plus className="mr-2 h-5 w-5" />
                Novo agendamento
              </Button>
              <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:bg-card">
                <Button asChild variant="ghost" className="h-9 rounded-none px-4 text-sm"><Link href="/agendamentos">Dia</Link></Button>
                <Button variant="navy" className="h-9 rounded-none px-4 text-sm">Semana</Button>
                <Button variant="ghost" className="h-9 rounded-none px-4 text-sm">Mês</Button>
              </div>
            </div>
          </div>

          <WeeklyGrid />
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
        <Avatar className="h-14 w-14"><AvatarFallback className="bg-[#1F2937] text-base">JS</AvatarFallback></Avatar>
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
      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg text-slate-700 xl:hidden"><Menu className="h-6 w-6" /></Button>
      <div className="order-3 min-w-[220px] flex-1 md:order-none md:ml-auto md:max-w-[430px]">
        <div className="relative">
          <Input className="h-12 rounded-lg border-slate-200 bg-white pl-5 pr-12 text-base shadow-sm dark:bg-card" placeholder="Buscar clientes, serviços, profissionais..." />
          <Search className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-700" />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-white text-slate-800 shadow-sm dark:bg-card dark:text-white"><Sun className="h-5 w-5" /></Button>
        <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
        <Button variant="outline" size="icon" className="relative h-12 w-12 rounded-full border-slate-200 bg-white shadow-sm dark:bg-card">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-barber-gold text-xs font-black text-white">3</span>
        </Button>
        <Link href="/configuracoes" className="hidden h-14 items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 shadow-sm dark:bg-card lg:flex">
          <Avatar className="h-10 w-10"><AvatarFallback className="bg-barber-gold text-white">BE</AvatarFallback></Avatar>
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

function WeeklyGrid() {
  return (
    <Card className="mt-6 overflow-hidden rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[1320px]">
            <div className="grid grid-cols-[76px_repeat(7,minmax(170px,1fr))] border-b border-slate-200">
              <div className="flex h-20 items-center justify-center border-r border-slate-200 font-semibold">Hora</div>
              {days.map((day) => (
                <div
                  key={day.label}
                  className={cn(
                    "flex h-20 flex-col items-center justify-center border-r border-slate-200 last:border-r-0",
                    day.active && "border-x border-t border-barber-gold bg-[#FFF9EF]",
                  )}
                >
                  <p className={cn("text-base font-black", day.weekend && "text-blue-700", day.sunday && "text-red-700")}>{day.label}</p>
                  <p className="mt-1 text-lg text-slate-600 dark:text-slate-300">{day.date}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[76px_repeat(7,minmax(170px,1fr))]">
              <div>
                {hours.map((hour) => (
                  <div key={hour} className="flex h-[62px] items-center justify-center border-b border-r border-slate-200 text-base font-medium text-slate-700 dark:text-slate-300">{hour}</div>
                ))}
              </div>
              {days.map((day, dayIndex) => (
                <div key={day.label} className={cn("relative border-r border-slate-200 last:border-r-0", day.active && "border-x border-barber-gold bg-[#FFFDF8]")}>
                  {hours.map((hour) => <div key={hour} className="h-[62px] border-b border-slate-200" />)}
                  {dayIndex === 6 ? <ClosedDay /> : appointments.filter((item) => item.day === dayIndex).map((item) => <AppointmentCard key={`${item.client}-${item.time}`} item={item} />)}
                  {dayIndex !== 6 && (
                    <Button variant="outline" className="absolute bottom-3 left-6 right-6 h-9 rounded-lg border-slate-200 bg-white text-xl dark:bg-background">
                      +
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 border-t border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-white p-3 dark:bg-background">
            {["Confirmado", "Agendado", "Concluído", "Em andamento", "Cancelado", "Pendente"].map((status) => (
              <div key={status} className="flex items-center gap-3 px-2 text-sm font-medium">
                <span className={cn("h-3 w-3 rounded-full", statusStyles[status].dot)} />
                {status}
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <SummaryBox label="Total da semana" value="42" helper="agendamentos" />
            <SummaryBox label="Confirmados" value="34" helper="81%" color="text-emerald-600" />
            <SummaryBox label="Em andamento" value="3" helper="7%" color="text-barber-gold" />
            <SummaryBox label="Pendentes" value="5" helper="12%" />
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
    <div className={cn("absolute left-3 right-3 min-h-[60px] rounded-lg border p-3 shadow-sm", style.card)} style={{ top: `${item.hour * 62 + 10}px` }}>
      <div className={cn("flex items-start justify-between gap-3", style.text)}>
        <p className="text-sm font-bold">{item.time}</p>
        <span className={cn("mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white", style.dot)}>
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <p className="truncate text-base font-black text-barber-ink">{item.client}</p>
        {item.avatar && <Avatar className="h-6 w-6"><AvatarFallback className="bg-slate-200 text-[10px] text-slate-900">{initials(item.client)}</AvatarFallback></Avatar>}
      </div>
      <p className="mt-1 truncate text-sm font-medium text-slate-700">{item.service}</p>
    </div>
  );
}

function ClosedDay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
      <CalendarDays className="h-12 w-12 text-slate-400" />
      <p className="mt-5 text-xl font-black text-slate-600">Barbearia fechada</p>
      <p className="mt-3 text-base leading-6 text-slate-500">Nenhum agendamento neste dia.</p>
    </div>
  );
}

function SummaryBox({ label, value, helper, color }: { label: string; value: string; helper: string; color?: string }) {
  return (
    <div className="min-w-[140px] rounded-lg border border-slate-200 bg-white px-6 py-4 text-center dark:bg-background">
      <p className={cn("text-sm font-semibold", color || "text-slate-500")}>{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <p className="text-xs text-slate-500">{helper}</p>
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
