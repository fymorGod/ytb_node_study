/*
  Warnings:

  - You are about to drop the `_checklisttotemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_checklisttotemplate` DROP FOREIGN KEY `_ChecklistToTemplate_A_fkey`;

-- DropForeignKey
ALTER TABLE `_checklisttotemplate` DROP FOREIGN KEY `_ChecklistToTemplate_B_fkey`;

-- DropTable
DROP TABLE `_checklisttotemplate`;

-- CreateTable
CREATE TABLE `ChecklistTemplate` (
    `id` VARCHAR(191) NOT NULL,
    `checklistId` VARCHAR(191) NULL,
    `templateId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChecklistTemplate` ADD CONSTRAINT `ChecklistTemplate_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChecklistTemplate` ADD CONSTRAINT `ChecklistTemplate_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
