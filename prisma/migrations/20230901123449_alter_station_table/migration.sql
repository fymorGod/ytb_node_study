-- AlterTable
ALTER TABLE `quadro` ADD COLUMN `stationId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Quadro` ADD CONSTRAINT `Quadro_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
