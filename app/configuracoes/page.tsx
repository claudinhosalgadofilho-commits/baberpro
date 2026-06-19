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
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Moon,
  Package,
  Phone,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  Trash2,
  Upload,
  UserCog,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "barberpro-settings";

type DayConfig = {
  id: string;
  day: string;
  active: boolean;
  open: string;
  close: string;
  intervals: string[];
};

type TeamUser = {
  id: string;
  name: string;
  role: string;
  access: string;
  initials: string;
};

type SettingsState = {
  business: {
    tradeName: string;
    document: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    logoName: string;
  };
  schedule: DayConfig[];
  appointments: {
    interval: string;
    minAdvance: string;
    maxAdvance: string;
    cancelLimit: string;
    whatsappConfirmation: boolean;
    blockBusyTimes: boolean;
  };
  preferences: {
    currency: string;
    timezone: string;
    language: string;
    weekStart: string;
    stockEnabled: boolean;
    financialEnabled: boolean;
  };
  integrations: Record<string, boolean>;
  security: {
    strongPassword: boolean;
    auditLogs: boolean;
    twoFactor: boolean;
  };
  users: TeamUser[];
};

const defaultSettings: SettingsState = {
  business: {
    tradeName: "Barbearia Estilo",
    document: "00.000.000/0000-00",
    phone: "(11) 99999-9999",
    email: "contato@barbearia.com.br",
    address: "Rua das Navalhas, 248 - Centro",
    city: "São Paulo",
    state: "SP",
    logoName: "barbearia-estilo.png",
  },
  schedule: [
    { id: "mon", day: "Segunda-feira", active: true, open: "08:00", close: "20:00", intervals: [] },
    { id: "tue", day: "Terça-feira", active: true, open: "08:00", close: "20:00", intervals: [] },
    { id: "wed", day: "Quarta-feira", active: true, open: "08:00", close: "20:00", intervals: [] },
    { id: "thu", day: "Quinta-feira", active: true, open: "08:00", close: "20:00", intervals: [] },
    { id: "fri", day: "Sexta-feira", active: true, open: "08:00", close: "21:00", intervals: [] },
    { id: "sat", day: "Sábado", active: true, open: "08:00", close: "18:00", intervals: [] },
    { id: "sun", day: "Domingo", active: false, open: "08:00", close: "18:00", intervals: [] },
  ],
  appointments: {
    interval: "30 minutos",
    minAdvance: "1 hora",
    maxAdvance: "30 dias",
    cancelLimit: "2 horas de antecedência",
    whatsappConfirmation: true,
    blockBusyTimes: true,
  },
  preferences: {
    currency: "Real (R$)",
    timezone: "(GMT-03:00) Brasília",
    language: "Português (Brasil)",
    weekStart: "Segunda-feira",
    stockEnabled: true,
    financialEnabled: true,
  },
  integrations: {
    whatsapp: true,
    email: true,
    sms: false,
    pix: false,
  },
  security: {
    strongPassword: true,
    auditLogs: true,
    twoFactor: false,
  },
  users: [
    { id: "1", name: "João Santos", role: "Administrador", access: "Acesso total", initials: "JS" },
    { id: "2", name: "Carlos Eduardo", role: "Barbeiro", access: "Agenda e clientes", initials: "CE" },
    { id: "3", name: "Bruno Costa", role: "Barbeiro", access: "Agenda e serviços", initials: "BC" },
  ],
};

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

