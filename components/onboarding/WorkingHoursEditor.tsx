"use client";

import { Plus } from "lucide-react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export type WorkingDay = {
  day: string;
  active: boolean;
  open: string;
  close: string;
};

export type WorkingHoursFormShape = {
  workingHours: WorkingDay[];
};

const timeOptions = ["07:00", "08:00", "09:00", "10:00", "18:00", "19:00", "20:00", "21:00"];

export function WorkingHoursEditor<TFormValues extends FieldValues>({ control }: { control: Control<TFormValues> }) {
  return (
    <Controller
      control={control}
      name={"workingHours" as Path<TFormValues>}
      render={({ field }) => (
        <div className="space-y-3">
          {(field.value as WorkingDay[]).map((item, index) => (
            <div key={item.day} className="grid gap-3 rounded-lg border border-transparent p-1 sm:grid-cols-[150px_64px_1fr_auto_1fr_120px] sm:items-center">
              <p className="font-semibold">{item.day}</p>
              <Switch
                checked={item.active}
                onCheckedChange={(checked) => {
                  const next = [...(field.value as WorkingDay[])];
                  next[index] = { ...item, active: checked };
                  field.onChange(next);
                }}
                aria-label={`Ativar ${item.day}`}
              />
              <select
                className={cn(
                  "h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm dark:bg-background",
                  !item.active && "cursor-not-allowed bg-slate-100 text-slate-400",
                )}
                disabled={!item.active}
                value={item.active ? item.open : "Fechado"}
                onChange={(event) => {
                  const next = [...(field.value as WorkingDay[])];
                  next[index] = { ...item, open: event.target.value };
                  field.onChange(next);
                }}
              >
                {item.active ? timeOptions.map((time) => <option key={time}>{time}</option>) : <option>Fechado</option>}
              </select>
              <span className="hidden text-center text-sm font-semibold text-slate-500 sm:block">às</span>
              <select
                className={cn(
                  "h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm dark:bg-background",
                  !item.active && "cursor-not-allowed bg-slate-100 text-slate-400",
                )}
                disabled={!item.active}
                value={item.active ? item.close : "Fechado"}
                onChange={(event) => {
                  const next = [...(field.value as WorkingDay[])];
                  next[index] = { ...item, close: event.target.value };
                  field.onChange(next);
                }}
              >
                {item.active ? timeOptions.map((time) => <option key={time}>{time}</option>) : <option>Fechado</option>}
              </select>
              <Button
                type="button"
                variant="outline"
                disabled={!item.active}
                className="h-11 rounded-lg border-emerald-100 bg-emerald-50 px-4 text-emerald-700 hover:bg-emerald-100 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                Intervalo
              </Button>
            </div>
          ))}
        </div>
      )}
    />
  );
}
