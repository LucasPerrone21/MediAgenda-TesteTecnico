-- CreateTable
CREATE TABLE "MedicalProfessional" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "MedicalProfessional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalAppointmant" (
    "id" SERIAL NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "patientName" TEXT NOT NULL,
    "medicalProfessionalId" INTEGER NOT NULL,

    CONSTRAINT "MedicalAppointmant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalProfessional_crm_key" ON "MedicalProfessional"("crm");

-- AddForeignKey
ALTER TABLE "MedicalAppointmant" ADD CONSTRAINT "MedicalAppointmant_medicalProfessionalId_fkey" FOREIGN KEY ("medicalProfessionalId") REFERENCES "MedicalProfessional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
