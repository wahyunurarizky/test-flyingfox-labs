import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'Name of the menu', example: 'Dashboard' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Depth of the menu', example: 0 })
  @IsInt()
  @Min(0)
  depth: number;

  @ApiProperty({
    description: 'ID of the parent menu (if applicable)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
