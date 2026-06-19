import { PrismaClient, PaymentMethod, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.user.upsert({
    where: { email: "admin@barberpro.local" },
    update: {},
    create: {
      name: "Administrador BarberPro",
      email: "admin@barberpro.local",
      passwordHash: "replace-with-bcrypt-hash",
    },
  });

  const shop = await prisma.barberShop.upsert({
    where: { slug: "barbearia-prime" },
    update: {},
    create: {
      name: "Barbearia Prime",
      slug: "barbearia-prime",
      phone: "(11) 99999-9999",
      city: "São Paulo",
      state: "SP",
      memberships: {
        create: {
          userId: owner.id,
          role: "OWNER",
        },
      },
    },
  });

  const barber = await prisma.barber.create({
    data: {
      shopId: shop.id,
      name: "André Costa",
      specialty: "Barbeiro master",
      commissionRate: "0.4",
    },
  });

  const service = await prisma.service.create({
    data: {
      shopId: shop.id,
      name: "Corte + barba",
      durationMin: 60,
      priceCents: 9500,
    },
  });

  const customer = await prisma.customer.upsert({
    where: { shopId_phone: { shopId: shop.id, phone: "(11) 98888-7777" } },
    update: {},
    create: {
      shopId: shop.id,
      name: "Rafael Lima",
      phone: "(11) 98888-7777",
      email: "rafael@example.com",
    },
  });

  const startsAt = new Date();
  startsAt.setHours(9, 0, 0, 0);
  const endsAt = new Date(startsAt);
  endsAt.setMinutes(endsAt.getMinutes() + service.durationMin);

  const appointment = await prisma.appointment.create({
    data: {
      shopId: shop.id,
      customerId: customer.id,
      barberId: barber.id,
      serviceId: service.id,
      startsAt,
      endsAt,
      status: "CONFIRMED",
      priceCents: service.priceCents,
    },
  });

  await prisma.payment.create({
    data: {
      shopId: shop.id,
      appointmentId: appointment.id,
      customerId: customer.id,
      amountCents: service.priceCents,
      method: PaymentMethod.PIX,
      status: PaymentStatus.PAID,
      paidAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
