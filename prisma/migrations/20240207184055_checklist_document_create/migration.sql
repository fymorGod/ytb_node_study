-- CreateTable
CREATE TABLE "documentos_checklists" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "checklistId" TEXT,

    CONSTRAINT "documentos_checklists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documentos_checklists" ADD CONSTRAINT "documentos_checklists_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_checklists" ADD CONSTRAINT "documentos_checklists_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
