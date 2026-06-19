"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  Edit3,
  Grid2X2,
  Headphones,
  Menu,
  MoreVertical,
  Package,
  Plus,
  Search,
  Scissors,
  Send,
  Settings,
  Sparkles,
  Sun,
  UsersRound,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type ServiceStatus = "active" | "inactive";

type ServiceItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  professional: string;
  status: ServiceStatus;
  iconTone: string;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Grid2X2 },
  { label: "Agenda", href: "/agendamentos", icon: CalendarDays },
  { label: "Clientes", href: "/clientes", icon: UsersRound },
  { label: "Servicos", href: "/servicos", icon: Scissors, active: true },
  { label: "Profissionais", href: "/equipe", icon: UsersRound },
  { label: "Financeiro", href: "/financeiro", icon: CircleDollarSign, expandable: true },
  { label: "Estoque", href: "/estoque", icon: Package, expandable: true },
  { label: "Relatorios", href: "/relatorios", icon: BarChart3 },
  { label: "Marketing", href: "/marketing", icon: Send, expandable: true },
  { label: "Configuracoes", href: "/configuracoes", icon: Settings, expandable: true },
  { label: "Ajuda", href: "/#contato", icon: CircleHelp },
];

const services: ServiceItem[] = [
  { id: "srv-001", name: "Corte Degrade", description: "Corte de cabelo degrade", category: "Corte de cabelo", duration: 40, price: 60, professional: "Carlos Eduardo", status: "active", iconTone: "bg-blue-100 text-blue-800" },
  { id: "srv-002", name: "Corte Social", description: "Corte tradicional", category: "Corte de cabelo", duration: 30, price: 40, professional: "Carlos Eduardo", status: "active", iconTone: "bg-slate-100 text-slate-800" },
  { id: "srv-003", name: "Barba", description: "Aparar e modelar barba", category: "Barba", duration: 30, price: 40, professional: "Carlos Eduardo", status: "active", iconTone: "bg-orange-100 text-orange-700" },
  { id: "srv-004", name: "Barba + Toalha Quente", description: "Barba completa com toalha quente", category: "Barba", duration: 45, price: 55, professional: "Carlos Eduardo", status: "active", iconTone: "bg-amber-100 text-amber-700" },
  { id: "srv-005", name: "Pigmentacao", description: "Pigmentacao capilar", category: "Tratamentos", duration: 60, price: 120, professional: "Carlos Eduardo", status: "active", iconTone: "bg-slate-200 text-slate-900" },
  { id: "srv-006", name: "Hidratacao Capilar", description: "Hidratacao e nutricao dos fios", category: "Tratamentos", duration: 50, price: 80, professional: "Carlos Eduardo", status: "active", iconTone: "bg-stone-100 text-stone-700" },
  { id: "srv-007", name: "Sobrancelha", description: "Design de sobrancelha", category: "Tratamentos", duration: 20, price: 30, professional: "Carlos Eduardo", status: "active", iconTone: "bg-yellow-100 text-yellow-700" },
  { id: "srv-008", name: "Corte + Barba", description: "Corte de cabelo + barba", category: "Pacotes", duration: 70, price: 90, professional: "Carlos Eduardo", status: "active", iconTone: "bg-emerald-100 text-emerald-700" },
];

const categoryCounts = [
  { label: "Todos os servicos", value: "all", count: 18 },
  { label: "Corte de cabelo", value: "Corte de cabelo", count: 8 },
  { label: "Barba", value: "Barba", count: 5 },
  { label: "Tratamentos", value: "Tratamentos", count: 3 },
  { label: "Coloracao", value: "Coloracao", count: 1 },
  { label: "Pacotes", value: "Pacotes", count: 1 },
];

const ranking = [
  { name: "Corte Degrade", value: 124 },
  { name: "Barba", value: 98 },
  { name: "Corte + Barba", value: 65 },
  { name: "Corte Social", value: 54 },
  { name: "Sobrancelha", value: 31 },
];

const categoryRevenue = [
  { name: "Corte de cabelo", value: 578.25, percent: "45%", color: "#D99500" },
  { name: "Barba", value: 321.25, percent: "25%", color: "#F2A51B" },
  { name: "Tratamentos", value: 257, percent: "20%", color: "#7EA2F2" },
  { name: "Pacotes", value: 128.5, percent: "10%", color: "#7C5AC7" },
];

