-- CreateTable
CREATE TABLE "documentos_quadro" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "quadroId" TEXT,

    CONSTRAINT "documentos_quadro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documentos_quadro" ADD CONSTRAINT "documentos_quadro_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_quadro" ADD CONSTRAINT "documentos_quadro_quadroId_fkey" FOREIGN KEY ("quadroId") REFERENCES "Quadro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
