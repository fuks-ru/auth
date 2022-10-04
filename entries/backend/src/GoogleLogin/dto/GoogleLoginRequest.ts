import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginRequest {
  /**
   * Токен для авторизации.
   */
  @ApiProperty()
  public accessToken!: string;
}
