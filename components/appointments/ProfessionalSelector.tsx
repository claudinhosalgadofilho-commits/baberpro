"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { professionals } from "@/components/appointments/mock-data";

export function ProfessionalSelector({
  value,
  onChange,
  compact = false,
}: {
  value: string;
  onChange: (id: string) => void;
  compact?: boolean;
}) {
  const selected = professionals.find((professional) => professional.id === value) || professionals[0];

  return (
    <select
      value={selected.id}
      onChange={(event) => onChange(event.target.value)}
      className={compact ? "h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:bg-background" : "h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base dark:bg-background"}
      aria-label="Selecionar profissional"
    >
      {professionals.map((professional) => (
        <option key={professional.id} value={professional.id}>
          {professional.name}
        </option>
      ))}
    </select>
  );
}

export function ProfessionalDisplay({ professionalId }: { professionalId: string }) {
  const professional = professionals.find((item) => item.id === professionalId) || professionals[0];

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-slate-200 text-slate-900">{professional.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-black">{professional.name}</p>
        <p className="text-sm text-slate-500">{professional.role}</p>
      </div>
    </div>
  );
}
