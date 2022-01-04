-- CreateTable
CREATE TABLE "PriceList" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceList_pkey" PRIMARY KEY ("id")
);
