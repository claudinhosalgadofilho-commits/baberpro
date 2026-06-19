"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Grid2X2,
  Headphones,
  Menu,
  Moon,
  Package,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Store,
  Sun,
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
  { label: "Dashboard", href: "/dashboard", icon: Grid2X2, active: true },
  { label: "Agenda", href: "/agendamentos", icon: CalendarDays },
  { label: "Clientes", href: "/clientes", icon: UsersRound },
  { label: "Serviços", href: "/configuracoes", icon: Sparkles },
  { label: "Profissionais", href: "/equipe", icon: UsersRound },
  { label: "Financeiro", href: "/financeiro", icon: CircleDollarSign, expandable: true },
  { label: "Estoque", href: "/estoque", icon: Package },
  { label: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { label: "Marketing", href: "/configuracoes", icon: Send, expandable: true },
  { label: "Configurações", href: "/configuracoes", icon: Settings, expandable: true },
  { label: "Ajuda", href: "/#contato", icon: CircleHelp },
];

const kpis = [
  {
    title: "Faturamento hoje",
    value: "R$ 2.482,50",
    change: "+ 18,6% vs ontem",
    icon: CircleDollarSign,
    iconClass: "bg-[#FFF4DE] text-barber-gold",
    cardClass: "border-[#F4DFAE] bg-[#FFFBF3]",
  },
  {
    title: "Agendamentos hoje",
    value: "28",
    change: "+ 12% vs ontem",
    icon: CalendarDays,
    iconClass: "bg-emerald-100 text-emerald-600",
    cardClass: "border-emerald-100 bg-[#F7FFFB]",
  },
  {
    title: "Novos clientes (mês)",
    value: "37",
    change: "+ 23% vs mês passado",
    icon: UsersRound,
    iconClass: "bg-blue-100 text-blue-700",
    cardClass: "border-blue-100 bg-[#F8FBFF]",
  },
  {
    title: "Ticket médio",
    value: "R$ 88,66",
    change: "+ 7,3% vs mês passado",
    icon: WalletCards,
    iconClass: "bg-violet-100 text-violet-700",
    cardClass: "border-violet-100 bg-[#FCFAFF]",
  },
];

const chartPoints = [
  [42, 150],
  [72, 150],
  [104, 132],
  [136, 135],
  [164, 120],
  [194, 150],
  [224, 150],
  [254, 150],
  [284, 120],
  [314, 128],
  [344, 72],
  [374, 98],
  [404, 132],
  [434, 102],
  [464, 92],
  [494, 104],
  [524, 106],
  [554, 86],
  [584, 72],
  [614, 50],
  [644, 28],
  [674, 16],
  [704, 48],
  [734, 28],
  [764, 18],
  [794, 16],
];

const appointments = [
  { time: "09:00", client: "Carlos Eduardo", service: "Corte + Barba", barber: "Bruno Costa", status: "Concluído", tone: "green" },
  { time: "10:30", client: "Marcos Vinícius", service: "Corte Degradê", barber: "Lucas Silva", status: "Em andamento", tone: "orange" },
  { time: "14:00", client: "Rafael Almeida", service: "Corte + Barba + Sobrancelha", barber: "Bruno Costa", status: "Confirmado", tone: "blue" },
  { time: "15:30", client: "André Luiz", service: "Barba", barber: "Lucas Silva", status: "Confirmado", tone: "blue" },
  { time: "17:00", client: "Felipe Rocha", service: "Corte + Pigmentação", barber: "Bruno Costa", status: "Confirmado", tone: "blue" },
];

const services = [
  ["Corte Degradê", "156", "100%"],
  ["Corte + Barba", "132", "84%"],
  ["Barba", "98", "62%"],
  ["Corte Social", "76", "48%"],
  ["Sobrancelha", "42", "27%"],
];

const professionals = [
  ["Bruno Costa", "R$ 18.450,00", "100%"],
  ["Lucas Silva", "R$ 15.320,00", "82%"],
  ["Gustavo Almeida", "R$ 12.850,00", "68%"],
  ["Pedro Henrique", "R$ 8.920,00", "47%"],
  ["Matheus Lima", "R$ 6.824,50", "36%"],
];

const financeRows = [
  { label: "Receitas", value: "R$ 72.850,00", tone: "green" },
  { label: "Despesas", value: "R$ 4.485,50", tone: "red" },
  { label: "Lucro líquido", value: "R$ 68.364,50", tone: "gold" },
  { label: "Margem de lucro", value: "94,0%", tone: "purple" },
];

