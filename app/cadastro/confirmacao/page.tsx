"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Box,
  Briefcase,
  CalendarCheck,
  Check,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { BottomProgress } from "@/components/onboarding/BottomProgress";
import { FormCard } from "@/components/onboarding/FormCard";
import { OnboardingSidebar } from "@/components/onboarding/OnboardingSidebar";
import { SecureBadge } from "@/components/onboarding/SecureBadge";
import { ThemeToggle } from "@/components/onboarding/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  clearOnboardingState,
  getFirstPendingOnboardingRoute,
  getOnboardingSnapshot,
  type OnboardingSnapshot,
} from "@/store/onboarding-store";

type InitialSettings = {
  fantasyName?: string;
  segment?: string;
  foundationYear?: string;
  description?: string;
};

type AccountData = {
  adminName?: string;
  email?: string;
  role?: string;
  password?: string;
  passwordConfigured?: boolean;
};

const REGISTERED_USER_KEY = "barberpro:registered-user";

export default function CadastroConfirmacaoPage() {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);
  const [settings, setSettings] = useState<InitialSettings | null>(null);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [snapshot, setSnapshot] = useState<OnboardingSnapshot | null>(null);
  const [finishError, setFinishError] = useState("");

  useEffect(() => {
    const snapshot = getOnboardingSnapshot();
    const pendingRoute = getFirstPendingOnboardingRoute(snapshot);

    if (pendingRoute) {
      router.replace(pendingRoute);
      return;
    }

    setSettings((snapshot.settings || {}) as InitialSettings);
    setAccount((snapshot.account || {}) as AccountData);
    setSnapshot(snapshot);
  }, [router]);

  const barberShop = useMemo(
    () => ({
      fantasyName: settings?.fantasyName || "Barbearia Estilo",
      segment: settings?.segment || "Barbearia",
      foundationYear: settings?.foundationYear || "2020",
      description: settings?.description || "Barbearia tradicional com foco em qualidade, atendimento e estilo.",
    }),
    [settings],
  );

  async function finishOnboarding() {
    setIsFinishing(true);
    setFinishError("");
    const registeredRaw = window.localStorage.getItem(REGISTERED_USER_KEY);
    const registered = registeredRaw ? (JSON.parse(registeredRaw) as { password?: string }) : {};
    const snapshotAccount = (snapshot?.account || {}) as AccountData;
    const password = snapshotAccount.password || registered.password;

    if (!password) {
      setFinishError("Senha da conta nao encontrada. Volte para a etapa Sua Conta, informe a senha novamente e continue.");
      setIsFinishing(false);
      return;
    }

    const payload = snapshot
      ? {
          ...snapshot,
          account: {
            ...snapshot.account,
            password,
          },
        }
      : null;

    const response = await fetch("/api/onboarding/finish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setFinishError(data?.message || "Nao foi possivel finalizar o cadastro. Confira os dados e tente novamente.");
      setIsFinishing(false);
      return;
    }

    clearOnboardingState();
    window.localStorage.removeItem(REGISTERED_USER_KEY);
    router.push("/dashboard");
  }

  if (!settings) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] text-barber-ink">
        <p className="text-lg font-bold">Carregando confirmação...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <div className="flex min-h-screen">
        <OnboardingSidebar currentStep={4} />

        <section className="min-w-0 flex-1 px-5 py-7 md:px-10 xl:px-12">
          <header className="flex items-center justify-between gap-4">
            <Button asChild variant="ghost" className="h-11 px-0 text-base font-bold text-barber-gold hover:bg-transparent hover:text-[#bd8f13]">
              <Link href="/cadastro/configuracoes-iniciais">
                <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
              </Link>
            </Button>

            <Link href="/" className="xl:hidden" aria-label="Ir para a página inicial">
              <Image src="/barberpro-logo-login.png" alt="BarberPro" width={112} height={88} className="h-[74px] w-[96px] object-contain" />
            </Link>

            <div className="flex items-center gap-5">
              <ThemeToggle />
              <SecureBadge />
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[1540px] flex-col py-8 md:py-10">
            <div className="mx-auto max-w-[980px] text-center">
              <h1 className="text-4xl font-black leading-tight tracking-normal md:text-5xl">
                Tudo pronto! Sua barbearia foi criada <span className="text-barber-gold">com sucesso</span> 🎉
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-500 dark:text-slate-300">
                Sua barbearia e sua conta de acesso foram configuradas com sucesso. Confira os detalhes abaixo e comece a usar o BarberPro.
              </p>
            </div>

            <div className="mt-10 grid gap-5 xl:grid-cols-[0.76fr_1.24fr]">
              <SuccessCard />
              <SummaryCard barberShop={barberShop} />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[0.76fr_1.24fr]">
              <SecurityCard />
              <AccessCard account={account} />
            </div>

            <Card className="mt-6 rounded-lg border-blue-100 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.07)] dark:bg-card">
              <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_1fr_0.95fr] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-blue-900 dark:text-blue-200">Seus dados estão protegidos!</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Utilizamos criptografia de ponta a ponta para garantir a segurança das informações da sua barbearia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-slate-200 lg:border-l lg:pl-8">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    <LockKeyhole className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-black">SSL Seguro</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Seus dados estão 100% protegidos com criptografia avançada.</p>
                  </div>
                </div>

                <div>
                  <p className="text-lg font-black text-blue-900 dark:text-blue-200">Pronto para começar?</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Acesse o painel e explore todas as funcionalidades do BarberPro.</p>
                  {finishError && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{finishError}</p>}
                  <Button onClick={finishOnboarding} disabled={isFinishing} className="mt-5 h-14 w-full rounded-lg text-base">
                    {isFinishing ? "Finalizando..." : "Ir para o painel"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <BottomProgress currentStep={4} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SuccessCard() {
  const nextSteps = [
    { title: "Finalize seu primeiro agendamento", text: "Cadastre seus serviços e profissionais para começar.", icon: CalendarCheck },
    { title: "Convide sua equipe", text: "Adicione sua equipe e defina as permissões de acesso.", icon: UsersRound },
    { title: "Ative o controle de estoque", text: "Cadastre seus produtos e comece a controlar seu estoque.", icon: Box },
    { title: "Acompanhe seus resultados", text: "Use os relatórios para acompanhar o crescimento do seu negócio.", icon: BarChart3 },
  ];

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.07)] dark:bg-card">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="h-12 w-12" />
          </div>
          <h2 className="mt-7 text-2xl font-black text-emerald-700">Cadastro realizado com sucesso!</h2>
          <p className="mt-4 max-w-[420px] text-base leading-7 text-slate-600 dark:text-slate-300">
            Você já pode acessar o sistema e começar a gerenciar sua barbearia com mais eficiência.
          </p>
        </div>

        <div className="my-7 h-px bg-slate-200" />
        <p className="font-bold">Próximos passos:</p>
        <div className="mt-5 space-y-5">
          {nextSteps.map((step) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-black">{step.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryCard({
  barberShop,
}: {
  barberShop: {
    fantasyName: string;
    segment: string;
    foundationYear: string;
    description: string;
  };
}) {
  return (
    <FormCard title="Resumo da sua barbearia" description="" icon={Store} iconClass="bg-barber-gold/10 text-barber-gold">
      <div className="-mt-2 flex justify-end">
        <Button asChild variant="outline" className="h-11 rounded-lg bg-white dark:bg-background">
          <Link href="/cadastro/configuracoes-iniciais">Editar informações</Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-[190px_1fr] md:items-center">
        <div className="flex h-[184px] w-[184px] items-center justify-center rounded-lg bg-black text-center text-barber-gold shadow-lg">
          <div>
            <p className="text-xs tracking-[0.25em]">BARBEARIA</p>
            <p className="mt-4 text-4xl font-black tracking-wide">ESTILO</p>
          </div>
        </div>
        <div className="space-y-5">
          <InfoLine icon={Store} label="Nome fantasia:" value={barberShop.fantasyName} />
          <InfoLine icon={UsersRound} label="Segmento:" value={barberShop.segment} />
          <InfoLine icon={CalendarCheck} label="Ano de fundação:" value={barberShop.foundationYear} />
          <InfoLine icon={Briefcase} label="Descrição:" value={barberShop.description} />
        </div>
      </div>
    </FormCard>
  );
}

