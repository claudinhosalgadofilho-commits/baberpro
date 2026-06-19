"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Briefcase,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  CreditCard,
  Edit3,
  Grid2X2,
  ImageIcon,
  Mail,
  Menu,
  Package,
  Phone,
  Printer,
  Scissors,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

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

const services = [
  { name: "Corte Degradê", description: "Corte de cabelo degradê", professional: "Carlos Eduardo", price: "R$ 60,00", duration: "40 min", tone: "violet" },
  { name: "Barba", description: "Aparar e modelar barba", professional: "Carlos Eduardo", price: "R$ 40,00", duration: "30 min", tone: "orange" },
];

const timeline = [
  { title: "Agendamento criado", detail: "10/05/2024 às 14:32 por João Santos", color: "bg-emerald-600" },
  { title: "Lembrete enviado (WhatsApp)", detail: "14/05/2024 às 09:00", color: "bg-blue-600" },
  { title: "Confirmado pelo cliente", detail: "14/05/2024 às 09:15", color: "bg-barber-gold" },
  { title: "Aguardando atendimento", detail: "15/05/2024 às 10:30", color: "bg-slate-500" },
];

export default function AppointmentDetailsPage({
  appointmentCode = "#AGD-001248",
}: {
  appointmentCode?: string;
}) {
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
              <h1 className="text-3xl font-black tracking-normal md:text-4xl">Detalhes do agendamento</h1>
              <div className="mt-3 flex items-center gap-3 text-base text-slate-500">
                <Link href="/agendamentos" className="hover:text-barber-gold">Agenda</Link>
                <ChevronRight className="h-4 w-4" />
                <span>Detalhes do agendamento</span>
              </div>
            </div>
          </div>

          <HeroDetails appointmentCode={appointmentCode} />

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.52fr]">
            <div className="space-y-5">
              <ServicesCard />
              <div className="grid gap-5 lg:grid-cols-[0.72fr_1fr]">
                <TimelineCard />
                <div className="space-y-5">
                  <NotesCard />
                  <AttachmentsCard />
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <StatusCard />
              <FinancialCard />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild variant="outline" className="h-14 rounded-lg bg-white px-10 text-base dark:bg-background">
              <Link href="/agendamentos">Voltar</Link>
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="h-14 rounded-lg border-violet-300 bg-white px-8 text-base text-violet-700 dark:bg-background">
                <Printer className="mr-2 h-5 w-5" /> Imprimir
              </Button>
              <Button variant="outline" className="h-14 rounded-lg border-violet-300 bg-white px-8 text-base text-violet-700 dark:bg-background">
                <Briefcase className="mr-2 h-5 w-5" /> Duplicar agendamento
              </Button>
              <Button asChild className="h-14 rounded-lg bg-violet-700 px-8 text-base text-white hover:bg-violet-800">
                <Link href="/agenda/novo">
                  <Edit3 className="mr-2 h-5 w-5" /> Editar agendamento
                </Link>
              </Button>
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