export default function ConfiguracoesPage() {
  const [dark, setDark] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [savedSettings, setSavedSettings] = useState<SettingsState>(defaultSettings);
  const [status, setStatus] = useState("Pronto para editar");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return;
    }

    try {
      const parsed = normalizeSettings(JSON.parse(raw));
      setSettings(parsed);
      setSavedSettings(parsed);
      setStatus("Configurações carregadas");
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      setStatus("Não foi possível carregar configurações salvas");
    }
  }, []);

  const activeDays = useMemo(() => settings.schedule.filter((day) => day.active), [settings.schedule]);
  const operatingHours = activeDays.length ? `${activeDays[0].open} - ${activeDays[0].close}` : "Fechado";

  function updateBusiness(field: keyof SettingsState["business"], value: string) {
    setSettings((current) => ({
      ...current,
      business: { ...current.business, [field]: value },
    }));
    setStatus("Alterações pendentes");
  }

  function updateAppointments(field: keyof SettingsState["appointments"], value: string | boolean) {
    setSettings((current) => ({
      ...current,
      appointments: { ...current.appointments, [field]: value },
    }));
    setStatus("Alterações pendentes");
  }

  function updatePreferences(field: keyof SettingsState["preferences"], value: string | boolean) {
    setSettings((current) => ({
      ...current,
      preferences: { ...current.preferences, [field]: value },
    }));
    setStatus("Alterações pendentes");
  }

  function updateSecurity(field: keyof SettingsState["security"], value: boolean) {
    setSettings((current) => ({
      ...current,
      security: { ...current.security, [field]: value },
    }));
    setStatus("Alterações pendentes");
  }

  function updateIntegration(key: string, value: boolean) {
    setSettings((current) => ({
      ...current,
      integrations: { ...current.integrations, [key]: value },
    }));
    setStatus("Alterações pendentes");
  }

  function updateDay(dayId: string, changes: Partial<DayConfig>) {
    setSettings((current) => ({
      ...current,
      schedule: current.schedule.map((day) => (day.id === dayId ? { ...day, ...changes } : day)),
    }));
    setStatus("Alterações pendentes");
  }

  function addInterval(dayId: string) {
    setSettings((current) => ({
      ...current,
      schedule: current.schedule.map((day) =>
        day.id === dayId ? { ...day, intervals: [...day.intervals, "12:00 - 13:00"] } : day,
      ),
    }));
    setStatus("Intervalo adicionado");
  }

  function removeInterval(dayId: string, index: number) {
    setSettings((current) => ({
      ...current,
      schedule: current.schedule.map((day) =>
        day.id === dayId ? { ...day, intervals: day.intervals.filter((_, itemIndex) => itemIndex !== index) } : day,
      ),
    }));
    setStatus("Intervalo removido");
  }

  function updateUser(userId: string, changes: Partial<TeamUser>) {
    setSettings((current) => ({
      ...current,
      users: current.users.map((user) => (user.id === userId ? { ...user, ...changes } : user)),
    }));
    setStatus("Alterações pendentes");
  }

  function addUser() {
    setSettings((current) => ({
      ...current,
      users: [
        ...current.users,
        {
          id: String(Date.now()),
          name: "Novo usuário",
          role: "Recepcionista",
          access: "Agenda e clientes",
          initials: "NU",
        },
      ],
    }));
    setStatus("Usuário adicionado");
  }

  function removeUser(userId: string) {
    setSettings((current) => ({
      ...current,
      users: current.users.filter((user) => user.id !== userId),
    }));
    setStatus("Usuário removido");
  }

  function removeLogo() {
    updateBusiness("logoName", "");
    setStatus("Logo removida");
  }

  function validateSettings() {
    const nextErrors: string[] = [];

    if (!settings.business.tradeName.trim()) nextErrors.push("Informe o nome fantasia.");
    if (!settings.business.phone.trim()) nextErrors.push("Informe o telefone principal.");
    if (!settings.business.email.includes("@")) nextErrors.push("Informe um e-mail comercial válido.");
    if (!settings.schedule.some((day) => day.active)) nextErrors.push("Ative pelo menos um dia de funcionamento.");

    settings.schedule.forEach((day) => {
      if (day.active && day.open >= day.close) {
        nextErrors.push(`${day.day}: o horário de abertura deve ser menor que o fechamento.`);
      }
    });

    setErrors(nextErrors);
    return nextErrors.length === 0;
  }

  function saveSettings() {
    if (!validateSettings()) {
      setStatus("Corrija os campos destacados antes de salvar");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSavedSettings(settings);
    setStatus("Configurações salvas com sucesso");
  }

  function cancelChanges() {
    setSettings(savedSettings);
    setErrors([]);
    setStatus("Alterações canceladas");
  }

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
                Edite dados da barbearia, horários, regras de agendamento, integrações, equipe e segurança.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={cancelChanges} variant="outline" className="h-12 rounded-lg border-slate-200 bg-white px-6 text-base font-bold dark:bg-card">
                Cancelar
              </Button>
              <Button onClick={saveSettings} className="h-12 rounded-lg bg-barber-gold px-6 text-base font-bold text-white hover:bg-[#bd8f13]">
                <Save className="mr-2 h-5 w-5" />
                Salvar alterações
              </Button>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-barber-gold/25 bg-[#FFFBF3] px-5 py-4 text-sm font-semibold text-slate-700">
            {status}
          </div>

          {errors.length > 0 && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            <OverviewCard icon={Store} title="Unidade principal" value={settings.business.tradeName || "Sem nome"} description="Plano profissional ativo" tone="gold" />
            <OverviewCard icon={Clock3} title="Funcionamento" value={operatingHours} description={`${activeDays.length} dias ativos`} tone="green" />
            <OverviewCard icon={ShieldCheck} title="Segurança" value={settings.security.auditLogs ? "Ativa" : "Parcial"} description="Ambiente protegido" tone="blue" />
          </div>

          <div className="mt-6 grid gap-5 2xl:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5">
              <BusinessSettings settings={settings} updateBusiness={updateBusiness} removeLogo={removeLogo} />
              <ScheduleSettings schedule={settings.schedule} updateDay={updateDay} addInterval={addInterval} removeInterval={removeInterval} />
              <AppointmentSettings settings={settings} updateAppointments={updateAppointments} />
            </div>

            <div className="space-y-5">
              <SystemPreferences settings={settings} updatePreferences={updatePreferences} />
              <IntegrationsCard integrations={settings.integrations} updateIntegration={updateIntegration} />
              <UsersCard users={settings.users} updateUser={updateUser} addUser={addUser} removeUser={removeUser} />
              <SecurityCard security={settings.security} updateSecurity={updateSecurity} />
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

function BusinessSettings({
  settings,
  updateBusiness,
  removeLogo,
}: {
  settings: SettingsState;
  updateBusiness: (field: keyof SettingsState["business"], value: string) => void;
  removeLogo: () => void;
}) {
  return (
    <FormCard icon={Store} title="Dados da barbearia" description="Informações principais exibidas no sistema e nos comprovantes.">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome fantasia" value={settings.business.tradeName} onChange={(value) => updateBusiness("tradeName", value)} icon={Store} />
        <Field label="CNPJ" value={settings.business.document} onChange={(value) => updateBusiness("document", value)} icon={CreditCard} />
        <Field label="Telefone principal" value={settings.business.phone} onChange={(value) => updateBusiness("phone", value)} icon={Phone} />
        <Field label="E-mail comercial" value={settings.business.email} onChange={(value) => updateBusiness("email", value)} icon={Mail} type="email" />
        <Field label="Cidade" value={settings.business.city} onChange={(value) => updateBusiness("city", value)} icon={MapPin} />
        <Field label="Estado" value={settings.business.state} onChange={(value) => updateBusiness("state", value)} />
      </div>
      <Field className="mt-5" label="Endereço completo" value={settings.business.address} onChange={(value) => updateBusiness("address", value)} icon={MapPin} />

      <div className="mt-5 flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center">
        <Avatar className="h-20 w-20 rounded-lg">
          <AvatarFallback className="rounded-lg bg-black text-barber-gold">BE</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-black">Logo da barbearia</p>
          <p className="mt-1 text-sm text-slate-500">{settings.business.logoName || "Nenhuma logo cadastrada"}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="inline-flex h-10 cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold hover:bg-slate-50 dark:bg-background">
            <Upload className="mr-2 h-4 w-4" />
            Alterar
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) updateBusiness("logoName", file.name);
              }}
            />
          </label>
          <Button onClick={removeLogo} variant="outline" className="rounded-lg border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
            Remover
          </Button>
        </div>
      </div>
    </FormCard>
  );
}

