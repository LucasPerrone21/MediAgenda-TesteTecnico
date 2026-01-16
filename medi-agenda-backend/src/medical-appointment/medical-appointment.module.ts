import { Module } from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MedicalAppointmentService, PrismaService],
  controllers: [MedicalAppointmentController],
})
export class MedicalAppointmentModule {}
