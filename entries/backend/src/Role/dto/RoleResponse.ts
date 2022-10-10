import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'backend/User/entities/User';

export class RoleResponse {
  /**
   * Id.
   */
  @ApiProperty()
  public id!: Role;

  /**
   * Email.
   */
  @ApiProperty()
  public name!: string;
}
