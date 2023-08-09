-- AlterTable
ALTER TABLE `antena` ADD COLUMN `stationId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Arcondicionado` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `potencia` INTEGER NOT NULL,
    `tensao` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Arcondicionado_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cabo` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `tipos_cabo` ENUM('C_7_8', 'C_15_8', 'C_31_8') NOT NULL,
    `tamanho` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Cabo_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Combinador` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Combinador_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disjuntor` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `corrente_maxima` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Disjuntor_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dps` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `classe_dps` ENUM('D_1', 'D_2', 'D_3') NOT NULL,
    `corrente_maxima` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Dps_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exaustor` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Exaustor_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nobreak` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `tensao_entrada` INTEGER NOT NULL,
    `tensao_saida` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Nobreak_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parabolica` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `diametro` DOUBLE NOT NULL,
    `satelite` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Parabolica_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Receptor` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `frequencia` INTEGER NOT NULL,
    `symbol_rate` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `parabolicaId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Receptor_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Station` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `link_grafana` VARCHAR(191) NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Station_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Switchies` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `qtd_portas` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Switchies_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telemetria` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Telemetria_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Torre` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `tipo_torre` ENUM('AUTOPORTANTE', 'ESTAIADA') NOT NULL,
    `aterramento` BOOLEAN NOT NULL,
    `altura` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Torre_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transmissor` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `categoria` ENUM('REFRIGERACAO', 'ELETRICA', 'TELEMETRIA', 'IRRADIACAO') NOT NULL,
    `status` ENUM('FUNCIONANDO', 'STAND_BY', 'DEFEITO', 'MANUTENCAO') NOT NULL,
    `programmed` DOUBLE NOT NULL,
    `canal_fisico` DOUBLE NOT NULL,
    `canal_virtual` DOUBLE NOT NULL,
    `acoplador_one` VARCHAR(191) NOT NULL,
    `acoplador_two` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `antenaId` VARCHAR(191) NULL,
    `tipoEquipamentoId` VARCHAR(191) NULL,
    `stationId` VARCHAR(191) NULL,
    `receptorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Transmissor_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Antena` ADD CONSTRAINT `Antena_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arcondicionado` ADD CONSTRAINT `Arcondicionado_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arcondicionado` ADD CONSTRAINT `Arcondicionado_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cabo` ADD CONSTRAINT `Cabo_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cabo` ADD CONSTRAINT `Cabo_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Combinador` ADD CONSTRAINT `Combinador_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Combinador` ADD CONSTRAINT `Combinador_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disjuntor` ADD CONSTRAINT `Disjuntor_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disjuntor` ADD CONSTRAINT `Disjuntor_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dps` ADD CONSTRAINT `Dps_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dps` ADD CONSTRAINT `Dps_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exaustor` ADD CONSTRAINT `Exaustor_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exaustor` ADD CONSTRAINT `Exaustor_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nobreak` ADD CONSTRAINT `Nobreak_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nobreak` ADD CONSTRAINT `Nobreak_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parabolica` ADD CONSTRAINT `Parabolica_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parabolica` ADD CONSTRAINT `Parabolica_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptor` ADD CONSTRAINT `Receptor_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptor` ADD CONSTRAINT `Receptor_parabolicaId_fkey` FOREIGN KEY (`parabolicaId`) REFERENCES `Parabolica`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receptor` ADD CONSTRAINT `Receptor_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Switchies` ADD CONSTRAINT `Switchies_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Switchies` ADD CONSTRAINT `Switchies_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telemetria` ADD CONSTRAINT `Telemetria_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telemetria` ADD CONSTRAINT `Telemetria_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torre` ADD CONSTRAINT `Torre_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Torre` ADD CONSTRAINT `Torre_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transmissor` ADD CONSTRAINT `Transmissor_receptorId_fkey` FOREIGN KEY (`receptorId`) REFERENCES `Receptor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transmissor` ADD CONSTRAINT `Transmissor_antenaId_fkey` FOREIGN KEY (`antenaId`) REFERENCES `Antena`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transmissor` ADD CONSTRAINT `Transmissor_tipoEquipamentoId_fkey` FOREIGN KEY (`tipoEquipamentoId`) REFERENCES `TipoEquipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transmissor` ADD CONSTRAINT `Transmissor_stationId_fkey` FOREIGN KEY (`stationId`) REFERENCES `Station`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
