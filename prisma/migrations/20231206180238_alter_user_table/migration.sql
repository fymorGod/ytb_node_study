-- DropForeignKey
ALTER TABLE "Manutencao" DROP CONSTRAINT "Manutencao_userId_fkey";

-- DropIndex
DROP INDEX "Manutencao_userId_key";

-- AlterTable
ALTER TABLE "Manutencao" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
