import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RegisterMedicalProfessionalDto } from './dtos/register-medical-professional.dto';
import { MedicalProfessionalService } from './medical-professional.service';

@Controller('medical-professional')
export class MedicalProfessionalController {
  constructor(private medicalProfessionalService: MedicalProfessionalService) {}

  @Post()
  async registerMedicalProfessional(
    @Body() body: RegisterMedicalProfessionalDto,
  ) {
    return await this.medicalProfessionalService.registerMedicalProfessional(
      body,
    );
  }

  @Get()
  async listAllMedicalProfessionals() {
    return await this.medicalProfessionalService.listAll();
  }

  @Get('by-specialty/:specialty')
  async listMedicalProfessionalsBySpecialty(
    @Param('specialty') specialty: string,
  ) {
    return await this.medicalProfessionalService.listBySpecialty(specialty);
  }

  @Get('specialties')
  async getSpecialties() {
    return await this.medicalProfessionalService.getSpecialties();
  }
}
