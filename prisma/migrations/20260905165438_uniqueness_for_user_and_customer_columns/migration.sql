/*
  Warnings:

  - A unique constraint covering the columns `[email_hash]` on the table `Customer_details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_hash]` on the table `Customer_details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document_number]` on the table `Customer_details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_details_email_hash_key" ON "Customer_details"("email_hash");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_details_contact_hash_key" ON "Customer_details"("contact_hash");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_details_document_number_key" ON "Customer_details"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");
