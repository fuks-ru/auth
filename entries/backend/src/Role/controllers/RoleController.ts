import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from '@nestjs/passport';

import { RoleResponse } from 'backend/Role/dto/RoleResponse';
import { Role } from 'backend/User/entities/User';

@Controller('/role')
@ApiTags('Role')
export class RoleController {
  /**
   * Маршрут.
   */
  @Get('/')
  @ApiOperation({
    operationId: 'roleList',
  })
  @ApiOkResponse({
    type: RoleResponse,
    isArray: true,
  })
  @UseGuards(AuthGuard('auth-jwt'))
  public get(@I18n() i18n: I18nContext): RoleResponse[] {
    return [
      { id: Role.ADMIN, name: i18n.t('admin') },
      { id: Role.USER, name: i18n.t('user') },
      { id: Role.MODERATOR, name: i18n.t('moderator') },
    ];
  }
}
