/*
  Warnings:

  - Added the required column `manutencaoId` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contato` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contato_empresa` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresa` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manutencaoId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checklist` ADD COLUMN `manutencaoId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `station` ADD COLUMN `manutencaoId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `contato` VARCHAR(191) NOT NULL,
    ADD COLUMN `contato_empresa` VARCHAR(191) NOT NULL,
    ADD COLUMN `empresa` VARCHAR(191) NOT NULL,
    ADD COLUMN `manutencaoId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Manutencao` (
    `id` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `tipo` ENUM('PREVENTIVA', 'CORRETIVA') NOT NULL,
    `observacao` VARCHAR(191) NOT NULL,
    `status` ENUM('AGENDADA', 'EM_EXECUCAO', 'EM_AGUARDO', 'FINALIZADA') NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `stationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Manutencao_userId_key`(`userId`),
    UNIQUE INDEX `Manutencao_stationId_key`(`stationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Manutencao` ADD CONSTRAINT `Manutencao_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Manutencao` ADD CONSTRAINT `Manutencao_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_manutencaoId_fkey` FOREIGN KEY (`manutencaoId`) REFERENCES `Manutencao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
