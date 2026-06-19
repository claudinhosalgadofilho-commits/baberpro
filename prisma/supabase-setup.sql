-- Execute este SQL no Supabase SQL Editor antes de rodar as migrations.
-- Troque CHANGE_THIS_PASSWORD por uma senha forte.

create user "prisma" with password 'CHANGE_THIS_PASSWORD' bypassrls createdb;
grant "postgres" to "prisma";

grant usage, create on schema public to "prisma";
grant all privileges on all tables in schema public to "prisma";
grant all privileges on all sequences in schema public to "prisma";
grant all privileges on all routines in schema public to "prisma";

alter default privileges in schema public grant all on tables to "prisma";
alter default privileges in schema public grant all on sequences to "prisma";
alter default privileges in schema public grant all on routines to "prisma";
