/*
  Warnings:

  - The `posicao_torre` column on the `antenas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vr` column on the `antenas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypeTorreTipo" AS ENUM ('TOPO', 'LATERAL');

-- AlterTable
ALTER TABLE "antenas" ALTER COLUMN "gain" DROP NOT NULL,
DROP COLUMN "posicao_torre",
ADD COLUMN     "posicao_torre" "TypeTorreTipo",
DROP COLUMN "vr",
ADD COLUMN     "vr" DOUBLE PRECISION;
