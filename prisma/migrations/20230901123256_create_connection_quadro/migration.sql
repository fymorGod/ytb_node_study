-- AlterTable
ALTER TABLE `quadro` ADD COLUMN `tipoEquipamentoId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Quadro` ADD CONSTRAINT `Quadro_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