function AccessCard({ account }: { account: AccountData | null }) {
  return (
    <FormCard title="Informações de acesso" description="" icon={UserRound} iconClass="bg-violet-100 text-violet-700">
      <div className="-mt-2 flex justify-end">
        <Button asChild variant="outline" className="h-11 rounded-lg bg-white dark:bg-background">
          <Link href="/cadastro/conta">Editar acesso</Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-[170px_1fr]">
        <AccessLine icon={UserRound} label="Administrador:" value={account?.adminName || "Administrador"} />
        <AccessLine icon={Mail} label="E-mail:" value={account?.email || "email não informado"} />
        <AccessLine icon={Briefcase} label="Cargo:" value={account?.role || "Administrador"} />
        <AccessLine icon={ShieldCheck} label="Método de acesso:" value="E-mail e senha" />
      </div>
    </FormCard>
  );
}

function SecurityCard() {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.07)] dark:bg-card xl:hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          <div>
            <p className="font-black">Criptografia de ponta a ponta</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Todas as informações sensíveis são protegidas no acesso ao sistema.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoLine({ icon: Icon, label, value }: { icon: typeof Store; label: string; value: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-[180px_1fr]">
      <div className="flex items-center gap-3 font-semibold">
        <Icon className="h-5 w-5 text-slate-500" />
        {label}
      </div>
      <p className="font-bold leading-7">{value}</p>
    </div>
  );
}

function AccessLine({ icon: Icon, label, value }: { icon: typeof Store; label: string; value: string }) {
  return (
    <>
      <div className="flex items-center gap-3 font-semibold">
        <Icon className="h-5 w-5 text-violet-700" />
        {label}
      </div>
      <p className="font-bold">{value}</p>
    </>
  );
}
