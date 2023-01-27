/*
  Warnings:

  - Added the required column `product_amount` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sales` ADD COLUMN `product_amount` INTEGER NOT NULL,
    ADD COLUMN `total_price` DOUBLE NOT NULL;
