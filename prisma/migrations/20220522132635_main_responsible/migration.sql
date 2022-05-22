/*
  Warnings:

  - You are about to drop the column `mainResponsibleId` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `mainResponsibleId` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enterprise" DROP COLUMN "mainResponsibleId";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "mainResponsibleId";

-- AlterTable
ALTER TABLE "Responsible" ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false;
