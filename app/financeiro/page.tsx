"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUp,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Download,
  Grid2X2,
  Headphones,
  Home,
  Menu,
  Moon,
  MoreHorizontal,
  Package,
  PieChart,
  Plus,
  Receipt,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  Ticket,
  TrendingDown,
  UsersRound,
  WalletCards,
  Zap,
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
  { label: "Serviços", href: "/configuracoes", icon: Sparkles },
  { label: "Profissionais", href: "/equipe", icon: UsersRound },
  { label: "Financeiro", href: "/financeiro", icon: CircleDollarSign, active: true, expandable: true },
  { label: "Estoque", href: "/estoque", icon: Package },
  { label: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { label: "Marketing", href: "/configuracoes", icon: Send, expandable: true },
  { label: "Configurações", href: "/configuracoes", icon: Settings, expandable: true },
  { label: "Ajuda", href: "/#contato", icon: CircleHelp },
];

const financeMenu = ["Visão geral", "Fluxo de caixa", "Receitas", "Despesas", "Contas a receber", "Contas a pagar", "Relatórios"];

const metrics = [
  {
    title: "Receitas totais",
    value: "R$ 72.850,00",
    change: "↑ 18,6% vs mês passado",
    icon: CircleDollarSign,
    cardClass: "border-emerald-100 bg-[#F7FFFB]",
    iconClass: "bg-emerald-100 text-emerald-600",
    titleClass: "text-emerald-700",
    changeClass: "text-emerald-700",
  },
  {
    title: "Despesas totais",
    value: "R$ 4.485,50",
    change: "↓ 5,3% vs mês passado",
    icon: TrendingDown,
    cardClass: "border-red-100 bg-[#FFF8F8]",
    iconClass: "bg-red-100 text-red-600",
    titleClass: "text-red-700",
    changeClass: "text-red-700",
  },
  {
    title: "Lucro líquido",
    value: "R$ 68.364,50",
    change: "↑ 15,8% vs mês passado",
    icon: BriefcaseBusiness,
    cardClass: "border-[#F4DFAE] bg-[#FFFBF3]",
    iconClass: "bg-[#FFF1CC] text-barber-gold",
    titleClass: "text-barber-gold",
    changeClass: "text-emerald-700",
  },
  {
    title: "Margem de lucro",
    value: "94,0%",
    change: "↑ 2,4% vs mês passado",
    icon: PieChart,
    cardClass: "border-violet-100 bg-[#FCFAFF]",
    iconClass: "bg-violet-100 text-violet-700",
    titleClass: "text-violet-700",
    changeClass: "text-emerald-700",
  },
  {
    title: "Ticket médio",
    value: "R$ 88,66",
    change: "↑ 7,3% vs mês passado",
    icon: Ticket,
    cardClass: "border-blue-100 bg-[#F8FBFF]",
    iconClass: "bg-blue-100 text-blue-700",
    titleClass: "text-blue-700",
    changeClass: "text-emerald-700",
  },
];

const cashflow = [
  [30, 12, 0],
  [36, 17, 0.5],
  [31, 12, 0],
  [36, 15, -0.5],
  [42, 20, 1],
  [31, 12, 0],
  [38, 17, 0.5],
  [42, 20, -1],
  [50, 26, 2],
  [59, 33, 0],
  [49, 26, 0],
  [43, 24, 0],
  [37, 17, 0],
  [46, 27, 1],
  [41, 25, 0.5],
  [60, 35, 1.2],
  [70, 43, 2],
  [59, 35, 0],
  [56, 31, -1],
  [51, 28, 0],
  [49, 29, 2],
  [50, 29, 0],
  [59, 37, 1],
  [50, 30, -1],
  [52, 30, 2],
  [62, 38, 0],
  [54, 31, -0.5],
  [50, 29, 0],
  [56, 34, 0],
  [66, 42, 0],
  [59, 35, -0.5],
  [70, 44, 0],
];

const revenueCategories = [
  { label: "Cortes de cabelo", percent: "40,2%", value: "R$ 29.290,00", color: "#E59A00" },
  { label: "Barba", percent: "23,7%", value: "R$ 17.260,00", color: "#0F172A" },
  { label: "Pacotes", percent: "16,1%", value: "R$ 11.720,00", color: "#2563EB" },
  { label: "Sobrancelha", percent: "8,4%", value: "R$ 6.120,00", color: "#9B7AE5" },
  { label: "Outros serviços", percent: "11,6%", value: "R$ 8.460,00", color: "#C4C7D0" },
];

