-- DropForeignKey
ALTER TABLE `transmissor` DROP FOREIGN KEY `Transmissor_receptorId_fkey`;

-- AlterTable
ALTER TABLE `transmissor` MODIFY `receptorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transmissor` ADD CONSTRAINT `Transmissor_receptorId_fkey` FOREIGN KEY (`receptorId`) REFERENCES `Receptor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
