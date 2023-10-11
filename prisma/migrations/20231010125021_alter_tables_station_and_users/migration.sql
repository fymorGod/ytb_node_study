/*
  Warnings:

  - You are about to drop the column `manutencaoId` on the `station` table. All the data in the column will be lost.
  - You are about to drop the column `manutencaoId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `station` DROP COLUMN `manutencaoId`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `manutencaoId`;
