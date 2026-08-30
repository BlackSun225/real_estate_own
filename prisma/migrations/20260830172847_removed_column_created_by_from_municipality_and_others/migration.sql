/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Municipality` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Property_category` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Property_type` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Municipality" DROP COLUMN "createdBy";

-- AlterTable
ALTER TABLE "Property_category" DROP COLUMN "createdBy";

-- AlterTable
ALTER TABLE "Property_type" DROP COLUMN "createdBy";
