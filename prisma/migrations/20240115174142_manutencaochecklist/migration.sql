-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "checklistManutencaoId" TEXT;

-- CreateTable
CREATE TABLE "ChecklistManutencao" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "antenaId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "templateId" TEXT,
    "manutencaoId" TEXT,

    CONSTRAINT "ChecklistManutencao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChecklistManutencao" ADD CONSTRAINT "ChecklistManutencao_antenaId_fkey" FOREIGN KEY ("antenaId") REFERENCES "antenas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistManutencao" ADD CONSTRAINT "ChecklistManutencao_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistManutencao" ADD CONSTRAINT "ChecklistManutencao_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistManutencao" ADD CONSTRAINT "ChecklistManutencao_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_checklistManutencaoId_fkey" FOREIGN KEY ("checklistManutencaoId") REFERENCES "ChecklistManutencao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
