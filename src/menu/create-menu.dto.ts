import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'Name of the menu', example: 'Dashboard' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the parent menu (if applicable)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