function HeroDetails({ appointmentCode }: { appointmentCode: string }) {
  return (
    <Card className="mt-6 rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="grid gap-8 p-7 xl:grid-cols-[0.95fr_0.95fr_0.9fr] xl:items-center">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-slate-200 text-3xl text-slate-900">LO</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black">Lucas Oliveira</h2>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
            </div>
            <InfoMini icon={Phone} text="(11) 98765-4321" />
            <InfoMini icon={Mail} text="lucas.oliveira@email.com" />
            <InfoMini icon={CalendarDays} text="Cliente desde: 12/03/2023" />
            <Button variant="outline" className="mt-5 h-12 rounded-lg border-violet-300 bg-white px-7 text-base text-violet-700 dark:bg-background">
              Ver perfil do cliente
            </Button>
          </div>
        </div>

        <div className="space-y-5 border-slate-200 xl:border-l xl:pl-8">
          <DetailLine icon={CalendarDays} label="Data" value="15/05/2024 (Quarta-feira)" />
          <DetailLine icon={Clock3} label="Horário" value="10:30" />
          <DetailLine icon={UserRound} label="Profissional" value="Carlos Eduardo" />
          <DetailLine icon={Briefcase} label="Unidade" value="Unidade principal" />
        </div>

        <div className="rounded-lg border border-violet-200 bg-violet-50/70 p-8 text-center">
          <p className="font-bold">Código do agendamento</p>
          <p className="mt-3 text-3xl font-black">{appointmentCode}</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Criado em 10/05/2024 às 14:32<br />por João Santos</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ServicesCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-0">
        <div className="flex border-b border-slate-200">
          {["Detalhes", "Histórico", "Pagamentos", "Comunicações"].map((tab, index) => (
            <button key={tab} className={cn("h-14 px-8 font-bold", index === 0 ? "border-b-2 border-violet-700 text-violet-700" : "text-slate-600")}>
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-black">Serviços agendados</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                  <th className="py-3 font-semibold">Serviço</th>
                  <th className="py-3 font-semibold">Profissional</th>
                  <th className="py-3 font-semibold">Preço</th>
                  <th className="py-3 font-semibold">Duração</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.name} className="border-b border-slate-100">
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", service.tone === "violet" ? "bg-violet-100 text-violet-700" : "bg-orange-100 text-orange-600")}>
                          <Scissors className="h-6 w-6" />
                        </span>
                        <div>
                          <p className="font-black">{service.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-slate-200 text-xs text-slate-900">CE</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{service.professional}</span>
                      </div>
                    </td>
                    <td className="py-5 font-bold">{service.price}</td>
                    <td className="py-5 font-bold">{service.duration}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-5 text-lg font-black">Total de serviços</td>
                  <td />
                  <td className="py-5 text-lg font-black">R$ 100,00</td>
                  <td className="py-5 text-lg font-black">70 min</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Status do agendamento</h2>
          <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 font-black text-emerald-700">
            <CheckCircle2 className="h-5 w-5" /> Confirmado
          </span>
        </div>
        <p className="mt-4 text-slate-500">O cliente confirmou este agendamento.</p>
        <div className="my-6 h-px bg-slate-200" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Button className="h-12 rounded-lg bg-violet-700 text-white hover:bg-violet-800">Chegou</Button>
          <Button variant="outline" className="h-12 rounded-lg border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100">
            Reagendar
          </Button>
          <Button variant="outline" className="h-12 rounded-lg border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
            <X className="mr-2 h-5 w-5" /> Cancelar
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <h3 className="font-black">Lembretes</h3>
          <Button variant="ghost" className="h-8 px-0 text-violet-700 hover:bg-transparent">Editar</Button>
        </div>
        <div className="mt-4 space-y-4">
          <ReminderLine icon={CheckCircle2} title="WhatsApp" detail="Enviado em 14/05/2024 às 09:00" color="text-emerald-600" />
          <ReminderLine icon={Clock3} title="SMS" detail="Agendado para 15/05/2024 às 09:00" />
          <ReminderLine icon={Clock3} title="E-mail" detail="Agendado para 15/05/2024 às 09:00" />
        </div>
      </CardContent>
    </Card>
  );
}

function TimelineCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-6">
        <h2 className="text-xl font-black">Linha do tempo</h2>
        <div className="mt-7 space-y-0">
          {timeline.map((item, index) => (
            <div key={item.title} className="grid grid-cols-[24px_1fr] gap-4">
              <div className="flex flex-col items-center">
                <span className={cn("h-5 w-5 rounded-full", item.color)} />
                {index < timeline.length - 1 && <span className="h-12 w-px bg-slate-200" />}
              </div>
              <div className="pb-5">
                <p className="font-black">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function NotesCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Observações</h2>
          <Button variant="outline" className="h-10 rounded-lg border-violet-300 bg-white text-violet-700 dark:bg-background">
            <Edit3 className="mr-2 h-4 w-4" /> Editar
          </Button>
        </div>
        <div className="mt-5 rounded-lg border border-orange-200 bg-orange-50 p-5 text-sm leading-7">
          <ul className="list-disc pl-5">
            <li>Cliente prefere corte mais baixo nas laterais.</li>
            <li>Usa pomada de fixação forte.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function AttachmentsCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-6">
        <h2 className="text-xl font-black">Anexos do agendamento</h2>
        <div className="mt-5 flex min-h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 text-center">
          <ImageIcon className="h-8 w-8 text-slate-500" />
          <p className="mt-3 font-black">Nenhum anexo</p>
          <p className="mt-2 text-sm text-slate-500">Arraste arquivos aqui ou clique para adicionar<br />Formatos: JPG, PNG, PDF (máx. 5MB)</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FinancialCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-6">
        <h2 className="text-xl font-black">Resumo financeiro</h2>
        <div className="mt-6 space-y-5">
          <SummaryLine label="Total de serviços" value="R$ 100,00" />
          <SummaryLine label="Desconto" value="R$ 0,00" valueClass="text-emerald-600" />
          <div className="h-px bg-slate-200" />
          <SummaryLine label="Valor total" value="R$ 100,00" strong />
          <div className="rounded-lg bg-emerald-100 px-4 py-3 text-sm text-emerald-700">
            <span className="font-black">Pago</span>
            <span className="ml-8 text-slate-700">Pagamento em 15/05/2024 às 09:45</span>
          </div>
          <Button variant="outline" className="h-14 w-full rounded-lg border-violet-300 bg-white text-base text-violet-700 dark:bg-background">
            <CreditCard className="mr-2 h-5 w-5" /> Ver detalhes do pagamento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoMini({ icon: Icon, text }: { icon: typeof Phone; text: string }) {
  return (
    <p className="mt-3 flex items-center gap-3 text-base text-slate-700 dark:text-slate-300">
      <Icon className="h-5 w-5" /> {text}
    </p>
  );
}

function DetailLine({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-6 w-6 text-slate-700 dark:text-slate-300" />
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 font-black">{value}</p>
      </div>
    </div>
  );
}

function ReminderLine({ icon: Icon, title, detail, color = "text-slate-600" }: { icon: typeof Clock3; title: string; detail: string; color?: string }) {
  return (
    <div className="flex gap-3">
      <Icon className={cn("mt-1 h-5 w-5", color)} />
      <div>
        <p className="font-black">{title}</p>
        <p className="text-sm text-slate-500">{detail}</p>
      </div>
    </div>
  );
}

function SummaryLine({ label, value, valueClass, strong }: { label: string; value: string; valueClass?: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={cn(strong && "font-black")}>{label}</span>
      <span className={cn(strong ? "text-xl font-black" : "font-bold", valueClass)}>{value}</span>
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
