## Getting Started
First, install dependencies:

```bash
npm install
# or
pnpm install
```

Second, fill out sample .env file & push to prisma:
```bash
npx prisma db push
```

Last, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Default access port: 127.0.0.1:3000 or http://localhost:3000

# Project Overview

Project was made as a graduation project with the premise of creating a web app with the goal to integrate all of banking into a single platform.

For the realization of the project certain frameworks, libraries and API's have been used to aid development and integration of vital functions (i.e linking foreign bank accounts).

The project is based on the **Next.JS 14** framework (later on upgraded to **15**) coupled with **TypeScript**.

---

## Key Libraries

- **i18Next**  
- **ShadCN**  
- **UploadThing**  
- **PrismaORM**  
- **Zod**

## Secondary Libraries

- Animation libs (**framer-motion**, **gsap**)  
- **bcrypt**  
- **jose**  
- *& others*

---

## APIs

- **Plaid API** — foreign bank integration  
- Attempted **Dwolla** (ACH payment processor) integration

---

## Hosting

- **Vercel** — hosting the Front & Back End  
- **AWS RDS** — hosting a **MySQL Database** on the cloud

---

## Implementation Details

> Due to Vercel's Serverless architecture, utilizing WebSockets was not possible.  
> The project uses **Server Events** instead to fetch the latest account data.  
> This was not the optimal solution, but it was sufficient given the scope of the project.

---

## Notes

- The project **hasn't been Dockerized** as of today.  
- Due to time constraints, **v0 by Vercel** was used partially to speed up the boilerplate of the main landing page.
  - **Landing Page Includes:** Home, Personal, Business, Features, About Us
- **ShadCN components** were used to ensure consistent design.
  - **Most Used:** Buttons, Input Fields, Dialogs, Sidebar, Toast notifications.
