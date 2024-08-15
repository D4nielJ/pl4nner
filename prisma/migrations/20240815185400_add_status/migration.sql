/*
  Warnings:

  - The `priority` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `order` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "taskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "taskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'BLOCKED', 'FINISHED');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "status" "taskStatus" NOT NULL DEFAULT 'TODO',
DROP COLUMN "priority",
ADD COLUMN     "priority" "taskPriority" NOT NULL DEFAULT 'MEDIUM';

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "status" "taskStatus" NOT NULL;

-- DropEnum
DROP TYPE "activityPriority";
