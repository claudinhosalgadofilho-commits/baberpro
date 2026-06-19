import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw<Array<{ ok: number }>>`select 1 as ok`;
  const shops = await prisma.barberShop.count();

  console.log("Conexao com o banco OK:", result[0]?.ok === 1);
  console.log("Barbearias cadastradas:", shops);
}

main()
  .catch((error) => {
    console.error("Falha ao conectar no banco:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
