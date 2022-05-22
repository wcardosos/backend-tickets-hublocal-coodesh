/*
  Warnings:

  - You are about to drop the column `address` on the `Responsible` table. All the data in the column will be lost.
  - Added the required column `city` to the `Responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Responsible` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `Responsible` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Responsible" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL;
