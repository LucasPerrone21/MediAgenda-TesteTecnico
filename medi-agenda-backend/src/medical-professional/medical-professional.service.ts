import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterMedicalProfessionalDto } from './dtos/register-medical-professional.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Specialty } from 'generated/prisma.db/enums';

@Injectable()
export class MedicalProfessionalService {
  constructor(private prisma: PrismaService) {}

  async registerMedicalProfessional(data: RegisterMedicalProfessionalDto) {
    const existingProfessional =
      await this.prisma.medicalProfessional.findUnique({
        where: {
          crm: data.crm,
        },
      });

    if (existingProfessional) {
      throw new UnauthorizedException(
        'Medical professional with this CRM already exists.',
      );
    }

    const newProfessional = await this.prisma.medicalProfessional.create({
      data: {
        name: data.name,
        crm: data.crm,
        specialty: data.specialty,
      },
    });

    return newProfessional;
  }

  async listBySpecialty(specialty: string) {
    return await this.prisma.medicalProfessional.findMany({
      where: { specialty: specialty as Specialty },
    });
  }

  getSpecialties() {
    return Object.keys(Specialty);
  }

  async listAll() {
    const professionals = await this.prisma.medicalProfessional.findMany();

    const formattedProfessionals = professionals.map((prof) => ({
      id: prof.id,
      name: prof.name,
      crm: prof.crm,
      specialty: prof.specialty,
    }));

    return formattedProfessionals;
  }
}
