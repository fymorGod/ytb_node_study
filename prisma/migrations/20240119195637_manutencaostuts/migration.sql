/*
  Warnings:

  - The values [EM_AGUARDO] on the enum `StatusManutencao` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusManutencao_new" AS ENUM ('AGENDADA', 'EM_EXECUCAO', 'EM_ESPERA', 'FINALIZADA');
ALTER TABLE "Manutencao" ALTER COLUMN "status" TYPE "StatusManutencao_new" USING ("status"::text::"StatusManutencao_new");
ALTER TYPE "StatusManutencao" RENAME TO "StatusManutencao_old";
ALTER TYPE "StatusManutencao_new" RENAME TO "StatusManutencao";
DROP TYPE "StatusManutencao_old";
COMMIT;
