import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiProperty({
    description: 'Name of the menu',
    example: 'Reports',
    required: true,
  })
  @IsString()
  name: string;
}
