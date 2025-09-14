-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(110) NOT NULL,
    `password` VARCHAR(110) NOT NULL,
    `role` ENUM('ADMIN', 'MANAGING_DIRECTOR', 'FINANCE', 'HEAD_OF_DIVISION', 'MANAGER') NOT NULL DEFAULT 'MANAGER',
    `department_id` INTEGER NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `user_fk_1`(`email`),
    INDEX `user_fk_2`(`department_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(155) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `budgets` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(20, 2) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `year` YEAR NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `budgets_fk_1`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `budget_details` (
    `id` VARCHAR(191) NOT NULL,
    `budget_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    INDEX `budget_detail_fk_1`(`budget_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `budgets` ADD CONSTRAINT `budgets_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `budget_details` ADD CONSTRAINT `budget_details_budget_id_fkey` FOREIGN KEY (`budget_id`) REFERENCES `budgets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
