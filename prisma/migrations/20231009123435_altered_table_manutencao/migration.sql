/*
  Warnings:

  - You are about to drop the column `data` on the `manutencao` table. All the data in the column will be lost.
  - Added the required column `dataCreate` to the `Manutencao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `manutencao` DROP COLUMN `data`,
    ADD COLUMN `dataCreate` DATETIME(3) NOT NULL;
