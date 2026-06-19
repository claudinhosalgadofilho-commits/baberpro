import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Package,
  Scissors,
  Settings,
  UsersRound,
  WalletCards,
} from "lucide-react";

export const appModules = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Agendamentos", href: "/agendamentos", icon: CalendarDays },
  { label: "Clientes", href: "/clientes", icon: UsersRound },
  { label: "Financeiro", href: "/financeiro", icon: WalletCards },
  { label: "Equipe", href: "/equipe", icon: Scissors },
  { label: "Estoque", href: "/estoque", icon: Package },
  { label: "Relatórios", href: "/relatorios", icon: CircleDollarSign },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];
