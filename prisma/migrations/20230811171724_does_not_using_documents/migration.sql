/*
  Warnings:

  - You are about to drop the `documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_antenaId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_arcondicionadoId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_caboId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_combinadorId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_disjuntorId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_dpsId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_exaustorId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_nobreakId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_parabolicaId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_receptorId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_stationId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_switchiesId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_tarefaId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_telemetriaId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_torreId_fkey`;

-- DropForeignKey
ALTER TABLE `documents` DROP FOREIGN KEY `Documents_transmissorId_fkey`;

-- DropTable
DROP TABLE `documents`;
