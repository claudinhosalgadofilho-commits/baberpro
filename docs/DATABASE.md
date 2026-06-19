# Banco de Dados BarberPro

Stack: Supabase PostgreSQL + Prisma ORM.

## Status atual

O projeto esta preparado para conectar no Supabase, mas a conexao real depende das credenciais do seu projeto:

- `DATABASE_URL`
- `DIRECT_URL`

Essas variaveis devem ficar no arquivo `.env`, que nao deve ser enviado ao Git.

A publishable key do Supabase deve ser usada em:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

Ela nao substitui `DATABASE_URL` nem `DIRECT_URL`. O Prisma precisa da connection string PostgreSQL.

Projeto Supabase informado:

```text
https://zkolbaipkoacoanbpxpr.supabase.co
```

Project ref:

```text
zkolbaipkoacoanbpxpr
```

Project name:

```text
baberpro
```

Project region:

```text
us-west-2 - West US (Oregon)
```

## 1. Criar projeto no Supabase

1. Acesse o Supabase.
2. Crie um novo projeto.
3. Guarde a senha do banco.
4. Abra `Project Settings > Database > Connection string`.

## 2. Criar usuario do Prisma

No Supabase, abra `SQL Editor` e execute o arquivo:

```sql
prisma/supabase-setup.sql
```

Antes de executar, troque:

```sql
CHANGE_THIS_PASSWORD
```

por uma senha forte.

## 3. Configurar `.env`

Crie o arquivo `.env` na raiz do projeto com base em `.env.example`.

Formato recomendado:

```env
NEXT_PUBLIC_SUPABASE_URL="https://zkolbaipkoacoanbpxpr.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[SUPABASE_PUBLISHABLE_KEY]"
DIRECT_URL="postgresql://prisma.zkolbaipkoacoanbpxpr:[DATABASE_PASSWORD]@aws-0-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require"
DATABASE_URL="postgresql://prisma.zkolbaipkoacoanbpxpr:[DATABASE_PASSWORD]@aws-0-us-west-2.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Troque:

- `[DATABASE_PASSWORD]`: pela senha do usuario `prisma` criada no SQL.
- `[SUPABASE_PUBLISHABLE_KEY]`: pela publishable key do projeto Supabase.

Use:

- `DIRECT_URL`: Session Pooler, porta `5432`, para migrations.
- `DATABASE_URL`: Transaction Pooler, porta `6543`, para runtime/serverless.

Se for rodar apenas localmente, tambem pode usar a Session Pooler nas duas variaveis.

Alternativa direta enviada pelo Supabase:

```env
DIRECT_URL="postgresql://postgres:[DATABASE_PASSWORD]@db.zkolbaipkoacoanbpxpr.supabase.co:5432/postgres?sslmode=require"
DATABASE_URL="postgresql://postgres:[DATABASE_PASSWORD]@db.zkolbaipkoacoanbpxpr.supabase.co:5432/postgres?sslmode=require"
```

Essa alternativa funciona bem para desenvolvimento local e migrations, mas para deploy serverless e producao prefira o pooler.

## 4. Aplicar schema no Supabase

Depois de configurar o `.env`, rode:

```bash
npm run db:generate
npm run db:push
```

Para ambiente com historico de migrations:

```bash
npm run db:migrate
```

## 5. Testar conexao

```bash
npm run db:check
```

Resultado esperado:

```text
Conexao com o banco OK: true
Barbearias cadastradas: 0
```

## Modelos principais

- `User`: acesso ao sistema.
- `BarberShop`: tenant/unidade da barbearia.
- `ShopMembership`: vinculo do usuario com a barbearia e permissoes.
- `Customer`: clientes da barbearia.
- `Barber`: profissionais.
- `Service`: servicos vendidos.
- `Appointment`: agenda e status do atendimento.
- `AppointmentService`: multiplos servicos por agendamento.
- `AppointmentLog`: historico do agendamento.
- `AppointmentAttachment`: anexos do agendamento.
- `AppointmentMessage`: mensagens e lembretes.
- `Payment`: financeiro de vendas e recebimentos.
- `Product` e `StockMovement`: estoque.
- `Expense`: contas e despesas.
- `Commission`: comissoes.
- `Notification` e `AuditLog`: operacao e rastreabilidade.
