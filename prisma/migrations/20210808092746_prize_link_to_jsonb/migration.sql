/*
  Warnings:

  - The `link` column on the `Prize` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Prize" DROP COLUMN "link",
ADD COLUMN     "link" JSONB;
