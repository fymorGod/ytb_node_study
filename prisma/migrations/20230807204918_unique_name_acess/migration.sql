/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Acess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Acess_name_key` ON `Acess`(`name`);
