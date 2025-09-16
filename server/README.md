# Server-side of the Altametrics challenge

## Requirements

- Node v24.6.0
- Docker engine v28.3.2
- Docker compose v2.39.1

## Follow this steps to spin up the api locally

1. Spin up the postgres database

   > docker compose up -d

2. Seed the database to create the root user and multiple invoices

   > npm run db:seed

3. Start the api server

   > npm run start
