import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterMedicalAppointmentDto {
  @IsNotEmpty()
  patientName: string;

  @IsNotEmpty()
  @IsNumber()
  medicalProfessionalId: number;

  @IsNotEmpty()
  @IsDateString()
  appointmentDate: Date;
}
