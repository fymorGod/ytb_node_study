/*
  Warnings:

  - You are about to drop the column `manutencaoId` on the `Checklist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Checklist" DROP CONSTRAINT "Checklist_manutencaoId_fkey";

-- AlterTable
ALTER TABLE "Checklist" DROP COLUMN "manutencaoId";
