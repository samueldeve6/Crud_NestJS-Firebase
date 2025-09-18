import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  estado: string;

  @ApiProperty({required: false})

  fechaDeCreacion?: string = new Date().toISOString();
}
