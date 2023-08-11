-- CreateTable
CREATE TABLE `Documents` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `antenaId` VARCHAR(191) NOT NULL,
    `arcondicionadoId` VARCHAR(191) NOT NULL,
    `nobreakId` VARCHAR(191) NOT NULL,
    `switchiesId` VARCHAR(191) NOT NULL,
    `telemetriaId` VARCHAR(191) NOT NULL,
    `tarefaId` VARCHAR(191) NOT NULL,
    `disjuntorId` VARCHAR(191) NOT NULL,
    `stationId` VARCHAR(191) NOT NULL,
    `caboId` VARCHAR(191) NOT NULL,
    `combinadorId` VARCHAR(191) NOT NULL,
    `dpsId` VARCHAR(191) NOT NULL,
    `exaustorId` VARCHAR(191) NOT NULL,
    `receptorId` VARCHAR(191) NOT NULL,
    `parabolicaId` VARCHAR(191) NOT NULL,
    `torreId` VARCHAR(191) NOT NULL,
    `transmissorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_antenaId_fkey` FOREIGN KEY (`antenaId`) REFERENCES `Antena`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_arcondicionadoId_fkey` FOREIGN KEY (`arcondicionadoId`) REFERENCES `Arcondicionado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_nobreakId_fkey` FOREIGN KEY (`nobreakId`) REFERENCES `Nobreak`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_switchiesId_fkey` FOREIGN KEY (`switchiesId`) REFERENCES `Switchies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_telemetriaId_fkey` FOREIGN KEY (`telemetriaId`) REFERENCES `Telemetria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_tarefaId_fkey` FOREIGN KEY (`tarefaId`) REFERENCES `Tarefa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_disjuntorId_fkey` FOREIGN KEY (`disjuntorId`) REFERENCES `Disjuntor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_caboId_fkey` FOREIGN KEY (`caboId`) REFERENCES `Cabo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_combinadorId_fkey` FOREIGN KEY (`combinadorId`) REFERENCES `Combinador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_dpsId_fkey` FOREIGN KEY (`dpsId`) REFERENCES `Dps`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_exaustorId_fkey` FOREIGN KEY (`exaustorId`) REFERENCES `Exaustor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_receptorId_fkey` FOREIGN KEY (`receptorId`) REFERENCES `Receptor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_parabolicaId_fkey` FOREIGN KEY (`parabolicaId`) REFERENCES `Parabolica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_torreId_fkey` FOREIGN KEY (`torreId`) REFERENCES `Torre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_transmissorId_fkey` FOREIGN KEY (`transmissorId`) REFERENCES `Transmissor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
