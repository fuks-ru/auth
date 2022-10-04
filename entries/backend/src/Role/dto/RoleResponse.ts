import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'backend/User/entities/User';

export class RoleResponse {
  /**
   * Id.
   */
  @ApiProperty()
  // TODO разобраться почему Enum выдает string'и https://github.com/nestjs/swagger/pull/1898
  public id!: Role;

  /**
   * Email.
   */
  @ApiProperty()
  public name!: string;
}
