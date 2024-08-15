/*
  Warnings:

  - The values [FINISHED] on the enum `taskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "taskStatus_new" AS ENUM ('TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE');
ALTER TABLE "Activity" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Column" ALTER COLUMN "status" TYPE "taskStatus_new" USING ("status"::text::"taskStatus_new");
ALTER TABLE "Activity" ALTER COLUMN "status" TYPE "taskStatus_new" USING ("status"::text::"taskStatus_new");
ALTER TYPE "taskStatus" RENAME TO "taskStatus_old";
ALTER TYPE "taskStatus_new" RENAME TO "taskStatus";
DROP TYPE "taskStatus_old";
ALTER TABLE "Activity" ALTER COLUMN "status" SET DEFAULT 'TODO';
COMMIT;
