-- CreateEnum
CREATE TYPE "TypeCategoria" AS ENUM ('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO');

-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO');

-- CreateEnum
CREATE TYPE "TypeAntena" AS ENUM ('OMNIDIRECIONAL', 'DIRETIVA');

-- CreateEnum
CREATE TYPE "TypeCabo" AS ENUM ('C_7_8', 'C_15_8', 'C_31_8');

-- CreateEnum
CREATE TYPE "TypeDps" AS ENUM ('D_1', 'D_2', 'D_3');

-- CreateEnum
CREATE TYPE "TypeTowers" AS ENUM ('AUTOPORTANTE', 'ESTAIADA');

-- CreateEnum
CREATE TYPE "TipoManutencao" AS ENUM ('PREVENTIVA', 'CORRETIVA');

-- CreateEnum
CREATE TYPE "StatusManutencao" AS ENUM ('AGENDADA', 'EM_EXECUCAO', 'EM_AGUARDO', 'FINALIZADA');

-- CreateTable
CREATE TABLE "documentos" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileFormat" TEXT NOT NULL,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_antenas" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_doc" TEXT NOT NULL,
    "antenaId" TEXT,

    CONSTRAINT "documentos_antenas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_arcondicionados" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "arcondicionadoId" TEXT,

    CONSTRAINT "documentos_arcondicionados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_cabos" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "caboId" TEXT,

    CONSTRAINT "documentos_cabos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_combinador" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "combinadorId" TEXT,

    CONSTRAINT "documentos_combinador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_disjuntor" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "disjuntorId" TEXT,

    CONSTRAINT "documentos_disjuntor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_dps" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "dpsId" TEXT,

    CONSTRAINT "documentos_dps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_exaustor" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "exaustorId" TEXT,

    CONSTRAINT "documentos_exaustor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_nobreak" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "nobreakId" TEXT,

    CONSTRAINT "documentos_nobreak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_parabolica" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "parabolicaId" TEXT,

    CONSTRAINT "documentos_parabolica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_receptor" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "receptorId" TEXT,

    CONSTRAINT "documentos_receptor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_station" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "documentos_station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_switch" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "switchiesId" TEXT,

    CONSTRAINT "documentos_switch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_telemetria" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "telemetriaId" TEXT,

    CONSTRAINT "documentos_telemetria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_torre" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "torreId" TEXT,

    CONSTRAINT "documentos_torre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos_transmissor" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "documentoId" TEXT,
    "transmissorId" TEXT,

    CONSTRAINT "documentos_transmissor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "contato_empresa" TEXT NOT NULL,
    "accessId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Access" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manutencao" (
    "id" TEXT NOT NULL,
    "dataCreate" TEXT NOT NULL,
    "tipo" "TipoManutencao" NOT NULL,
    "observacao" TEXT,
    "status" "StatusManutencao" NOT NULL,
    "stationId" TEXT NOT NULL,
    "userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Antena" (
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

    CONSTRAINT "Antena_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoEquipamento" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoEquipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "templateId" TEXT,
    "manutencaoId" TEXT,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "verificado" BOOLEAN NOT NULL,
    "foto_verificado" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "checklistId" TEXT,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arcondicionado" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "potencia" INTEGER NOT NULL,
    "tensao" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Arcondicionado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cabo" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "tipos_cabo" "TypeCabo" NOT NULL,
    "tamanho" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Cabo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Combinador" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Combinador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disjuntor" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "corrente_maxima" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,
    "quadroId" TEXT,

    CONSTRAINT "Disjuntor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quadro" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Quadro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dps" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "classe_dps" "TypeDps" NOT NULL,
    "corrente_maxima" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,
    "quadroId" TEXT,

    CONSTRAINT "Dps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exaustor" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Exaustor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nobreak" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "tensao_entrada" INTEGER NOT NULL,
    "tensao_saida" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Nobreak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parabolica" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "diametro" DOUBLE PRECISION NOT NULL,
    "satelite" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Parabolica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receptor" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "channel" DOUBLE PRECISION NOT NULL,
    "frequencia" INTEGER NOT NULL,
    "symbol_rate" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "parabolicaId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Receptor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "link_grafana" TEXT NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Switchies" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "qtd_portas" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Switchies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telemetria" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Telemetria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Torre" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "tipo_torre" "TypeTowers" NOT NULL,
    "aterramento" BOOLEAN NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Torre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmissor" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "categoria" "TypeCategoria" NOT NULL,
    "status" "TypeStatus" NOT NULL,
    "programmed" DOUBLE PRECISION NOT NULL,
    "canal_fisico" DOUBLE PRECISION NOT NULL,
    "canal_virtual" DOUBLE PRECISION NOT NULL,
    "acoplador_one" TEXT,
    "acoplador_two" TEXT,
    "receptorId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "antenaId" TEXT,
    "tipoEquipamentoId" TEXT,
    "stationId" TEXT,

    CONSTRAINT "Transmissor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Access_name_key" ON "Access"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Antena_codigo_key" ON "Antena"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "TipoEquipamento_name_key" ON "TipoEquipamento"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Arcondicionado_codigo_key" ON "Arcondicionado"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Cabo_codigo_key" ON "Cabo"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Combinador_codigo_key" ON "Combinador"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Disjuntor_codigo_key" ON "Disjuntor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Quadro_codigo_key" ON "Quadro"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Dps_codigo_key" ON "Dps"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Exaustor_codigo_key" ON "Exaustor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Nobreak_codigo_key" ON "Nobreak"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Parabolica_codigo_key" ON "Parabolica"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Receptor_codigo_key" ON "Receptor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Switchies_codigo_key" ON "Switchies"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Telemetria_codigo_key" ON "Telemetria"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Torre_codigo_key" ON "Torre"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Transmissor_codigo_key" ON "Transmissor"("codigo");

-- AddForeignKey
ALTER TABLE "documentos_antenas" ADD CONSTRAINT "documentos_antenas_id_doc_fkey" FOREIGN KEY ("id_doc") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_antenas" ADD CONSTRAINT "documentos_antenas_antenaId_fkey" FOREIGN KEY ("antenaId") REFERENCES "Antena"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_arcondicionados" ADD CONSTRAINT "documentos_arcondicionados_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_arcondicionados" ADD CONSTRAINT "documentos_arcondicionados_arcondicionadoId_fkey" FOREIGN KEY ("arcondicionadoId") REFERENCES "Arcondicionado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_cabos" ADD CONSTRAINT "documentos_cabos_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_cabos" ADD CONSTRAINT "documentos_cabos_caboId_fkey" FOREIGN KEY ("caboId") REFERENCES "Cabo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_combinador" ADD CONSTRAINT "documentos_combinador_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_combinador" ADD CONSTRAINT "documentos_combinador_combinadorId_fkey" FOREIGN KEY ("combinadorId") REFERENCES "Combinador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_disjuntor" ADD CONSTRAINT "documentos_disjuntor_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_disjuntor" ADD CONSTRAINT "documentos_disjuntor_disjuntorId_fkey" FOREIGN KEY ("disjuntorId") REFERENCES "Disjuntor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_dps" ADD CONSTRAINT "documentos_dps_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_dps" ADD CONSTRAINT "documentos_dps_dpsId_fkey" FOREIGN KEY ("dpsId") REFERENCES "Dps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_exaustor" ADD CONSTRAINT "documentos_exaustor_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_exaustor" ADD CONSTRAINT "documentos_exaustor_exaustorId_fkey" FOREIGN KEY ("exaustorId") REFERENCES "Exaustor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_nobreak" ADD CONSTRAINT "documentos_nobreak_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_nobreak" ADD CONSTRAINT "documentos_nobreak_nobreakId_fkey" FOREIGN KEY ("nobreakId") REFERENCES "Nobreak"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_parabolica" ADD CONSTRAINT "documentos_parabolica_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_parabolica" ADD CONSTRAINT "documentos_parabolica_parabolicaId_fkey" FOREIGN KEY ("parabolicaId") REFERENCES "Parabolica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_receptor" ADD CONSTRAINT "documentos_receptor_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_receptor" ADD CONSTRAINT "documentos_receptor_receptorId_fkey" FOREIGN KEY ("receptorId") REFERENCES "Receptor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_station" ADD CONSTRAINT "documentos_station_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_station" ADD CONSTRAINT "documentos_station_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_switch" ADD CONSTRAINT "documentos_switch_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_switch" ADD CONSTRAINT "documentos_switch_switchiesId_fkey" FOREIGN KEY ("switchiesId") REFERENCES "Switchies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_telemetria" ADD CONSTRAINT "documentos_telemetria_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_telemetria" ADD CONSTRAINT "documentos_telemetria_telemetriaId_fkey" FOREIGN KEY ("telemetriaId") REFERENCES "Telemetria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_torre" ADD CONSTRAINT "documentos_torre_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_torre" ADD CONSTRAINT "documentos_torre_torreId_fkey" FOREIGN KEY ("torreId") REFERENCES "Torre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_transmissor" ADD CONSTRAINT "documentos_transmissor_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos_transmissor" ADD CONSTRAINT "documentos_transmissor_transmissorId_fkey" FOREIGN KEY ("transmissorId") REFERENCES "Transmissor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Antena" ADD CONSTRAINT "Antena_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Antena" ADD CONSTRAINT "Antena_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "Manutencao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arcondicionado" ADD CONSTRAINT "Arcondicionado_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arcondicionado" ADD CONSTRAINT "Arcondicionado_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cabo" ADD CONSTRAINT "Cabo_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cabo" ADD CONSTRAINT "Cabo_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combinador" ADD CONSTRAINT "Combinador_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combinador" ADD CONSTRAINT "Combinador_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disjuntor" ADD CONSTRAINT "Disjuntor_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disjuntor" ADD CONSTRAINT "Disjuntor_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disjuntor" ADD CONSTRAINT "Disjuntor_quadroId_fkey" FOREIGN KEY ("quadroId") REFERENCES "Quadro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quadro" ADD CONSTRAINT "Quadro_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quadro" ADD CONSTRAINT "Quadro_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dps" ADD CONSTRAINT "Dps_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dps" ADD CONSTRAINT "Dps_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dps" ADD CONSTRAINT "Dps_quadroId_fkey" FOREIGN KEY ("quadroId") REFERENCES "Quadro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exaustor" ADD CONSTRAINT "Exaustor_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exaustor" ADD CONSTRAINT "Exaustor_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nobreak" ADD CONSTRAINT "Nobreak_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nobreak" ADD CONSTRAINT "Nobreak_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parabolica" ADD CONSTRAINT "Parabolica_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parabolica" ADD CONSTRAINT "Parabolica_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receptor" ADD CONSTRAINT "Receptor_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receptor" ADD CONSTRAINT "Receptor_parabolicaId_fkey" FOREIGN KEY ("parabolicaId") REFERENCES "Parabolica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receptor" ADD CONSTRAINT "Receptor_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Switchies" ADD CONSTRAINT "Switchies_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Switchies" ADD CONSTRAINT "Switchies_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telemetria" ADD CONSTRAINT "Telemetria_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telemetria" ADD CONSTRAINT "Telemetria_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Torre" ADD CONSTRAINT "Torre_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Torre" ADD CONSTRAINT "Torre_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmissor" ADD CONSTRAINT "Transmissor_receptorId_fkey" FOREIGN KEY ("receptorId") REFERENCES "Receptor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmissor" ADD CONSTRAINT "Transmissor_antenaId_fkey" FOREIGN KEY ("antenaId") REFERENCES "Antena"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmissor" ADD CONSTRAINT "Transmissor_tipoEquipamentoId_fkey" FOREIGN KEY ("tipoEquipamentoId") REFERENCES "TipoEquipamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transmissor" ADD CONSTRAINT "Transmissor_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE SET NULL ON UPDATE CASCADE;
