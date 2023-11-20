-- DropForeignKey
ALTER TABLE `documentos_arcondicionados` DROP FOREIGN KEY `documentos_arcondicionados_arcondicionadoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_arcondicionados` DROP FOREIGN KEY `documentos_arcondicionados_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_cabos` DROP FOREIGN KEY `documentos_cabos_caboId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_cabos` DROP FOREIGN KEY `documentos_cabos_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_combinador` DROP FOREIGN KEY `documentos_combinador_combinadorId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_combinador` DROP FOREIGN KEY `documentos_combinador_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_disjuntor` DROP FOREIGN KEY `documentos_disjuntor_disjuntorId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_disjuntor` DROP FOREIGN KEY `documentos_disjuntor_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_dps` DROP FOREIGN KEY `documentos_dps_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_dps` DROP FOREIGN KEY `documentos_dps_dpsId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_exaustor` DROP FOREIGN KEY `documentos_exaustor_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_nobreak` DROP FOREIGN KEY `documentos_nobreak_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_nobreak` DROP FOREIGN KEY `documentos_nobreak_nobreakId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_parabolica` DROP FOREIGN KEY `documentos_parabolica_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_parabolica` DROP FOREIGN KEY `documentos_parabolica_parabolicaId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_receptor` DROP FOREIGN KEY `documentos_receptor_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_receptor` DROP FOREIGN KEY `documentos_receptor_receptorId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_station` DROP FOREIGN KEY `documentos_station_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_station` DROP FOREIGN KEY `documentos_station_stationId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_switch` DROP FOREIGN KEY `documentos_switch_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_switch` DROP FOREIGN KEY `documentos_switch_switchiesId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_telemetria` DROP FOREIGN KEY `documentos_telemetria_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_telemetria` DROP FOREIGN KEY `documentos_telemetria_telemetriaId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_torre` DROP FOREIGN KEY `documentos_torre_documentoId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_torre` DROP FOREIGN KEY `documentos_torre_torreId_fkey`;

-- DropForeignKey
ALTER TABLE `documentos_transmissor` DROP FOREIGN KEY `documentos_transmissor_documentoId_fkey`;

-- AlterTable
ALTER TABLE `documentos_exaustor` ADD COLUMN `exaustorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `documentos_transmissor` ADD COLUMN `transmissorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `documentos_arcondicionados` ADD CONSTRAINT `documentos_arcondicionados_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_arcondicionados` ADD CONSTRAINT `documentos_arcondicionados_arcondicionadoId_fkey` FOREIGN KEY (`arcondicionadoId`) REFERENCES `Arcondicionado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_cabos` ADD CONSTRAINT `documentos_cabos_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_cabos` ADD CONSTRAINT `documentos_cabos_caboId_fkey` FOREIGN KEY (`caboId`) REFERENCES `Cabo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_combinador` ADD CONSTRAINT `documentos_combinador_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_combinador` ADD CONSTRAINT `documentos_combinador_combinadorId_fkey` FOREIGN KEY (`combinadorId`) REFERENCES `Combinador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_disjuntor` ADD CONSTRAINT `documentos_disjuntor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_disjuntor` ADD CONSTRAINT `documentos_disjuntor_disjuntorId_fkey` FOREIGN KEY (`disjuntorId`) REFERENCES `Disjuntor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_dps` ADD CONSTRAINT `documentos_dps_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_dps` ADD CONSTRAINT `documentos_dps_dpsId_fkey` FOREIGN KEY (`dpsId`) REFERENCES `Dps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_exaustor` ADD CONSTRAINT `documentos_exaustor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_exaustor` ADD CONSTRAINT `documentos_exaustor_exaustorId_fkey` FOREIGN KEY (`exaustorId`) REFERENCES `Exaustor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_nobreak` ADD CONSTRAINT `documentos_nobreak_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_nobreak` ADD CONSTRAINT `documentos_nobreak_nobreakId_fkey` FOREIGN KEY (`nobreakId`) REFERENCES `Nobreak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_parabolica` ADD CONSTRAINT `documentos_parabolica_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_parabolica` ADD CONSTRAINT `documentos_parabolica_parabolicaId_fkey` FOREIGN KEY (`parabolicaId`) REFERENCES `Parabolica`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_receptor` ADD CONSTRAINT `documentos_receptor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_receptor` ADD CONSTRAINT `documentos_receptor_receptorId_fkey` FOREIGN KEY (`receptorId`) REFERENCES `Receptor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_station` ADD CONSTRAINT `documentos_station_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_station` ADD CONSTRAINT `documentos_station_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_switch` ADD CONSTRAINT `documentos_switch_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_switch` ADD CONSTRAINT `documentos_switch_switchiesId_fkey` FOREIGN KEY (`switchiesId`) REFERENCES `Switchies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_telemetria` ADD CONSTRAINT `documentos_telemetria_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_telemetria` ADD CONSTRAINT `documentos_telemetria_telemetriaId_fkey` FOREIGN KEY (`telemetriaId`) REFERENCES `Telemetria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_torre` ADD CONSTRAINT `documentos_torre_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_torre` ADD CONSTRAINT `documentos_torre_torreId_fkey` FOREIGN KEY (`torreId`) REFERENCES `Torre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_transmissor` ADD CONSTRAINT `documentos_transmissor_documentoId_fkey` FOREIGN KEY (`documentoId`) REFERENCES `documentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos_transmissor` ADD CONSTRAINT `documentos_transmissor_transmissorId_fkey` FOREIGN KEY (`transmissorId`) REFERENCES `Transmissor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
