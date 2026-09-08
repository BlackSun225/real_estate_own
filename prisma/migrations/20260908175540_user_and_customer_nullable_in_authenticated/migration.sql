-- DropForeignKey
ALTER TABLE "Authenticated" DROP CONSTRAINT "Authenticated_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticated" DROP CONSTRAINT "Authenticated_userId_fkey";

-- AlterTable
ALTER TABLE "Authenticated" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Authenticated" ADD CONSTRAINT "Authenticated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticated" ADD CONSTRAINT "Authenticated_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
