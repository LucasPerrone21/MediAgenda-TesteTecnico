import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterMedicalAppointmentDto } from './dtos/medical-appoinment.dto';

@Injectable()
export class MedicalAppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(data: RegisterMedicalAppointmentDto) {
    const actualDate = new Date();
    const appointmentDate = new Date(data.appointmentDate);

    if (actualDate > appointmentDate) {
      throw new HttpException(
        'The appointment date must be in the future',
        400,
      );
    }
    const medicalProfessional =
      await this.prisma.medicalProfessional.findUnique({
        where: { id: data.medicalProfessionalId },
      });

    if (!medicalProfessional) {
      throw new HttpException('Medical professional not found', 404);
    }

    return await this.prisma.medicalAppointment.create({
      data: {
        patientName: data.patientName,
        medicalProfessionalId: data.medicalProfessionalId,
        appointmentDate: appointmentDate,
      },
    });
  }

  async listAllConsultations() {
    const response = await this.prisma.medicalAppointment.findMany({
      select: {
        id: true,
        patientName: true,
        appointmentDate: true,
        medicalProfessional: {
          select: {
            id: true,
            name: true,
            specialty: true,
          },
        },
      },
    });

    const consultations = response.map((consultation) => ({
      id: consultation.id,
      patientName: consultation.patientName,
      appointmentDate: consultation.appointmentDate,
      medicalProfessional: {
        id: consultation.medicalProfessional.id,
        name: consultation.medicalProfessional.name,
        specialty: consultation.medicalProfessional.specialty,
      },
    }));

    return consultations;
  }
}
