import { Module } from '@nestjs/common';
import { MedicalProfessionalController } from './medical-professional.controller';
import { MedicalProfessionalService } from './medical-professional.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MedicalProfessionalController],
  providers: [MedicalProfessionalService, PrismaService],
})
export class MedicalProfessionalModule {}
