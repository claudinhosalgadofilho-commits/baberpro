# Banco de Dados BarberPro

Stack recomendada: PostgreSQL + Prisma.

## Modelos principais

- `User`: acesso ao sistema.
- `BarberShop`: unidade/barbearia.
- `ShopMembership`: vínculo do usuário com uma barbearia e permissões.
- `Customer`: clientes da barbearia.
- `Barber`: profissionais e comissionamento.
- `Service`: serviços vendidos.
- `Appointment`: agenda e status do atendimento.
- `Payment`: financeiro de vendas e recebimentos.
- `Product` e `StockMovement`: estoque.
- `Expense`: contas e despesas.
- `Commission`: comissão por atendimento.
- `Notification` e `AuditLog`: operação, alertas e rastreabilidade.

## Fluxo inicial

1. Copie `.env.example` para `.env`.
2. Configure `DATABASE_URL`.
3. Rode `npm run db:generate`.
4. Rode `npm run db:migrate`.
5. Rode `npm run db:seed`.

## Próximas telas

- `/dashboard`: indicadores da operação.
- `/agendamentos`: calendário, filtros, criação e remarcação.
- `/clientes`: CRM, histórico, fidelidade.
- `/financeiro`: caixa, pagamentos, despesas, comissões.
- `/estoque`: produtos e movimentações.
- `/relatorios`: relatórios gerenciais.