const history = [
  { month: "Dez", value: 500 },
  { month: "Jan", value: 780 },
  { month: "Fev", value: 1120 },
  { month: "Mar", value: 880 },
  { month: "Abr", value: 1240 },
  { month: "Mai", value: 1680 },
];

export default function ServicesPage() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [professional, setProfessional] = useState("all");
  const [onlyActive, setOnlyActive] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesQuery = `${service.name} ${service.description}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || service.category === category;
      const matchesProfessional = professional === "all" || service.professional === professional;
      const matchesStatus = !onlyActive || service.status === "active";

      return matchesQuery && matchesCategory && matchesProfessional && matchesStatus;
    });
  }, [category, onlyActive, professional, query]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setProfessional("all");
    setOnlyActive(true);
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1 px-4 py-5 md:px-7 lg:px-8">
          <Topbar dark={dark} setDark={setDark} />

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-normal">Servicos</h1>
              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                <Link href="/servicos" className="hover:text-barber-gold">Servicos</Link>
                <span>&gt;</span>
                <span>Todos os servicos</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" className="h-12 rounded-lg bg-white px-5 font-bold shadow-sm dark:bg-card">
                <Link href="/servicos/categorias">
                  <Package className="mr-2 h-5 w-5" />
                  Categorias
                </Link>
              </Button>
              <Button asChild className="h-12 rounded-lg bg-barber-gold px-5 font-bold text-white shadow-sm hover:bg-[#bd8f13]">
                <Link href="/servicos/novo">
                  <Plus className="mr-2 h-5 w-5" />
                  Novo servico
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-7 grid gap-5 xl:grid-cols-[300px_1fr]">
            <aside className="space-y-5">
              <ServicesCategorySidebar selected={category} onSelect={setCategory} />
              <ServicesFilters
                query={query}
                setQuery={setQuery}
                category={category}
                setCategory={setCategory}
                professional={professional}
                setProfessional={setProfessional}
                onlyActive={onlyActive}
                setOnlyActive={setOnlyActive}
                clearFilters={clearFilters}
              />
            </aside>

            <div className="min-w-0 space-y-5">
              <ServicesStatsCards />
              <ServicesTable services={filteredServices} />
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            <MostPerformedServicesCard />
            <RevenueByCategoryChart />
            <RevenueHistoryChart />
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-[284px] shrink-0 flex-col bg-[#071018] px-5 py-7 text-white xl:flex">
      <Link href="/" className="mx-auto block" aria-label="Ir para a pagina inicial">
        <Image src="/barberpro-logo-login.png" alt="BarberPro" width={200} height={155} priority className="h-[155px] w-[200px] object-contain" />
      </Link>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => (
          <SidebarLink key={item.label} {...item} />
        ))}
      </nav>

      <div className="mt-auto space-y-6 pt-8">
        <Card className="border-white/10 bg-white/[0.03] text-white shadow-none">
          <CardContent className="p-5 text-center">
            <CrownIcon />
            <p className="mt-3 text-sm text-slate-200">Seu plano</p>
            <p className="font-black text-barber-gold">PROFISSIONAL</p>
            <Button variant="outline" className="mt-4 h-11 w-full rounded-lg border-barber-gold bg-transparent text-white hover:bg-barber-gold/10">
              Gerenciar plano
            </Button>
            <p className="mt-3 text-xs text-slate-300">Vencimento: 25/06/2025</p>
          </CardContent>
        </Card>

        <Link href="/configuracoes" className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/5">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-[#1F2937] text-base">JS</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">Joao Santos</p>
            <p className="truncate text-sm text-slate-300">Administrador</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-300" />
        </Link>
      </div>
    </aside>
  );
}

function SidebarLink({
  label,
  href,
  icon: Icon,
  active,
  expandable,
}: {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  active?: boolean;
  expandable?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-12 items-center gap-4 rounded-lg px-4 text-base font-bold transition-colors",
        active ? "bg-barber-gold text-white shadow-[0_14px_28px_rgba(212,160,23,0.25)]" : "text-white hover:bg-white/5",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="flex-1">{label}</span>
      {expandable && <ChevronDown className="h-4 w-4" />}
    </Link>
  );
}

function Topbar({ dark, setDark }: { dark: boolean; setDark: (value: boolean) => void }) {
  return (
    <header className="flex flex-wrap items-center gap-4">
      <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg text-slate-700 xl:hidden">
        <Menu className="h-6 w-6" />
      </Button>

      <div className="relative ml-auto w-full max-w-[520px]">
        <Input className="h-14 rounded-lg border-slate-200 bg-white pl-5 pr-12 text-base shadow-sm dark:bg-card" placeholder="Buscar clientes, servicos, agendamentos..." />
        <Search className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-700 dark:text-slate-200" />
      </div>

      <div className="ml-auto flex items-center gap-3 lg:ml-0">
        <Button onClick={() => setDark(!dark)} size="icon" variant="outline" className="h-12 w-12 rounded-full border-0 bg-white shadow-sm dark:bg-card">
          <Sun className="h-6 w-6 text-barber-gold" />
        </Button>
        <Button size="icon" variant="outline" className="relative h-12 w-12 rounded-full border-0 bg-white shadow-sm dark:bg-card">
          <Bell className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-barber-gold px-1 text-xs font-black text-white">3</span>
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

function ServicesCategorySidebar({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm dark:bg-card">
      <CardContent className="p-5">
        <h2 className="text-lg font-black">Categorias</h2>
        <div className="mt-4 space-y-1">
          {categoryCounts.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onSelect(item.value)}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-lg px-3 text-sm font-semibold transition-colors",
                selected === item.value ? "border border-barber-gold bg-[#FFF8E7] text-[#B77900]" : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5",
              )}
            >
              <span>{item.label}</span>
              <span>{item.count}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ServicesFilters({
  query,
  setQuery,
  category,
  setCategory,
  professional,
  setProfessional,
  onlyActive,
  setOnlyActive,
  clearFilters,
}: {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  professional: string;
  setProfessional: (value: string) => void;
  onlyActive: boolean;
  setOnlyActive: (value: boolean) => void;
  clearFilters: () => void;
}) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm dark:bg-card">
      <CardContent className="p-5">
        <h2 className="text-lg font-black">Filtros</h2>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Buscar servico</span>
            <div className="relative mt-2">
              <Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 rounded-lg bg-white pr-10 dark:bg-background" placeholder="Nome do servico..." />
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Categoria</span>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2 h-11 rounded-lg bg-white dark:bg-background">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                {categoryCounts.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Profissional</span>
            <Select value={professional} onValueChange={setProfessional}>
              <SelectTrigger className="mt-2 h-11 rounded-lg bg-white dark:bg-background">
                <SelectValue placeholder="Todos os profissionais" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os profissionais</SelectItem>
                <SelectItem value="Carlos Eduardo">Carlos Eduardo</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Mostrar apenas ativos</span>
            <Switch checked={onlyActive} onCheckedChange={setOnlyActive} />
          </div>

          <Button onClick={clearFilters} variant="outline" className="h-11 w-full rounded-lg bg-white dark:bg-background">
            <XCircle className="mr-2 h-4 w-4" />
            Limpar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ServicesStatsCards() {
  const stats = [
    { label: "Total de servicos", value: "18", icon: Sparkles, tone: "text-barber-gold bg-[#FFF8E7]" },
    { label: "Servicos ativos", value: "18", icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-50" },
    { label: "Servicos inativos", value: "0", icon: XCircle, tone: "text-red-600 bg-red-50" },
    { label: "Faturamento mes", value: "R$ 1.285,00", icon: CircleDollarSign, tone: "text-barber-gold bg-[#FFF8E7]" },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-lg border-slate-200 bg-white shadow-sm dark:bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={cn("flex h-14 w-14 items-center justify-center rounded-full", stat.tone)}>
              <stat.icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-2xl font-black">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ServicesTable({ services }: { services: ServiceItem[] }) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm dark:bg-card">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-black">Todos os servicos</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Servico</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Duracao</TableHead>
              <TableHead>Preco</TableHead>
              <TableHead>Profissional padrao</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5 text-right">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", service.iconTone)}>
                      <Scissors className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black">{service.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-300">{service.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <CategoryBadge category={service.category} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-slate-500" />
                    {service.duration} min
                  </div>
                </TableCell>
                <TableCell className="font-black">{formatMoney(service.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-200 text-xs font-black text-slate-700">CE</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{service.professional}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <ServiceStatusBadge status={service.status} />
                </TableCell>
                <TableCell className="pr-5">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="icon" variant="outline" className="h-9 w-9 rounded-lg bg-white dark:bg-background">
                      <Link href={`/servicos/${service.id}/editar`} aria-label={`Editar ${service.name}`}>
                        <Edit3 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <ServiceActionsMenu />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">Mostrando 1 a {services.length} de 18 servicos</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 rounded-lg bg-white dark:bg-background">Anterior</Button>
            {[1, 2, 3].map((page) => (
              <Button key={page} variant={page === 1 ? "default" : "outline"} className={cn("h-10 w-10 rounded-lg", page === 1 ? "bg-barber-gold text-white hover:bg-[#bd8f13]" : "bg-white dark:bg-background")}>
                {page}
              </Button>
            ))}
            <Button variant="outline" className="h-10 rounded-lg bg-white dark:bg-background">Proxima</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  return status === "active" ? (
    <Badge variant="success" className="rounded-md">Ativo</Badge>
  ) : (
    <Badge variant="warning" className="rounded-md">Inativo</Badge>
  );
}

function ServiceActionsMenu() {
  return (
    <div className="group relative">
      <Button size="icon" variant="outline" className="h-9 w-9 rounded-lg bg-white dark:bg-background" aria-label="Acoes do servico">
        <MoreVertical className="h-4 w-4" />
      </Button>
      <div className="invisible absolute right-0 top-10 z-20 w-40 rounded-lg border border-slate-200 bg-white p-1 text-sm font-semibold opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 dark:bg-card">
        <button className="block w-full rounded-md px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5">Duplicar</button>
        <button className="block w-full rounded-md px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-white/5">Desativar</button>
        <button className="block w-full rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-50">Excluir</button>
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, string> = {
    "Corte de cabelo": "border-amber-200 bg-amber-50 text-amber-700",
    Barba: "border-orange-200 bg-orange-50 text-orange-700",
    Tratamentos: "border-blue-200 bg-blue-50 text-blue-700",
    Pacotes: "border-violet-200 bg-violet-50 text-violet-700",
  };

  return <span className={cn("inline-flex rounded-md border px-3 py-1 text-xs font-bold", styles[category] || "border-slate-200 bg-slate-50")}>{category}</span>;
}

function MostPerformedServicesCard() {
  const max = Math.max(...ranking.map((item) => item.value));

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm dark:bg-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-black">Servicos mais realizados <span className="text-sm font-medium text-slate-500">(mes)</span></h2>
          <Button variant="outline" className="h-10 rounded-lg bg-white dark:bg-background">Ver relatorio</Button>
        </div>
        <div className="mt-5 space-y-4">
          {ranking.map((item, index) => (
            <div key={item.name} className="grid grid-cols-[28px_1fr_2fr_44px] items-center gap-3 text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-xs font-black">{index + 1}</span>
              <span className="font-semibold">{item.name}</span>
              <span className="h-2 overflow-hidden rounded-full bg-slate-100">
                <span className="block h-full rounded-full bg-barber-gold" style={{ width: `${(item.value / max) * 100}%` }} />
              </span>
              <span className="text-right font-black">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueByCategoryChart() {
  const mounted = useMounted();

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm dark:bg-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-black">Faturamento por categoria <span className="text-sm font-medium text-slate-500">(mes)</span></h2>
          <Button variant="outline" className="h-10 rounded-lg bg-white dark:bg-background">Ver relatorio</Button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[160px_1fr]">
          <div className="h-[180px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryRevenue} innerRadius={48} outerRadius={76} dataKey="value" stroke="none">
                    {categoryRevenue.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatMoney(Number(value || 0))} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-lg bg-slate-50" />
            )}
          </div>
          <div className="space-y-3 self-center">
            {categoryRevenue.map((item) => (
              <div key={item.name} className="flex items-start gap-3 text-sm">
                <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-slate-500">{item.percent} ({formatMoney(item.value)})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueHistoryChart() {
  const mounted = useMounted();

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm dark:bg-card">
      <CardContent className="p-5">
        <h2 className="font-black">Historico de faturamento <span className="text-sm font-medium text-slate-500">(ultimos 6 meses)</span></h2>
        <div className="mt-4 h-[190px]">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="serviceRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A017" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#D4A017" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip formatter={(value) => formatMoney(Number(value || 0))} />
                <Area type="monotone" dataKey="value" stroke="#D4A017" strokeWidth={2} fill="url(#serviceRevenue)" dot={{ r: 4, fill: "#D4A017" }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-lg bg-slate-50" />
          )}
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

function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
