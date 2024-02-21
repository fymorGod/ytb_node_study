-- DropForeignKey
ALTER TABLE "documentos_antenas" DROP CONSTRAINT "documentos_antenas_documentoId_fkey";

-- CreateTable
CREATE TABLE "documentos_usuario" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "userId" TEXT,

    CONSTRAINT "documentos_usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documentos_usuario" ADD CONSTRAINT "documentos_usuario_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_usuario" ADD CONSTRAINT "documentos_usuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_antenas" ADD CONSTRAINT "documentos_antenas_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
