"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Moon,
  Play,
  Smartphone,
  Star,
  Sun,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const navItems = [
  { label: "Recursos", href: "#recursos" },
  { label: "Planos", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const heroFeatures = [
  { label: "Agendamentos\nOnline", icon: CalendarDays },
  { label: "Gestão de\nClientes", icon: UsersRound },
  { label: "Financeiro\nCompleto", icon: CircleDollarSign },
  { label: "Relatórios\nInteligentes", icon: BarChart3 },
];

const benefits = [
  { title: "Economize tempo", text: "Automatize tarefas e foque no que realmente importa: seus clientes.", icon: Clock3 },
  { title: "Aumente seus lucros", text: "Tenha controle total do seu negócio e tome melhores decisões.", icon: TrendingUp },
  { title: "Clientes satisfeitos", text: "Ofereça um atendimento profissional e uma experiência incrível.", icon: UsersRound },
  { title: "Acesse de qualquer lugar", text: "Sistema 100% online, seguro e disponível em todos os dispositivos.", icon: Smartphone },
];

const brands = ["Barbearia Clássica", "The Gentlemen", "Barba & Estilo", "Blackout", "VIP Barbers", "Old School"];

export default function LandingPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="min-h-screen bg-white text-barber-ink dark:bg-background dark:text-foreground">
      <section className="mx-auto min-h-screen max-w-[1920px] overflow-hidden rounded-none border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-background md:rounded-2xl">
        <header className="flex h-[138px] items-center justify-between border-b border-white/10 bg-[#070C13] px-8 text-white md:px-16 lg:px-20">
          <Link href="/" aria-label="Ir para a página inicial">
            <Image src="/barberpro-logo-landing.png" alt="BarberPro" width={265} height={65} priority className="h-[65px] w-[265px] object-contain" />
          </Link>

          <nav className="hidden items-center gap-12 text-base font-semibold lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-barber-gold">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 md:flex">
              <Sun className="h-5 w-5 text-barber-gold" />
              <Switch checked={dark} onCheckedChange={setDark} aria-label="Alternar tema" />
              <Moon className="h-5 w-5 text-white" />
            </div>
            <Button asChild variant="ghost" className="hidden text-white hover:bg-white/10 md:inline-flex">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild className="h-14 rounded-lg px-8 text-base shadow-lg shadow-barber-gold/20">
              <Link href="/cadastro-barbearia">Começar grátis</Link>
            </Button>
          </div>
        </header>

        <section id="recursos" className="grid bg-[#071018] text-white lg:grid-cols-[1.08fr_1fr]">
          <div className="flex min-h-[790px] flex-col justify-center px-8 py-16 md:px-16 lg:px-20">
            <div className="mb-8 flex w-fit items-center gap-2 rounded-full border border-barber-gold/60 bg-barber-gold/10 px-5 py-3 text-sm font-bold text-barber-gold">
              <Star className="h-5 w-5" /> O sistema n° 1 para barbearias
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] md:text-7xl">
              Gestão completa para <span className="text-barber-gold">barbearias</span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-200 md:text-2xl">
              Agendamentos online, gestão de clientes, financeiro, comissões e muito mais. Tudo em um só lugar.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {heroFeatures.map((feature) => (
                <Link key={feature.label} href="/dashboard" className="flex items-center gap-4 rounded-lg transition-colors hover:text-barber-gold">
                  <feature.icon className="h-10 w-10 shrink-0 text-barber-gold" />
                  <span className="whitespace-pre-line text-base font-semibold leading-5">{feature.label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-5 sm:flex-row">
              <Button asChild className="h-16 rounded-lg px-10 text-lg">
                <Link href="/cadastro-barbearia">
                  <CalendarDays className="mr-3 h-6 w-6" /> Começar agora grátis
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 rounded-lg border-white/30 bg-white/5 px-10 text-lg text-white hover:bg-white/10">
                <Link href="/dashboard">
                  <Play className="mr-3 h-6 w-6 fill-white" /> Ver demonstração
                </Link>
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap gap-5 text-base text-slate-200">
              {["Teste grátis por 7 dias", "Sem cartão de crédito", "Cancelamento fácil"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px] lg:min-h-[790px]">
            <Image src="/barberpro-hero.png" alt="Barbearia BarberPro" fill priority className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/30 to-transparent" />
            <div className="absolute bottom-9 right-8 max-w-[250px] rounded-lg border border-white/10 bg-[#0F172A]/95 p-7 shadow-2xl">
              <TrendingUp className="mb-5 h-9 w-9 text-barber-gold" />
              <p className="text-xl font-bold leading-8">
                Transforme sua barbearia em um negócio <span className="text-barber-gold">de sucesso.</span>
              </p>
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-white px-6 py-6 dark:bg-card md:px-16">
          <div className="grid rounded-lg border border-slate-100 bg-white px-8 py-7 shadow-premium dark:border-slate-800 dark:bg-card md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-6 border-slate-200 py-3 xl:border-r xl:px-8 xl:last:border-r-0">
                <benefit.icon className="h-16 w-16 shrink-0 text-barber-gold" />
                <div>
                  <h3 className="text-lg font-black">{benefit.title}</h3>
                  <p className="mt-2 max-w-xs text-base leading-7 text-slate-700 dark:text-slate-300">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer id="depoimentos" className="bg-[#F8FAFC] px-6 pb-10 pt-4 text-center dark:bg-background md:px-16">
          <p id="planos" className="text-lg text-slate-600 dark:text-slate-300">
            Mais de <span className="font-bold text-barber-gold">2.500</span> barbearias já usam e recomendam
          </p>
          <div className="mt-7 grid gap-6 text-2xl font-black uppercase tracking-wide text-slate-400 md:grid-cols-3 xl:grid-cols-6">
            {brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
          <div id="contato" className="mt-8 text-sm text-slate-500">
            Contato: (69) 99942-4835 • suporte@barberpro.local
          </div>
        </footer>
      </section>
    </main>
  );
}