function ScheduleSettings({
  schedule,
  updateDay,
  addInterval,
  removeInterval,
}: {
  schedule: DayConfig[];
  updateDay: (dayId: string, changes: Partial<DayConfig>) => void;
  addInterval: (dayId: string) => void;
  removeInterval: (dayId: string, index: number) => void;
}) {
  return (
    <FormCard icon={Clock3} title="Horário de funcionamento" description="Configure dias abertos, horários e intervalos da unidade.">
      <div className="space-y-3">
        {schedule.map((day) => (
          <div key={day.id} className="rounded-lg border border-slate-200 p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
              <div className="flex items-center justify-between gap-4">
                <p className="font-black">{day.day}</p>
                <Switch checked={day.active} onCheckedChange={(checked) => updateDay(day.id, { active: checked })} aria-label={`Ativar ${day.day}`} />
              </div>
              <Input
                type="time"
                value={day.open}
                disabled={!day.active}
                onChange={(event) => updateDay(day.id, { open: event.target.value })}
                className="h-11 rounded-lg bg-white md:w-32 dark:bg-background"
              />
              <Input
                type="time"
                value={day.close}
                disabled={!day.active}
                onChange={(event) => updateDay(day.id, { close: event.target.value })}
                className="h-11 rounded-lg bg-white md:w-32 dark:bg-background"
              />
              <Button
                type="button"
                onClick={() => addInterval(day.id)}
                disabled={!day.active}
                variant="outline"
                className="h-11 rounded-lg border-emerald-100 bg-emerald-50 text-emerald-700 disabled:bg-slate-50 disabled:text-slate-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                Intervalo
              </Button>
            </div>
            {day.intervals.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {day.intervals.map((interval, index) => (
                  <span key={`${day.id}-${interval}-${index}`} className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold">
                    {interval}
                    <button type="button" onClick={() => removeInterval(day.id, index)} className="text-red-600" aria-label="Remover intervalo">
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </FormCard>
  );
}

function AppointmentSettings({
  settings,
  updateAppointments,
}: {
  settings: SettingsState;
  updateAppointments: (field: keyof SettingsState["appointments"], value: string | boolean) => void;
}) {
  return (
    <FormCard icon={CalendarDays} title="Regras de agendamento" description="Defina limites, confirmações e comportamento da agenda.">
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField label="Intervalo padrão entre serviços" value={settings.appointments.interval} onChange={(value) => updateAppointments("interval", value)} options={["15 minutos", "30 minutos", "45 minutos", "60 minutos"]} />
        <SelectField label="Antecedência mínima para agendar" value={settings.appointments.minAdvance} onChange={(value) => updateAppointments("minAdvance", value)} options={["30 minutos", "1 hora", "2 horas", "1 dia"]} />
        <SelectField label="Antecedência máxima para agendar" value={settings.appointments.maxAdvance} onChange={(value) => updateAppointments("maxAdvance", value)} options={["7 dias", "15 dias", "30 dias", "60 dias"]} />
        <SelectField label="Cancelamento permitido com até" value={settings.appointments.cancelLimit} onChange={(value) => updateAppointments("cancelLimit", value)} options={["1 hora de antecedência", "2 horas de antecedência", "6 horas de antecedência", "1 dia de antecedência"]} />
      </div>
      <ToggleRow className="mt-5" title="Confirmação automática por WhatsApp" description="Enviar lembrete e confirmação sem ação manual." checked={settings.appointments.whatsappConfirmation} onChange={(checked) => updateAppointments("whatsappConfirmation", checked)} />
      <ToggleRow title="Bloquear horários ocupados" description="Evita conflitos de agenda entre profissionais e serviços." checked={settings.appointments.blockBusyTimes} onChange={(checked) => updateAppointments("blockBusyTimes", checked)} />
    </FormCard>
  );
}

function SystemPreferences({
  settings,
  updatePreferences,
}: {
  settings: SettingsState;
  updatePreferences: (field: keyof SettingsState["preferences"], value: string | boolean) => void;
}) {
  return (
    <FormCard icon={Settings} title="Preferências do sistema" description="Padrões usados em relatórios, telas e cadastros.">
      <div className="grid gap-4">
        <SelectField label="Moeda" value={settings.preferences.currency} onChange={(value) => updatePreferences("currency", value)} options={["Real (R$)", "Dólar (US$)", "Euro (€)"]} />
        <SelectField label="Fuso horário" value={settings.preferences.timezone} onChange={(value) => updatePreferences("timezone", value)} options={["(GMT-03:00) Brasília", "(GMT-04:00) Manaus", "(GMT-05:00) Acre"]} />
        <SelectField label="Idioma" value={settings.preferences.language} onChange={(value) => updatePreferences("language", value)} options={["Português (Brasil)", "English", "Español"]} />
        <SelectField label="Primeiro dia da semana" value={settings.preferences.weekStart} onChange={(value) => updatePreferences("weekStart", value)} options={["Segunda-feira", "Domingo"]} />
      </div>
      <ToggleRow className="mt-5" title="Controle de estoque" description="Produtos, alertas e baixa automática." checked={settings.preferences.stockEnabled} onChange={(checked) => updatePreferences("stockEnabled", checked)} />
      <ToggleRow title="Módulo financeiro" description="Receitas, despesas, caixa e relatórios." checked={settings.preferences.financialEnabled} onChange={(checked) => updatePreferences("financialEnabled", checked)} />
    </FormCard>
  );
}

function IntegrationsCard({
  integrations,
  updateIntegration,
}: {
  integrations: Record<string, boolean>;
  updateIntegration: (key: string, value: boolean) => void;
}) {
  return (
    <FormCard icon={Send} title="Integrações" description="Canais de confirmação e automações.">
      <IntegrationRow title="WhatsApp Business" status={integrations.whatsapp ? "Conectado" : "Desconectado"} checked={integrations.whatsapp} onChange={(checked) => updateIntegration("whatsapp", checked)} />
      <IntegrationRow title="E-mail transacional" status={integrations.email ? "Ativo" : "Inativo"} checked={integrations.email} onChange={(checked) => updateIntegration("email", checked)} />
      <IntegrationRow title="SMS" status={integrations.sms ? "Ativo" : "Pendente"} checked={integrations.sms} onChange={(checked) => updateIntegration("sms", checked)} />
      <IntegrationRow title="Pagamentos Pix" status={integrations.pix ? "Conectado" : "Configurar"} checked={integrations.pix} onChange={(checked) => updateIntegration("pix", checked)} />
    </FormCard>
  );
}

function UsersCard({
  users,
  updateUser,
  addUser,
  removeUser,
}: {
  users: TeamUser[];
  updateUser: (userId: string, changes: Partial<TeamUser>) => void;
  addUser: () => void;
  removeUser: (userId: string) => void;
}) {
  return (
    <FormCard icon={UserCog} title="Usuários e permissões" description="Equipe com acesso ao BarberPro.">
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="grid gap-3 rounded-lg border border-slate-200 p-4 md:grid-cols-[auto_1fr_auto] md:items-center">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-slate-200 text-slate-900">{user.initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-3 md:grid-cols-3">
              <Input value={user.name} onChange={(event) => updateUser(user.id, { name: event.target.value, initials: getInitials(event.target.value) })} className="h-11 rounded-lg" />
              <Input value={user.role} onChange={(event) => updateUser(user.id, { role: event.target.value })} className="h-11 rounded-lg" />
              <Input value={user.access} onChange={(event) => updateUser(user.id, { access: event.target.value })} className="h-11 rounded-lg" />
            </div>
            <Button type="button" onClick={() => removeUser(user.id)} variant="outline" size="icon" className="h-11 w-11 rounded-lg border-red-200 bg-red-50 text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={addUser} className="mt-5 h-11 w-full rounded-lg bg-barber-gold text-white hover:bg-[#bd8f13]">
        <UserPlus className="mr-2 h-5 w-5" />
        Convidar usuário
      </Button>
    </FormCard>
  );
}

function SecurityCard({
  security,
  updateSecurity,
}: {
  security: SettingsState["security"];
  updateSecurity: (field: keyof SettingsState["security"], value: boolean) => void;
}) {
  return (
    <FormCard icon={ShieldCheck} title="Segurança" description="Proteção de dados e sessão da barbearia.">
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-center gap-3">
          <LockKeyhole className="h-6 w-6 text-blue-700" />
          <p className="font-black text-blue-950">Ambiente 100% seguro</p>
        </div>
        <p className="mt-2 text-sm text-blue-900">Sessões protegidas, isolamento por tenant e dados preparados para PostgreSQL.</p>
      </div>
      <ToggleRow className="mt-5" title="Exigir senha forte" description="Aplicar regras mínimas para novos usuários." checked={security.strongPassword} onChange={(checked) => updateSecurity("strongPassword", checked)} />
      <ToggleRow title="Registrar logs de alterações" description="Auditoria de ações importantes no sistema." checked={security.auditLogs} onChange={(checked) => updateSecurity("auditLogs", checked)} />
      <ToggleRow title="Autenticação em duas etapas" description="Camada extra de segurança para administradores." checked={security.twoFactor} onChange={(checked) => updateSecurity("twoFactor", checked)} />
    </FormCard>
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
  onChange,
  icon: Icon,
  className,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
  type?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-sm font-black">{label}</span>
      <div className="relative mt-2">
        {Icon && <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />}
        <Input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn("h-12 rounded-lg border-slate-200 bg-white text-base dark:bg-background", Icon && "pl-12")}
        />
      </div>
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-black">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base outline-none focus:ring-2 focus:ring-barber-gold/30 dark:bg-background"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
  className,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-5 border-t border-slate-100 py-4", className)}>
      <div>
        <p className="font-black">{title}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
    </div>
  );
}

function IntegrationRow({
  title,
  status,
  checked,
  onChange,
}: {
  title: string;
  status: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-slate-100 py-4 first:border-t-0 first:pt-0">
      <div>
        <p className="font-black">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{status}</p>
      </div>
      <div className="flex items-center gap-3">
        {checked && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
      </div>
    </div>
  );
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "NU";
}

function normalizeSettings(value: unknown): SettingsState {
  if (!value || typeof value !== "object") {
    return defaultSettings;
  }

  const input = value as Partial<SettingsState>;
  const business = input.business ?? {};
  const appointments = input.appointments ?? {};
  const preferences = input.preferences ?? {};
  const security = input.security ?? {};
  const integrations = input.integrations ?? {};

  return {
    business: {
      ...defaultSettings.business,
      ...business,
    },
    schedule: normalizeSchedule(input.schedule),
    appointments: {
      ...defaultSettings.appointments,
      ...appointments,
    },
    preferences: {
      ...defaultSettings.preferences,
      ...preferences,
    },
    integrations: {
      ...defaultSettings.integrations,
      ...integrations,
    },
    security: {
      ...defaultSettings.security,
      ...security,
    },
    users: normalizeUsers(input.users),
  };
}

function normalizeSchedule(schedule: unknown): DayConfig[] {
  if (!Array.isArray(schedule)) {
    return defaultSettings.schedule;
  }

  return defaultSettings.schedule.map((defaultDay) => {
    const savedDay = schedule.find((day) => {
      return day && typeof day === "object" && "id" in day && (day as Partial<DayConfig>).id === defaultDay.id;
    }) as Partial<DayConfig> | undefined;

    return {
      ...defaultDay,
      ...savedDay,
      intervals: Array.isArray(savedDay?.intervals) ? savedDay.intervals.filter((item): item is string => typeof item === "string") : [],
    };
  });
}

function normalizeUsers(users: unknown): TeamUser[] {
  if (!Array.isArray(users) || users.length === 0) {
    return defaultSettings.users;
  }

  return users
    .filter((user): user is Partial<TeamUser> => Boolean(user && typeof user === "object"))
    .map((user, index) => {
      const name = typeof user.name === "string" && user.name.trim() ? user.name : `Usuário ${index + 1}`;

      return {
        id: typeof user.id === "string" ? user.id : String(index + 1),
        name,
        role: typeof user.role === "string" ? user.role : "Recepcionista",
        access: typeof user.access === "string" ? user.access : "Agenda e clientes",
        initials: typeof user.initials === "string" ? user.initials : getInitials(name),
      };
    });
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
