/*
  Warnings:

  - You are about to drop the `Antena` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Antena" DROP CONSTRAINT "Antena_stationId_fkey";

-- DropForeignKey
ALTER TABLE "Antena" DROP CONSTRAINT "Antena_tipoEquipamentoId_fkey";

-- DropForeignKey
ALTER TABLE "Transmissor" DROP CONSTRAINT "Transmissor_antenaId_fkey";

-- DropForeignKey
ALTER TABLE "documentos_antenas" DROP CONSTRAINT "documentos_antenas_antenaId_fkey";

-- DropTable
DROP TABLE "Antena";

-- CreateTable
CREATE TABLE "antenas" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "gain" TEXT NOT NULL,
    "tipos_antena" "TypeAntena" NOT NULL,
    "posicao_torre" DOUBLE PRECISION NOT NULL,
    "vr" TEXT NOT NULL,
    "tipoEquipamentoId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "stationId" TEXT,

    CONSTRAINT "antenas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "antenas_codigo_key" ON "antenas"("codigo");

-- AddForeignKey
ALTER TABLE "documentos_antenas" ADD CONSTRAINT "documentos_antenas_antenaId_fkey" FOREIGN KEY ("antenaId") REFERENCES "antenas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antenas" ADD CONSTRAINT "antenas_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antenas" ADD CONSTRAINT "antenas_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmissor" ADD CONSTRAINT "Transmissor_antenaId_fkey" FOREIGN KEY ("antenaId") REFERENCES "antenas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
