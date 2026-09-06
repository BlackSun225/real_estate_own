-- CreateTable
CREATE TABLE "Authenticated" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Authenticated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authenticated_logs" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Authenticated_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Authenticated" ADD CONSTRAINT "Authenticated_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticated" ADD CONSTRAINT "Authenticated_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticated_logs" ADD CONSTRAINT "Authenticated_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticated_logs" ADD CONSTRAINT "Authenticated_logs_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
