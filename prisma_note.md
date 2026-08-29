3. Install stable Prisma 7 for PostgreSQL
pnpm add @prisma/client@7.10.0 @prisma/adapter-pg pg
pnpm add -D prisma@7.10.0 @types/pg
What these packages do:
- prisma — CLI commands such as migrations and client generation.
- @prisma/client — the type-safe database client used by NestJS.
- @prisma/adapter-pg and pg — PostgreSQL connection support required by Prisma 7.
- @types/pg — TypeScript types for the Postgres driver.
You already have dotenv, so do not install it again.

4. Initialize Prisma
pnpm exec prisma init --datasource-provider postgresql --output ../src/generated/prisma
This creates:
prisma/schema.prisma
prisma.config.ts
.env
It also configures generated Prisma client files to go under src/generated/prisma.

5. Set your database URL
Open .env and set:
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
Use the actual details for your PostgreSQL database.

6. Use this Prisma configuration
Check that prisma.config.ts matches this:
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
This tells Prisma where the schema and migrations live, and reads the database URL from .env.

7. Add your first model
Replace prisma/schema.prisma with:
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
Now VS Code should recognize the file as Prisma and show suggestions, validation errors, and formatting help.

8. Create the database table and generate the client
Only run this after the DATABASE_URL points to the intended database:
pnpm exec prisma migrate dev --name init
This creates a migration, applies it to your database, and creates the User table.
Then run:
pnpm exec prisma generate
This generates the typed Prisma client based on your schema. Prisma 7 requires a generator output path, which is why it writes the client under src/generated/prisma. Prisma Client generation
Finally, reload VS Code once more. Open prisma/schema.prisma; the lower-right language mode should say Prisma.