export default function DashboardPage() {
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
              <h1 className="text-3xl font-black tracking-normal md:text-4xl">Olá, João! 👋</h1>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-300">Aqui está o resumo da sua barbearia hoje.</p>
            </div>

            <Button variant="outline" className="h-14 w-full justify-between rounded-lg border-slate-200 bg-white px-5 text-base font-bold shadow-sm dark:bg-card sm:w-[230px]">
              13 de maio de 2024
              <Calendar className="h-5 w-5 text-slate-500" />
            </Button>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
            {kpis.map((kpi) => (
              <MetricCard key={kpi.title} {...kpi} />
            ))}
          </div>

          <div className="mt-6 grid gap-5 2xl:grid-cols-[1fr_1.07fr]">
            <RevenueCard />
            <AppointmentsCard />
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2 2xl:grid-cols-[1fr_1.05fr_1.1fr]">
            <RankingCard title="Serviços mais realizados" action="Ver todos" rows={services} numbered />
            <RankingCard title="Faturamento por profissional" action="Ver todos" rows={professionals} avatar />
            <FinanceSummary />
          </div>
        </section>
      </div>

      <Button
        className="fixed bottom-7 right-7 h-16 w-16 rounded-full bg-barber-gold text-white shadow-[0_18px_35px_rgba(212,160,23,0.38)] hover:bg-[#bd8f13]"
        aria-label="Adicionar novo registro"
      >
        <Plus className="h-8 w-8" />
      </Button>
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
    <header className="flex flex-wrap items-center gap-4">
      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg text-slate-700 xl:hidden">
        <Menu className="h-6 w-6" />
      </Button>

      <Button variant="ghost" size="icon" className="hidden h-11 w-11 rounded-lg text-slate-700 xl:flex">
        <Menu className="h-6 w-6" />
      </Button>

      <div className="order-3 min-w-[220px] flex-1 md:order-none md:ml-auto md:max-w-[500px]">
        <div className="relative">
          <Input
            className="h-14 rounded-lg border-slate-200 bg-white pl-6 pr-14 text-base shadow-sm dark:bg-card"
            placeholder="Buscar clientes, agendamentos, serviços..."
          />
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

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconClass,
  cardClass,
}: {
  title: string;
  value: string;
  change: string;
  icon: ComponentType<{ className?: string }>;
  iconClass: string;
  cardClass: string;
}) {
  return (
    <Card className={cn("rounded-lg shadow-[0_14px_35px_rgba(15,23,42,0.07)] dark:bg-card", cardClass)}>
      <CardContent className="flex items-center gap-5 p-6">
        <div className={cn("flex h-20 w-20 shrink-0 items-center justify-center rounded-full", iconClass)}>
          <Icon className="h-10 w-10" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-normal text-slate-500 dark:text-slate-300">{title}</p>
          <p className="mt-2 text-3xl font-black">{value}</p>
          <p className="mt-2 text-sm font-semibold text-emerald-600">{change}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueCard() {
  const line = chartPoints.map((point) => point.join(",")).join(" ");
  const area = `42,190 ${line} 794,190`;

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black">Faturamento</h2>
            <p className="mt-6 text-3xl font-black">R$ 68.364,50</p>
            <p className="mt-3 text-base font-semibold text-emerald-600">↑ 15,8% em relação ao mês passado</p>
          </div>
          <Button variant="outline" className="h-11 rounded-lg border-slate-200 bg-white px-5 dark:bg-background">
            Este mês <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg">
          <svg viewBox="0 0 840 230" className="h-[260px] w-full" role="img" aria-label="Gráfico de faturamento mensal">
            <defs>
              <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#D4A017" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#D4A017" stopOpacity="0.03" />
              </linearGradient>
            </defs>
            {[40, 80, 120, 160, 200].map((y, index) => (
              <g key={y}>
                <line x1="42" x2="806" y1={y} y2={y} stroke="#E5E7EB" strokeDasharray="6 5" />
                <text x="5" y={y + 4} fill="#64748B" fontSize="13">
                  {["40k", "30k", "20k", "10k", "0"][index]}
                </text>
              </g>
            ))}
            <polygon points={area} fill="url(#revenueFill)" />
            <polyline points={line} fill="none" stroke="#D48C00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {chartPoints.map(([x, y], index) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 15 ? 5 : 3.5} fill="#D48C00" stroke="#fff" strokeWidth="2" />
            ))}
            <g>
              <rect x="512" y="48" width="95" height="58" rx="6" fill="#0F172A" />
              <text x="542" y="73" fill="#fff" fontSize="13">
                15 Mai
              </text>
              <text x="528" y="94" fill="#fff" fontSize="13">
                R$ 22.450,00
              </text>
            </g>
            {[
              ["1 Mai", 42],
              ["5 Mai", 164],
              ["10 Mai", 314],
              ["15 Mai", 464],
              ["20 Mai", 614],
              ["25 Mai", 734],
              ["31 Mai", 794],
            ].map(([label, x]) => (
              <text key={label} x={Number(x) - 18} y="222" fill="#64748B" fontSize="13">
                {label}
              </text>
            ))}
          </svg>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Legend label="Receitas" value="R$ 72.850,00" color="bg-emerald-600" />
          <Legend label="Despesas" value="R$ 4.485,50" color="bg-red-600" />
          <Legend label="Lucro líquido" value="R$ 68.364,50" color="bg-barber-gold" />
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-barber-gold" />
              Meta do mês
            </div>
            <p className="mt-3 text-xl font-black">85%</p>
            <p className="text-sm text-slate-500">R$ 80.000,00</p>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-[85%] rounded-full bg-barber-gold" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Legend({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
        {label}
      </div>
      <p className="mt-3 text-xl font-black">{value}</p>
    </div>
  );
}

function AppointmentsCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black">Agendamentos de hoje</h2>
          <Button asChild variant="outline" className="h-11 rounded-lg border-slate-200 bg-white px-5 dark:bg-background">
            <Link href="/agendamentos">Ver agenda</Link>
          </Button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <tbody>
              {appointments.map((item) => (
                <tr key={`${item.time}-${item.client}`} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="w-[88px] py-4 text-base font-semibold">{item.time}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-11 w-11">
                        <AvatarFallback className="bg-slate-200 text-slate-900">{initials(item.client)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black">{item.client}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{item.service}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-slate-200 text-xs text-slate-900">{initials(item.barber)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{item.barber}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <StatusBadge status={item.status} tone={item.tone} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-5 text-base dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-300">Total de agendamentos: <span className="font-black text-barber-ink dark:text-white">12</span></p>
          <Link href="/agendamentos" className="font-bold text-barber-gold hover:text-[#bd8f13]">
            Ver todos
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status, tone }: { status: string; tone: string }) {
  const classes =
    tone === "green"
      ? "bg-emerald-100 text-emerald-700"
      : tone === "orange"
        ? "bg-amber-100 text-amber-700"
        : "bg-blue-100 text-blue-700";
  return (
    <span className={cn("inline-flex min-w-[142px] items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-black", classes)}>
      {tone === "green" ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}
      {status}
    </span>
  );
}

function RankingCard({
  title,
  action,
  rows,
  numbered,
  avatar,
}: {
  title: string;
  action: string;
  rows: string[][];
  numbered?: boolean;
  avatar?: boolean;
}) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">{title}</h2>
          <Button asChild variant="outline" className="h-10 rounded-lg border-slate-200 bg-white px-4 dark:bg-background">
            <Link href={avatar ? "/equipe" : "/relatorios"}>{action}</Link>
          </Button>
        </div>

        <div className="mt-5 space-y-5">
          {rows.map(([label, value, width], index) => (
            <div key={label} className="grid grid-cols-[1fr_190px_auto] items-center gap-4">
              <div className="flex min-w-0 items-center gap-3">
                {numbered && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-barber-gold text-xs font-black text-white">{index + 1}</span>
                )}
                {avatar && (
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-slate-200 text-xs text-slate-900">{initials(label)}</AvatarFallback>
                  </Avatar>
                )}
                <span className="truncate font-semibold">{label}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-barber-gold" style={{ width }} />
              </div>
              <span className="whitespace-nowrap font-bold">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FinanceSummary() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Resumo financeiro</h2>
          <Button asChild variant="outline" className="h-10 rounded-lg border-slate-200 bg-white px-4 dark:bg-background">
            <Link href="/financeiro">Ver relatório</Link>
          </Button>
        </div>

        <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">
          {financeRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    row.tone === "green" && "bg-emerald-100 text-emerald-600",
                    row.tone === "red" && "bg-red-100 text-red-600",
                    row.tone === "gold" && "bg-amber-100 text-barber-gold",
                    row.tone === "purple" && "bg-violet-100 text-violet-700",
                  )}
                >
                  <WalletCards className="h-5 w-5" />
                </span>
                <span className="font-semibold">{row.label}</span>
              </div>
              <span className="text-xl font-black">{row.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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
