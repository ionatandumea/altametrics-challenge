# Requirements

node v24.6.0
docker engine v28.3.2
docker compose v2.39.1

1. Spin up the postgres database locally
   `docker compose up -d`

2. Creates the sql migration files from the prisma models and runs them against the database
   `npx prisma migrate dev --name init`

3. Seed the database
   npm run db:seed

Prisma automatically invokes the prisma generate command for you. In the future, you need to run this command after every change to your Prisma models to update your generated Prisma Client.

3. Start the nest api server
   `npm run start`

`npx prisma generate` to generate the client types

.. pnpm insatlled for client
