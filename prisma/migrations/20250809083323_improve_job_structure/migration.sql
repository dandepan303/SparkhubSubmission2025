/*
  Warnings:

  - You are about to drop the column `ownerId` on the `offerings` table. All the data in the column will be lost.
  - Added the required column `userId` to the `offerings` table without a default value. This is not possible if the table is not empty.
  - Made the column `jobId` on table `ratings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."offerings" DROP CONSTRAINT "offerings_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ratings" DROP CONSTRAINT "ratings_jobId_fkey";

-- AlterTable
ALTER TABLE "public"."offerings" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ratings" ALTER COLUMN "jobId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ratings" ADD CONSTRAINT "ratings_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."offerings" ADD CONSTRAINT "offerings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
