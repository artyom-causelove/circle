/*
  Warnings:

  - The values [phisical] on the enum `PrizeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PrizeType_new" AS ENUM ('physical', 'special', 'simple');
ALTER TABLE "Prize" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Prize" ALTER COLUMN "type" TYPE "PrizeType_new" USING ("type"::text::"PrizeType_new");
ALTER TYPE "PrizeType" RENAME TO "PrizeType_old";
ALTER TYPE "PrizeType_new" RENAME TO "PrizeType";
DROP TYPE "PrizeType_old";
ALTER TABLE "Prize" ALTER COLUMN "type" SET DEFAULT 'simple';
COMMIT;
