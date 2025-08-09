/*
  Warnings:

  - You are about to drop the column `completedAt` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryId` on the `offerings` table. All the data in the column will be lost.
  - You are about to drop the `inventories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_applications` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payment` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `offerings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."inventories" DROP CONSTRAINT "inventories_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."job_applications" DROP CONSTRAINT "job_applications_jobId_fkey";

-- DropForeignKey
ALTER TABLE "public"."job_applications" DROP CONSTRAINT "job_applications_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."offerings" DROP CONSTRAINT "offerings_inventoryId_fkey";

-- AlterTable
ALTER TABLE "public"."jobs" DROP COLUMN "completedAt",
ADD COLUMN     "payment" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."offerings" DROP COLUMN "inventoryId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "newNotifications" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifications" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "public"."inventories";

-- DropTable
DROP TABLE "public"."job_applications";

-- CreateTable
CREATE TABLE "public"."_JobApplications" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JobApplications_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JobApplications_B_index" ON "public"."_JobApplications"("B");

-- AddForeignKey
ALTER TABLE "public"."offerings" ADD CONSTRAINT "offerings_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_JobApplications" ADD CONSTRAINT "_JobApplications_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_JobApplications" ADD CONSTRAINT "_JobApplications_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
