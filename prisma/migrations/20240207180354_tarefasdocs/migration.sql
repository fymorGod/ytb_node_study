/*
  Warnings:

  - You are about to drop the `tarefas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "documentos_tarefas" DROP CONSTRAINT "documentos_tarefas_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_checklistId_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_checklistManutencaoId_fkey";

-- DropTable
DROP TABLE "tarefas";

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "verificado" BOOLEAN NOT NULL,
    "foto_verificado" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "checklistId" TEXT,
    "checklistManutencaoId" TEXT,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documentos_tarefas" ADD CONSTRAINT "documentos_tarefas_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "Tarefa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_checklistManutencaoId_fkey" FOREIGN KEY ("checklistManutencaoId") REFERENCES "ChecklistManutencao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
