import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserUpdateNameRequest {
  /**
   * Имя.
   */
  @ApiProperty()
  @IsOptional()
  public firstName?: string;

  /**
   * Фамилия.
   */
  @ApiProperty()
  @IsOptional()
  public lastName?: string;
}