const expenseCategories = [
  { label: "Produtos", percent: "45%", value: "R$ 2.018,48", icon: Package },
  { label: "Aluguel", percent: "20%", value: "R$ 897,10", icon: Home },
  { label: "Utilidades", percent: "15%", value: "R$ 672,83", icon: Zap },
  { label: "Marketing", percent: "10%", value: "R$ 448,55", icon: Send },
  { label: "Outros", percent: "10%", value: "R$ 448,54", icon: MoreHorizontal },
];

const movements = [
  { label: "Recebimento - Corte + Barba", time: "Hoje, 13:45", value: "R$ 120,00", type: "in" },
  { label: "Recebimento - Pacote Premium", time: "Hoje, 12:30", value: "R$ 180,00", type: "in" },
  { label: "Pagamento - Fornecedor", time: "Hoje, 10:15", value: "R$ 320,00", type: "out" },
  { label: "Pagamento - Aluguel", time: "Ontem, 15:00", value: "R$ 897,10", type: "out" },
  { label: "Recebimento - Corte Social", time: "Ontem, 14:20", value: "R$ 80,00", type: "in" },
];

export default function FinanceiroPage() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1 px-4 py-5 md:px-7 lg:px-8">
          <Topbar dark={dark} setDark={setDark} />

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black tracking-normal md:text-4xl">Financeiro</h1>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-barber-gold/10 text-barber-gold">
                  <CircleDollarSign className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-300">Acompanhe o desempenho financeiro da sua barbearia.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="h-12 justify-between rounded-lg border-slate-200 bg-white px-5 text-base font-bold shadow-sm dark:bg-card sm:w-[270px]">
                <CalendarDays className="mr-2 h-5 w-5" />
                01 a 31 de Maio de 2024
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-12 rounded-lg border-slate-200 bg-white px-5 text-base font-bold shadow-sm dark:bg-card">
                <Download className="mr-2 h-5 w-5" />
                Exportar relatório
              </Button>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 2xl:grid-cols-5">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>

          <div className="mt-6 grid gap-5 2xl:grid-cols-[1.45fr_1fr]">
            <CashflowCard />
            <RevenueCategoriesCard />
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2 2xl:grid-cols-[0.95fr_1.12fr_1.12fr]">
            <PeriodSummary />
            <ExpenseCategoriesCard />
            <MovementsCard />
          </div>
        </section>
      </div>

      <Button
        className="fixed bottom-7 right-7 h-16 w-16 rounded-full bg-barber-gold text-white shadow-[0_18px_35px_rgba(212,160,23,0.38)] hover:bg-[#bd8f13]"
        aria-label="Adicionar movimentação"
      >
        <Plus className="h-8 w-8" />
      </Button>
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-[278px] shrink-0 flex-col bg-[#071018] px-4 py-7 text-white xl:flex">
      <Link href="/" className="mx-auto block" aria-label="Ir para a página inicial">
        <Image src="/barberpro-logo-login.png" alt="BarberPro" width={200} height={155} priority className="h-[155px] w-[200px] object-contain" />
      </Link>

      <nav className="mt-7 space-y-1.5">
        {navItems.map((item) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className={cn(
                "flex h-[50px] items-center gap-4 rounded-lg px-4 text-base font-semibold transition-colors",
                item.active ? "bg-barber-gold text-white shadow-[0_12px_28px_rgba(212,160,23,0.28)]" : "text-slate-100 hover:bg-white/8 hover:text-barber-gold",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="min-w-0 flex-1">{item.label}</span>
              {item.expandable && <ChevronRight className={cn("h-4 w-4", item.active && "rotate-90")} />}
            </Link>
            {item.active && (
              <div className="ml-12 mt-2 space-y-2 pb-2">
                {financeMenu.map((sub, index) => (
                  <Link key={sub} href="/financeiro" className="flex h-7 items-center justify-between text-sm font-medium text-white hover:text-barber-gold">
                    {sub}
                    {index === 0 && <span className="h-2 w-2 rounded-full bg-barber-gold" />}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <Card className="mt-auto border-white/10 bg-white/[0.035] text-white shadow-none">
        <CardContent className="p-5 text-center">
          <CrownIcon />
          <p className="mt-4 text-sm">Plano <span className="font-black text-barber-gold">PROFISSIONAL</span></p>
          <p className="mt-3 text-sm text-slate-300">Vencimento: 25/06/2025</p>
          <Button asChild variant="outline" className="mt-5 h-11 w-full rounded-lg border-barber-gold bg-transparent text-barber-gold hover:bg-barber-gold/15">
            <Link href="/cadastro-conta">Gerenciar plano</Link>
          </Button>
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
          <div className="mr-1 flex h-10 w-11 items-center justify-center rounded-full bg-[#071018] text-white shadow-sm">
            <Moon className="h-5 w-5" />
          </div>
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
  cardClass,
  iconClass,
  titleClass,
  changeClass,
}: {
  title: string;
  value: string;
  change: string;
  icon: ComponentType<{ className?: string }>;
  cardClass: string;
  iconClass: string;
  titleClass: string;
  changeClass: string;
}) {
  return (
    <Card className={cn("rounded-lg shadow-[0_14px_35px_rgba(15,23,42,0.07)] dark:bg-card", cardClass)}>
      <CardContent className="flex items-center gap-5 p-6">
        <div className={cn("flex h-18 w-18 shrink-0 items-center justify-center rounded-full", iconClass)}>
          <Icon className="h-9 w-9" />
        </div>
        <div className="min-w-0">
          <p className={cn("text-sm font-black uppercase tracking-normal", titleClass)}>{title}</p>
          <p className="mt-3 text-2xl font-black 2xl:text-3xl">{value}</p>
          <p className={cn("mt-3 text-sm font-semibold", changeClass)}>{change}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function CashflowCard() {
  const points = cashflow.map(([income, expense, profit], index) => {
    const x = 42 + index * 24;
    return {
      x,
      incomeY: yFromValue(income),
      expenseY: yFromValue(expense),
      profitY: yFromValue(profit),
    };
  });
  const incomeLine = points.map((point) => `${point.x},${point.incomeY}`).join(" ");
  const expenseLine = points.map((point) => `${point.x},${point.expenseY}`).join(" ");
  const profitLine = points.map((point) => `${point.x},${point.profitY}`).join(" ");
  const area = `42,224 ${points.map((point) => `${point.x},${point.incomeY}`).join(" ")} ${points[points.length - 1].x},224`;

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black">Fluxo de caixa</h2>
          <Button variant="outline" className="h-11 rounded-lg border-slate-200 bg-white px-5 dark:bg-background">
            Este mês <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-8 text-sm font-semibold">
          <ChartLegend color="bg-emerald-600" label="Receitas" />
          <ChartLegend color="bg-red-600" label="Despesas" />
          <ChartLegend color="bg-barber-gold" label="Lucro líquido" diamond />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg">
          <svg viewBox="0 0 840 285" className="h-[310px] w-full" role="img" aria-label="Gráfico de fluxo de caixa">
            <defs>
              <linearGradient id="cashFlowFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#D4A017" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#D4A017" stopOpacity="0.03" />
              </linearGradient>
            </defs>
            {[40, 86, 132, 178, 224].map((y, index) => (
              <g key={y}>
                <line x1="42" x2="810" y1={y} y2={y} stroke="#E5E7EB" strokeDasharray="6 5" />
                <text x="0" y={y + 4} fill="#64748B" fontSize="13">
                  {["80k", "60k", "40k", "20k", "0"][index]}
                </text>
              </g>
            ))}
            <polygon points={area} fill="url(#cashFlowFill)" />
            <polyline points={incomeLine} fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={profitLine} fill="none" stroke="#D48C00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points={expenseLine} fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((point, index) => (
              <g key={point.x}>
                <circle cx={point.x} cy={point.incomeY} r={index === 14 ? 5 : 3.5} fill="#059669" stroke="#fff" strokeWidth="2" />
                <circle cx={point.x} cy={point.profitY} r={3.5} fill="#D48C00" stroke="#fff" strokeWidth="2" />
                <circle cx={point.x} cy={point.expenseY} r={3.5} fill="#DC2626" stroke="#fff" strokeWidth="2" />
              </g>
            ))}
            <line x1="378" x2="378" y1="40" y2="224" stroke="#D1D5DB" />
            <g>
              <rect x="300" y="55" width="142" height="91" rx="7" fill="#0F172A" />
              <text x="315" y="80" fill="#fff" fontSize="13">
                15 Mai
              </text>
              <text x="315" y="103" fill="#86EFAC" fontSize="13">
                Receitas: R$ 5.850,00
              </text>
              <text x="315" y="124" fill="#FCA5A5" fontSize="13">
                Despesas: R$ 320,00
              </text>
              <text x="315" y="145" fill="#FCD34D" fontSize="13">
                Lucro: R$ 5.530,00
              </text>
            </g>
            {[
              ["01 Mai", 42],
              ["06 Mai", 162],
              ["11 Mai", 282],
              ["16 Mai", 402],
              ["21 Mai", 522],
              ["26 Mai", 642],
              ["31 Mai", 762],
            ].map(([label, x]) => (
              <text key={label} x={Number(x) - 18} y="267" fill="#64748B" fontSize="13">
                {label}
              </text>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueCategoriesCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black">Receitas por categoria</h2>
          <Button variant="outline" className="h-11 rounded-lg border-slate-200 bg-white px-5 dark:bg-background">
            Este mês <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr] lg:items-center">
          <div className="relative mx-auto h-[260px] w-[260px]">
            <svg viewBox="0 0 240 240" className="h-full w-full -rotate-90" aria-label="Gráfico de categorias de receita">
              <circle cx="120" cy="120" r="82" fill="transparent" stroke="#E59A00" strokeWidth="48" strokeDasharray="207 515" strokeDashoffset="0" />
              <circle cx="120" cy="120" r="82" fill="transparent" stroke="#0F172A" strokeWidth="48" strokeDasharray="122 515" strokeDashoffset="-207" />
              <circle cx="120" cy="120" r="82" fill="transparent" stroke="#2563EB" strokeWidth="48" strokeDasharray="83 515" strokeDashoffset="-329" />
              <circle cx="120" cy="120" r="82" fill="transparent" stroke="#9B7AE5" strokeWidth="48" strokeDasharray="43 515" strokeDashoffset="-412" />
              <circle cx="120" cy="120" r="82" fill="transparent" stroke="#C4C7D0" strokeWidth="48" strokeDasharray="60 515" strokeDashoffset="-455" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-black">R$ 72.850,00</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Total</p>
            </div>
          </div>

          <div className="space-y-6">
            {revenueCategories.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_auto] gap-4">
                <div className="flex items-center gap-4">
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className="font-black">{item.percent}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PeriodSummary() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <h2 className="text-xl font-black">Resumo do período</h2>
        <div className="mt-7 divide-y divide-slate-200 dark:divide-slate-700">
          <SummaryLine label="Saldo inicial" value="R$ 12.450,00" />
          <SummaryLine label="Total de entradas" value="R$ 72.850,00" valueClass="text-emerald-600" />
          <SummaryLine label="Total de saídas" value="R$ 4.485,50" valueClass="text-red-600" />
        </div>
        <div className="mt-6 flex items-center justify-between rounded-lg border border-[#F2D08B] bg-[#FFF9EF] p-5 dark:bg-background">
          <div className="flex items-center gap-4">
            <Receipt className="h-6 w-6" />
            <span className="font-bold">Saldo final</span>
          </div>
          <span className="text-2xl font-black">R$ 80.814,50</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ExpenseCategoriesCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Despesas por categoria</h2>
          <Button variant="outline" className="h-10 rounded-lg border-slate-200 bg-white px-4 dark:bg-background">
            Este mês <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-7 space-y-6">
          {expenseCategories.map((item) => (
            <div key={item.label} className="grid grid-cols-[1fr_190px_44px_100px] items-center gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="truncate font-semibold">{item.label}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-red-600" style={{ width: item.percent }} />
              </div>
              <span className="font-bold">{item.percent}</span>
              <span className="text-right font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MovementsCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Últimas movimentações</h2>
          <Button asChild variant="outline" className="h-10 rounded-lg border-slate-200 bg-white px-4 dark:bg-background">
            <Link href="/financeiro">Ver todas</Link>
          </Button>
        </div>

        <div className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">
          {movements.map((movement) => {
            const isIn = movement.type === "in";
            return (
              <div key={`${movement.label}-${movement.time}`} className="grid grid-cols-[1fr_auto] items-center gap-4 py-4">
                <div className="flex min-w-0 items-center gap-4">
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", isIn ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600")}>
                    {isIn ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{movement.label}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{movement.time}</p>
                  </div>
                </div>
                <span className={cn("font-black", isIn ? "text-emerald-600" : "text-red-600")}>{movement.value}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ChartLegend({ color, label, diamond }: { color: string; label: string; diamond?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("h-3 w-3", diamond ? "rotate-45 rounded-[2px]" : "rounded-full", color)} />
      {label}
    </div>
  );
}

function SummaryLine({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <span className="font-semibold">{label}</span>
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

function yFromValue(value: number) {
  return 224 - (value / 80) * 184;
}
