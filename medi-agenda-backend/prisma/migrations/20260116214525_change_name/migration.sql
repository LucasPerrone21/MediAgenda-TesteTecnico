/*
  Warnings:

  - You are about to drop the `MedicalAppointmant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedicalAppointmant" DROP CONSTRAINT "MedicalAppointmant_medicalProfessionalId_fkey";

-- DropTable
DROP TABLE "MedicalAppointmant";

-- CreateTable
CREATE TABLE "MedicalAppointment" (
    "id" SERIAL NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "patientName" TEXT NOT NULL,
    "medicalProfessionalId" INTEGER NOT NULL,

    CONSTRAINT "MedicalAppointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicalAppointment" ADD CONSTRAINT "MedicalAppointment_medicalProfessionalId_fkey" FOREIGN KEY ("medicalProfessionalId") REFERENCES "MedicalProfessional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
