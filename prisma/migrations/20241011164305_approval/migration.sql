/*
  Warnings:

  - Added the required column `status` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `budget_details` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `budgets` ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `status` ENUM('PENDING', 'REVIEW', 'APPROVE', 'REJECT') NOT NULL;

-- AlterTable
ALTER TABLE `departments` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `approval` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `step` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `budgetId` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `approval_fk_1`(`budgetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `approval` ADD CONSTRAINT `approval_budgetId_fkey` FOREIGN KEY (`budgetId`) REFERENCES `budgets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
