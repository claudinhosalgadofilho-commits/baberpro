"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Grid2X2,
  Menu,
  Moon,
  Package,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";

import { AppointmentForm } from "@/components/appointments/AppointmentForm";
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
  { label: "Serviços", href: "/servicos", icon: Sparkles },
  { label: "Profissionais", href: "/profissionais", icon: UsersRound },
  { label: "Financeiro", href: "/financeiro", icon: CircleDollarSign, expandable: true },
  { label: "Estoque", href: "/estoque", icon: Package, expandable: true },
  { label: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { label: "Marketing", href: "/marketing", icon: Send, expandable: true },
  { label: "Configurações", href: "/configuracoes", icon: Settings, expandable: true },
  { label: "Ajuda", href: "/#contato", icon: CircleHelp },
];

export default function NovoAgendamentoPage() {
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

          <div className="mt-7 flex items-start gap-5">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-lg text-slate-700 hover:bg-slate-100">
              <Link href="/agendamentos">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-black tracking-normal md:text-4xl">Novo agendamento</h1>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-300">Preencha os dados para criar um novo agendamento.</p>
            </div>
          </div>

          <div className="mt-7">
            <AppointmentForm />
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
      <div className="order-3 min-w-[220px] flex-1 md:order-none md:ml-auto md:max-w-[500px]">
        <div className="relative">
          <Input className="h-14 rounded-lg border-slate-200 bg-white pl-6 pr-14 text-base shadow-sm dark:bg-card" placeholder="Buscar clientes, serviços, agendamentos..." />
          <Search className="absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-700" />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white text-slate-800 shadow-sm dark:bg-card dark:text-white">
          <Sun className="h-5 w-5" />
        </Button>
        <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
        <Moon className="h-5 w-5 text-barber-gold" />
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

function CrownIcon() {
  return (
    <div className="mx-auto flex h-10 w-10 items-center justify-center text-barber-gold">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="M4 8l4.2 4.3L12 5l3.8 7.3L20 8v11H4V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
