/*
  Warnings:

  - Changed the type of `specialty` on the `MedicalProfessional` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Specialty" AS ENUM ('CARDIOLOGY', 'DERMATOLOGY', 'PEDIATRICS', 'ORTHOPEDICS', 'NEUROLOGY');

-- AlterTable
ALTER TABLE "MedicalProfessional" DROP COLUMN "specialty",
ADD COLUMN     "specialty" "Specialty" NOT NULL;
