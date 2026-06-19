"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Headphones,
  Home,
  Info,
  LockKeyhole,
  Mail,
  MessageCircle,
  Moon,
  Phone,
  Send,
  ShieldCheck,
  Star,
  Sun,
  Timer,
  Crown,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Início", icon: Home, href: "/" },
  { label: "Recursos", icon: Star, href: "/#recursos" },
  { label: "Planos", icon: Crown, href: "/#planos" },
  { label: "Depoimentos", icon: MessageCircle, href: "/#depoimentos" },
  { label: "Sobre", icon: Info, href: "/#sobre" },
  { label: "Contato", icon: Phone, href: "/#contato" },
  { label: "Suporte", icon: Headphones, href: "/#contato" },
];

const recoveryBenefits = [
  { title: "Seguro", text: "Seus dados estão protegidos", icon: LockKeyhole },
  { title: "Rápido", text: "Você recebe o link em poucos minutos", icon: Mail },
  { title: "Confiável", text: "Ambiente 100% seguro", icon: ShieldCheck },
];

export default function RecuperarSenhaPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

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
                key={item.href + item.label}
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
              <Headphones className="h-7 w-7 text-barber-gold" />
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#071018] via-[#071018]/88 to-[#071018]/45" />
          <div className="relative z-10 flex min-h-full flex-col justify-center px-8 py-14 md:px-16">
            <div className="max-w-[600px]">
              <h1 className="text-5xl font-black leading-[1.12] md:text-6xl">
                Esqueceu sua <span className="text-barber-gold">senha?</span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-9 text-slate-100">
                Sem problemas! Informe seu e-mail ou telefone cadastrado que enviaremos um link para você redefinir sua senha.
              </p>

              <div className="mt-10 divide-y divide-white/15">
                {recoveryBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-5 py-5">
                    <benefit.icon className="h-10 w-10 shrink-0 text-barber-gold" />
                    <div>
                      <p className="text-lg font-bold">{benefit.title}</p>
                      <p className="mt-2 text-base text-slate-200">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
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
            <p className="hidden text-lg font-semibold md:block">Lembrou sua senha?</p>
            <Button asChild variant="outline" className="h-14 rounded-lg border-barber-gold px-8 text-base text-barber-gold hover:bg-barber-gold/10">
              <Link href="/login">Voltar para login</Link>
            </Button>
          </header>

          <div className="flex flex-1 items-center justify-center py-10">
            <Card className="w-full max-w-[760px] rounded-xl border-slate-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.14)] dark:border-slate-800 dark:bg-card">
              <CardContent className="p-8 text-center md:p-14">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-barber-gold/10 text-barber-gold">
                  <LockKeyhole className="h-14 w-14" />
                </div>
                <h2 className="mt-8 text-4xl font-black">Recuperar senha</h2>
                <p className="mx-auto mt-5 max-w-lg text-xl leading-8 text-slate-500 dark:text-slate-300">
                  Informe seu e-mail ou telefone para receber o link de redefinição de senha.
                </p>

                <div className="mt-12 space-y-7 text-left">
                  <div className="space-y-3">
                    <label htmlFor="recovery-email" className="text-base font-bold">
                      E-mail ou telefone
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-500" />
                      <Input id="recovery-email" className="h-[74px] rounded-lg pl-16 text-lg" placeholder="exemplo@email.com ou (11) 99999-9999" />
                    </div>
                  </div>

                  <Button asChild className="h-[64px] w-full rounded-lg text-lg">
                    <Link href="/login">
                      <Send className="mr-3 h-5 w-5" /> Enviar link de redefinição
                    </Link>
                  </Button>

                  <div className="flex items-center gap-6 text-center text-base text-slate-500">
                    <div className="h-px flex-1 bg-slate-200" />
                    ou
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <Button asChild variant="outline" className="h-[64px] w-full rounded-lg bg-white text-lg dark:bg-card">
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-3 h-6 w-6 text-emerald-500" /> Receber via WhatsApp
                    </a>
                  </Button>

                  <div className="flex gap-4 rounded-lg border border-barber-gold/25 bg-barber-gold/5 p-5 text-left">
                    <Info className="mt-1 h-6 w-6 shrink-0 text-barber-gold" />
                    <div>
                      <p className="font-bold">Não recebeu o e-mail?</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Verifique sua caixa de spam ou lixo eletrônico.</p>
                    </div>
                  </div>
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
