import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LinkTelegramRequest {
  /**
   * Токен для авторизации.
   */
  @ApiProperty()
  @IsString()
  public hash!: string;

  /**
   * ID в телеграм.
   */
  @ApiProperty()
  @IsNumber()
  public id!: number;

  /**
   * Имя.
   */
  @ApiProperty()
  @IsOptional()
  public first_name?: string;

  /**
   * Имя.
   */
  @ApiProperty()
  @IsOptional()
  public last_name?: string;

  /**
   * Время авторизации.
   */
  @ApiProperty()
  @IsOptional()
  public auth_date?: number;

  /**
   * Фото.
   */
  @ApiProperty()
  @IsOptional()
  public photo_url?: string;

  /**
   * Имя пользователя.
   */
  @ApiProperty()
  @IsOptional()
  public username?: string;
}
