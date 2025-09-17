# 🚀 Project Setup Guide

## 🖥️ Server Side

### Requirements

- **Node**: v24.6.0
- **Docker Engine**: v28.3.2
- **Docker Compose**: v2.39.1

### Steps to Run API Locally

1. **Spin up the Postgres database**

   ```bash
   docker compose up -d
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   Run migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

3. **Seed the database** (creates root user + sample invoices)

   ```bash
   npm run db:seed
   ```

4. **Start the API server**
   ```bash
   npm run start
   ```

---

## 🌐 Client Side

### Requirements

- **Node**: v24.6.0
- **pnpm**: v10.16.1

### Steps to Run React Project Locally

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start the project**

   ```bash
   pnpm run dev
   ```

3. **Login credentials**
   ```text
   email:    root@root.com
   password: root123
   ```
