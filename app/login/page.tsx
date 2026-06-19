"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  Check,
  CircleDollarSign,
  Eye,
  Headphones,
  Home,
  Lock,
  LogIn,
  Mail,
  Moon,
  Package,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Início", icon: Home, href: "/" },
  { label: "Recursos", icon: Package, href: "/#recursos" },
  { label: "Planos", icon: CircleDollarSign, href: "/#planos" },
  { label: "Depoimentos", icon: Star, href: "/#depoimentos" },
  { label: "Sobre", icon: ShieldCheck, href: "/#sobre" },
  { label: "Contato", icon: Phone, href: "/#contato" },
  { label: "Suporte", icon: Headphones, href: "/#contato" },
];

const features = [
  { title: "Agendamentos online", text: "Mais praticidade para você e seus clientes", icon: CalendarDays, href: "/agendamentos" },
  { title: "Gestão de clientes", text: "Histórico completo e fidelização", icon: UsersRound, href: "/clientes" },
  { title: "Financeiro completo", text: "Controle de receitas, despesas e muito mais", icon: CircleDollarSign, href: "/financeiro" },
  { title: "Relatórios inteligentes", text: "Dados para decisões melhores", icon: BarChart3, href: "/relatorios" },
];

export default function LoginPage() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [remember, setRemember] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  async function handleLogin() {
    setError("");

    if (!emailOrPhone.trim() || !password) {
      setError("Informe seu e-mail e senha para entrar.");
      return;
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrPhone, password }),
    });

    if (response.ok) {
      router.push("/dashboard");
      return;
    }

    const data = await response.json().catch(() => null);
    setError(data?.message || "E-mail ou senha inválidos. Use o usuário cadastrado no fluxo de cadastro.");
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink dark:bg-background dark:text-foreground">
      <section className="grid min-h-screen xl:grid-cols-[258px_minmax(520px,1fr)_minmax(520px,0.95fr)]">
        <aside className="hidden flex-col bg-[#071018] px-5 py-9 text-white xl:flex">
          <Link href="/" className="flex justify-center" aria-label="Ir para a página inicial">
            <Image
              src="/barberpro-logo-login.png"
              alt="BarberPro"
              width={158}
              height={126}
              priority
              className="h-[126px] w-[158px] object-contain"
            />
          </Link>

          <nav className="mt-16 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-[58px] w-full items-center gap-4 rounded-lg px-5 text-left text-lg font-semibold text-slate-200 transition-colors hover:bg-white/10",
                  item.href === "/" && "bg-white/10 text-white",
                )}
              >
                <item.icon className={cn("h-6 w-6", item.href === "/" && "text-barber-gold")} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/15 px-4 pt-9">
            <Link href="/#contato" className="flex items-center gap-3">
              <Headphones className="h-7 w-7 text-white" />
              <p className="text-base font-bold">Precisa de ajuda?</p>
            </Link>
            <p className="mt-5 text-sm text-slate-300">Fale com nosso suporte</p>
            <Link href="/#contato" className="mt-4 flex items-center gap-2 text-base font-bold text-barber-gold">
              <Phone className="h-5 w-5" /> (11) 99999-9999
            </Link>
          </div>
        </aside>

        <section className="relative min-h-[680px] overflow-hidden bg-barber-navy text-white">
          <Image src="/barberpro-hero.png" alt="Barbearia BarberPro" fill priority className="object-cover" sizes="45vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071018] via-[#071018]/92 to-[#071018]/55" />
          <div className="relative z-10 flex min-h-full flex-col justify-center px-8 py-14 md:px-16">
            <div className="max-w-[620px]">
              <h1 className="text-5xl font-black leading-[1.12] md:text-6xl">
                Bem-vindo ao Barber<span className="text-barber-gold">Pro</span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-9 text-slate-100">
                O sistema completo para gestão da sua barbearia. Mais agendamentos, organização e lucros para o seu negócio.
              </p>

              <div className="mt-12 divide-y divide-white/15">
                {features.map((feature) => (
                  <Link key={feature.title} href={feature.href} className="flex gap-6 py-5 transition-colors hover:text-barber-gold">
                    <feature.icon className="h-11 w-11 shrink-0 text-barber-gold" />
                    <div>
                      <p className="text-lg font-bold">{feature.title}</p>
                      <p className="mt-2 text-base text-slate-200">{feature.text}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <Card className="mt-14 max-w-[485px] border-white/10 bg-[#0F172A]/80 text-white shadow-2xl backdrop-blur">
                <CardContent className="grid grid-cols-[150px_1fr] items-center gap-4 p-6">
                  <div className="flex">
                    {["AC", "CM", "BA"].map((initials) => (
                      <Avatar key={initials} className="-mr-3 h-12 w-12 border-2 border-[#0F172A]">
                        <AvatarFallback className="bg-white text-barber-navy">{initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-barber-gold">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-5 w-5 fill-current" />
                      ))}
                      <span className="ml-2 text-lg font-bold text-white">4,9/5</span>
                    </div>
                    <p className="mt-2 text-base leading-6 text-slate-200">Mais de 2.500 barbearias confiam no BarberPro</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen flex-col bg-[#F8FAFC] px-6 py-9 dark:bg-background md:px-12">
          <header className="flex items-center justify-end gap-12">
            <div className="flex items-center gap-3 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
              <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-white text-barber-gold shadow-sm dark:bg-card">
                <Sun className="h-5 w-5" />
              </div>
              <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
              <Moon className="mr-3 h-5 w-5 text-barber-gold" />
            </div>
            <p className="hidden text-lg font-semibold md:block">Ainda não tem conta?</p>
            <Button asChild variant="outline" className="h-14 rounded-lg border-barber-gold px-8 text-base text-barber-gold hover:bg-barber-gold/10">
              <Link href="/cadastro-barbearia">Criar conta</Link>
            </Button>
          </header>

          <div className="flex flex-1 items-center justify-center py-10">
            <Card className="w-full max-w-[800px] rounded-xl border-slate-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.14)] dark:border-slate-800 dark:bg-card">
              <CardContent className="p-8 md:p-14">
                <h2 className="text-4xl font-black">Entrar na sua conta</h2>
                <p className="mt-5 text-xl text-slate-500 dark:text-slate-300">Acesse sua conta para continuar</p>

                <div className="mt-12 space-y-7">
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-base font-bold">
                      E-mail ou telefone
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500" />
                      <Input
                        id="email"
                        value={emailOrPhone}
                        onChange={(event) => setEmailOrPhone(event.target.value)}
                        className="h-[74px] rounded-lg pl-16 text-lg"
                        placeholder="exemplo@email.com ou (11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="password" className="text-base font-bold">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") handleLogin();
                        }}
                        className="h-[74px] rounded-lg pl-16 pr-16 text-lg"
                        placeholder="Digite sua senha"
                      />
                      <button className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500" aria-label="Mostrar senha">
                        <Eye className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {error && <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">{error}</div>}

                  <div className="flex items-center justify-between gap-4">
                    <button type="button" className="flex items-center gap-3 text-base font-semibold" onClick={() => setRemember((value) => !value)}>
                      <span className={cn("flex h-7 w-7 items-center justify-center rounded", remember ? "bg-barber-gold text-white" : "border bg-white")}>
                        {remember && <Check className="h-5 w-5" />}
                      </span>
                      Lembrar de mim
                    </button>
                    <Link href="/recuperar-senha" className="text-base font-semibold text-barber-gold">
                      Esqueci minha senha
                    </Link>
                  </div>

                  <Button type="button" onClick={handleLogin} className="h-[74px] w-full rounded-lg text-xl">
                    <LogIn className="mr-3 h-6 w-6" /> Entrar
                  </Button>

                  <div className="flex items-center gap-6 text-base text-slate-500">
                    <div className="h-px flex-1 bg-slate-200" />
                    ou continue com
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Button type="button" onClick={handleLogin} variant="outline" className="h-[74px] rounded-lg bg-white text-lg dark:bg-card">
                      <span className="mr-4 text-2xl font-black text-barber-gold">G</span> Google
                    </Button>
                    <Button type="button" onClick={handleLogin} variant="outline" className="h-[74px] rounded-lg bg-white text-lg dark:bg-card">
                      <span className="mr-4 text-2xl font-black">A</span> Apple
                    </Button>
                  </div>

                  <p className="flex items-center justify-center gap-3 text-center text-base text-slate-500 dark:text-slate-300">
                    <Lock className="h-5 w-5" /> Seus dados estão protegidos com segurança de nível bancário.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <footer className="grid gap-4 text-center text-base text-slate-500 md:grid-cols-3">
            <span className="hidden xl:block" />
            <span>© 2026 BarberPro. Todos os direitos reservados.</span>
            <span className="flex justify-center gap-5 md:justify-end">
              <Link href="/#contato">Termos de Uso</Link>
              <span>•</span>
              <Link href="/#contato">Política de Privacidade</Link>
            </span>
          </footer>

          <Button asChild className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl" size="icon" aria-label="Chat">
            <Link href="/#contato">
              <Headphones className="h-7 w-7" />
            </Link>
          </Button>
        </section>
      </section>
    </main>
  );
}
