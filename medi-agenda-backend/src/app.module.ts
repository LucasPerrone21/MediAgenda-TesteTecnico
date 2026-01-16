import { Module } from '@nestjs/common';
import { MedicalProfessionalModule } from './medical-professional/medical-professional.module';
import { PrismaService } from './prisma/prisma.service';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';

@Module({
  imports: [MedicalProfessionalModule, MedicalAppointmentModule],
  providers: [PrismaService],
})
export class AppModule {}
