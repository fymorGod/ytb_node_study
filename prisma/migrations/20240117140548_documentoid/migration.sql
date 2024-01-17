/*
  Warnings:

  - You are about to drop the column `id_doc` on the `documentos_antenas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "documentos_antenas" DROP CONSTRAINT "documentos_antenas_id_doc_fkey";

-- AlterTable
ALTER TABLE "documentos_antenas" DROP COLUMN "id_doc",
ADD COLUMN     "documentoId" TEXT;

-- AddForeignKey
ALTER TABLE "documentos_antenas" ADD CONSTRAINT "documentos_antenas_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
