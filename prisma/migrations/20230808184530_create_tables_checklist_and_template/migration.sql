-- CreateTable
CREATE TABLE `Checklist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,

    UNIQUE INDEX `Checklist_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tarefa` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `verificado` BOOLEAN NOT NULL,
    `foto_verificado` BOOLEAN NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `checklistId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Template` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ChecklistToTemplate` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChecklistToTemplate_AB_unique`(`A`, `B`),
    INDEX `_ChecklistToTemplate_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tarefa` ADD CONSTRAINT `Tarefa_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChecklistToTemplate` ADD CONSTRAINT `_ChecklistToTemplate_A_fkey` FOREIGN KEY (`A`) REFERENCES `Checklist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChecklistToTemplate` ADD CONSTRAINT `_ChecklistToTemplate_B_fkey` FOREIGN KEY (`B`) REFERENCES `Template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
