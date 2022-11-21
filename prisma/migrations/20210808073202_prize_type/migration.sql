-- CreateEnum
CREATE TYPE "PrizeType" AS ENUM ('phisical', 'special', 'simple');

-- AlterTable
ALTER TABLE "Prize" ADD COLUMN     "type" "PrizeType" NOT NULL DEFAULT E'simple';
