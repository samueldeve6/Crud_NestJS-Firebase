import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsISO8601 } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => (typeof value === 'string' && value.trim() === '' ? undefined : value))
  fechaDeCreacion?: string = new Date().toISOString();
}
