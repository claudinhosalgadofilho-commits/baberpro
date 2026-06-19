import { addMinutes, parseISO } from "date-fns";
import { NextResponse } from "next/server";

import { appointmentSchema } from "@/components/appointments/appointment-schema";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = appointmentSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 422 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        message: "DATABASE_URL não configurado. O agendamento foi validado, mas ainda não foi salvo no banco.",
      },
      { status: 503 },
    );
  }

  const values = parsed.data;
  const totalDuration = values.services.reduce((sum, service) => sum + service.duration, 0);
  const totalValue = values.services.reduce((sum, service) => sum + service.price, 0);
  const startsAt = parseISO(`${values.date}T${values.startTime}:00`);
  const endsAt = addMinutes(startsAt, totalDuration);
  const firstService = values.services[0];

  const appointment = await db.appointment.create({
    data: {
      shopId: "barbearia_estilo",
      customerId: values.clientId,
      barberId: values.professionalId,
      serviceId: firstService.serviceId,
      startsAt,
      endsAt,
      notes: values.notes,
      priceCents: totalValue * 100,
      services: {
        create: values.services.map((service) => ({
          serviceId: service.serviceId,
          professionalId: service.professionalId,
          price: service.price * 100,
          duration: service.duration,
        })),
      },
    },
  });

  return NextResponse.json({ ok: true, appointmentId: appointment.id });
}
