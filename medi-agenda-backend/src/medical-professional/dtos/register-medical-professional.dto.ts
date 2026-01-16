/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';

export enum MedicalSpecialty {
  CARDIOLOGY = 'CARDIOLOGY',
  DERMATOLOGY = 'DERMATOLOGY',
  PEDIATRICS = 'PEDIATRICS',
  ORTHOPEDICS = 'ORTHOPEDICS',
  NEUROLOGY = 'NEUROLOGY',
}

export class RegisterMedicalProfessionalDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'name cannot be empty or whitespace' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'crm cannot be empty or whitespace' })
  crm: string;

  @IsEnum(MedicalSpecialty, {
    message: `specialty must be one of: ${Object.values(MedicalSpecialty).join(', ')}`,
  })
  specialty: MedicalSpecialty;
}
