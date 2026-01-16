import { Body, Controller, Get, Post } from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { RegisterMedicalAppointmentDto } from './dtos/medical-appoinment.dto';

@Controller('medical-appointment')
export class MedicalAppointmentController {
  constructor(private medicalAppointmentService: MedicalAppointmentService) {}

  @Post()
  createAppointment(@Body() body: RegisterMedicalAppointmentDto) {
    return this.medicalAppointmentService.createAppointment(body);
  }

  @Get()
  listAllConsultations() {
    return this.medicalAppointmentService.listAllConsultations();
  }
}
