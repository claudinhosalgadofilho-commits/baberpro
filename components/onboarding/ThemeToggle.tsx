"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
      <div className="flex h-9 w-12 items-center justify-center rounded-md bg-white text-barber-gold shadow-sm dark:bg-card">
        <Sun className="h-4 w-4" />
      </div>
      <Switch checked={isDark} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} aria-label="Alternar tema" />
      <Moon className="mr-2 h-4 w-4 text-barber-gold" />
    </div>
  );
}
