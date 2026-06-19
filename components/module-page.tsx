import Link from "next/link";
import { BarChart3, Plus, Search } from "lucide-react";

import { appModules } from "@/lib/config/modules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ModulePageProps = {
  title: string;
  description: string;
};

export function ModulePage({ title, description }: ModulePageProps) {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-barber-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-72 bg-barber-navy px-5 py-6 text-white lg:block">
        <Link href="/" className="mb-8 block text-2xl font-black uppercase">
          Barber<span className="text-barber-gold">Pro</span>
        </Link>
        <nav className="space-y-1">
          {appModules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <module.icon className="h-5 w-5" />
              {module.label}
            </Link>
          ))}
        </nav>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b bg-white/90 px-4 py-4 backdrop-blur md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex gap-3">
              <div className="relative min-w-0 flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-10" placeholder="Buscar" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo
              </Button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 p-4 md:grid-cols-3 md:p-6">
          {["Hoje", "Semana", "Mês"].map((label, index) => (
            <Card key={label}>
              <CardHeader>
                <CardDescription>{label}</CardDescription>
                <CardTitle className="text-3xl">{[38, 142, 628][index]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BarChart3 className="h-4 w-4 text-barber-gold" />
                  Indicador pronto para conectar ao banco
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
