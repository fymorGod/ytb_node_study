/*
  Warnings:

  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_checklistId_fkey";

-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_checklistManutencaoId_fkey";

-- DropTable
DROP TABLE "Tarefa";

-- CreateTable
CREATE TABLE "documentos_tarefas" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "arcondicionadoId" TEXT,
    "tarefaId" TEXT,

    CONSTRAINT "documentos_tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "verificado" BOOLEAN NOT NULL,
    "foto_verificado" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "checklistId" TEXT,
    "checklistManutencaoId" TEXT,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documentos_tarefas" ADD CONSTRAINT "documentos_tarefas_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_tarefas" ADD CONSTRAINT "documentos_tarefas_tarefaId_fkey" FOREIGN KEY ("tarefaId") REFERENCES "tarefas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_checklistManutencaoId_fkey" FOREIGN KEY ("checklistManutencaoId") REFERENCES "ChecklistManutencao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
