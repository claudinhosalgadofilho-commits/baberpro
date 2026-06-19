import { z } from "zod";

export const appointmentServiceSchema = z.object({
  serviceId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  professionalId: z.string().min(1, "Profissional obrigatório."),
  professionalName: z.string().min(1),
  price: z.number().min(1),
  duration: z.number().min(1),
});

export const appointmentSchema = z.object({
  clientId: z.string().min(1, "Cliente obrigatório."),
  clientName: z.string().min(1),
  date: z.string().min(1, "Data obrigatória."),
  professionalId: z.string().min(1, "Profissional obrigatório."),
  professionalName: z.string().min(1),
  startTime: z.string().min(1, "Horário obrigatório."),
  notes: z.string().max(200, "Máximo de 200 caracteres.").optional(),
  services: z.array(appointmentServiceSchema).min(1, "Adicione pelo menos 1 serviço."),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
export type AppointmentServiceItem = z.infer<typeof appointmentServiceSchema>;
