/*
  Warnings:

  - You are about to drop the `checklisttemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `checklisttemplate` DROP FOREIGN KEY `ChecklistTemplate_checklistId_fkey`;

-- DropForeignKey
ALTER TABLE `checklisttemplate` DROP FOREIGN KEY `ChecklistTemplate_templateId_fkey`;

-- AlterTable
ALTER TABLE `checklist` ADD COLUMN `templateId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `checklisttemplate`;

-- CreateTable
CREATE TABLE `documentos` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `fileFormat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_antenas` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_doc` VARCHAR(191) NOT NULL,
    `antenaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_arcondicionados` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `arcondicionadoId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_cabos` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `caboId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_combinador` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `combinadorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_disjuntor` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `disjuntorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_dps` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `dpsId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_exaustor` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_nobreak` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `nobreakId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_parabolica` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `parabolicaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_receptor` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `receptorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_station` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_switch` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `switchiesId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_telemetria` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `telemetriaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_torre` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,
    `torreId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos_transmissor` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `documentoId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `documentos_antenas` ADD CONSTRAINT `documentos_antenas_id_doc_fkey` FOREIGN KEY (`id_doc`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_antenas` ADD CONSTRAINT `documentos_antenas_antenaId_fkey` FOREIGN KEY (`antenaId`) REFERENCES `Antena`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_arcondicionados` ADD CONSTRAINT `documentos_arcondicionados_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_arcondicionados` ADD CONSTRAINT `documentos_arcondicionados_arcondicionadoId_fkey` FOREIGN KEY (`arcondicionadoId`) REFERENCES `Arcondicionado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_cabos` ADD CONSTRAINT `documentos_cabos_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_cabos` ADD CONSTRAINT `documentos_cabos_caboId_fkey` FOREIGN KEY (`caboId`) REFERENCES `Cabo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_combinador` ADD CONSTRAINT `documentos_combinador_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_combinador` ADD CONSTRAINT `documentos_combinador_combinadorId_fkey` FOREIGN KEY (`combinadorId`) REFERENCES `Combinador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_disjuntor` ADD CONSTRAINT `documentos_disjuntor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_disjuntor` ADD CONSTRAINT `documentos_disjuntor_disjuntorId_fkey` FOREIGN KEY (`disjuntorId`) REFERENCES `Disjuntor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_dps` ADD CONSTRAINT `documentos_dps_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_dps` ADD CONSTRAINT `documentos_dps_dpsId_fkey` FOREIGN KEY (`dpsId`) REFERENCES `Dps`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_exaustor` ADD CONSTRAINT `documentos_exaustor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_nobreak` ADD CONSTRAINT `documentos_nobreak_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_nobreak` ADD CONSTRAINT `documentos_nobreak_nobreakId_fkey` FOREIGN KEY (`nobreakId`) REFERENCES `Nobreak`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_parabolica` ADD CONSTRAINT `documentos_parabolica_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_parabolica` ADD CONSTRAINT `documentos_parabolica_parabolicaId_fkey` FOREIGN KEY (`parabolicaId`) REFERENCES `Parabolica`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_receptor` ADD CONSTRAINT `documentos_receptor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_receptor` ADD CONSTRAINT `documentos_receptor_receptorId_fkey` FOREIGN KEY (`receptorId`) REFERENCES `Receptor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_station` ADD CONSTRAINT `documentos_station_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_station` ADD CONSTRAINT `documentos_station_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_switch` ADD CONSTRAINT `documentos_switch_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_switch` ADD CONSTRAINT `documentos_switch_switchiesId_fkey` FOREIGN KEY (`switchiesId`) REFERENCES `Switchies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_telemetria` ADD CONSTRAINT `documentos_telemetria_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_telemetria` ADD CONSTRAINT `documentos_telemetria_telemetriaId_fkey` FOREIGN KEY (`telemetriaId`) REFERENCES `Telemetria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_torre` ADD CONSTRAINT `documentos_torre_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_torre` ADD CONSTRAINT `documentos_torre_torreId_fkey` FOREIGN KEY (`torreId`) REFERENCES `Torre`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_transmissor` ADD CONSTRAINT `documentos_transmissor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
