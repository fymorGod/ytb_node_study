/*
  Warnings:

  - You are about to drop the column `acessId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `acess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_acessId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `acessId`,
    ADD COLUMN `accessId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `acess`;

-- CreateTable
CREATE TABLE `Access` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Access_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_accessId_fkey` FOREIGN KEY (`accessId`) REFERENCES `Access`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
