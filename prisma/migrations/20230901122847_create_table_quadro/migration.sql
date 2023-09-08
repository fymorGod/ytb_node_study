-- AlterTable
ALTER TABLE `disjuntor` ADD COLUMN `quadroId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `dps` ADD COLUMN `quadroId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Quadro` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Quadro_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Disjuntor` ADD CONSTRAINT `Disjuntor_quadroId_fkey` FOREIGN KEY (`quadroId`) REFERENCES `Quadro`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dps` ADD CONSTRAINT `Dps_quadroId_fkey` FOREIGN KEY (`quadroId`) REFERENCES `Quadro`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
