import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from 'backend/Auth/decorators/Roles';
import { UserDetailResponse } from 'backend/User/dto/UserDetailResponse';
import { UserResponse } from 'backend/User/dto/UserResponse';
import { UserUpdateRequest } from 'backend/User/dto/UserUpdateRequest';
import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';
import { UserUpdateNameRequest } from 'backend/User/dto/UserUpdateNameRequest';
import { User as UserDecorator } from 'backend/Auth/decorators/User';

@Controller('/user')
@ApiTags('User')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  /**
   * Маршрут для получения всех пользователей.
   */
  @Get('/')
  @ApiOperation({
    operationId: 'userList',
  })
  @ApiOkResponse({
    type: UserResponse,
    isArray: true,
  })
  @Roles(Role.MODERATOR, Role.ADMIN)
  public async list(): Promise<UserResponse[]> {
    const userList = await this.userService.getList();

    return userList.map((user) => this.getUserResponse(user));
  }

  /**
   * Маршрут для получения конкретного пользователя.
   */
  @Get('/:id')
  @ApiOperation({
    operationId: 'userGet',
  })
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  @Roles(Role.MODERATOR, Role.ADMIN)
  public async get(@Param('id') id: string): Promise<UserDetailResponse> {
    const user = await this.userService.getById(id);

    return this.getUserDetailResponse(user);
  }

  /**
   * Маршрут для обновления имени пользователя.
   */
  @Patch('/update-name')
  @ApiOperation({
    operationId: 'userUpdateName',
  })
  public async updateName(
    @Body() body: UserUpdateNameRequest,
    @UserDecorator() user: User,
  ): Promise<void> {
    await this.userService.addOrUpdateUser({
      ...user,
      ...body,
    });
  }

  /**
   * Маршрут для обновления пользователя.
   */
  @Patch('/:id')
  @ApiOperation({
    operationId: 'userUpdate',
  })
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  @Roles(Role.ADMIN)
  public async update(
    @Body() body: UserUpdateRequest,
    @Param('id') id: string,
  ): Promise<UserDetailResponse> {
    const user = await this.userService.addOrUpdateUser({
      id,
      ...body,
    });

    return this.getUserDetailResponse(user);
  }

  /**
   * Маршрут для удаления пользователя.
   */
  @Delete('/:id')
  @ApiOperation({
    operationId: 'userDelete',
  })
  @Roles(Role.ADMIN)
  public delete(@Param('id') id: string): Promise<void> {
    return this.userService.deleteById(id);
  }

  private getUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      phone: user.phone,
      telegramId: user.telegramId,
      firstName: user.firstName,
      lastName: user.lastName,
      isConfirmed: user.isConfirmed,
    };
  }

  private getUserDetailResponse(user: User): UserDetailResponse {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      phone: user.phone,
      telegramId: user.telegramId,
      firstName: user.firstName,
      lastName: user.lastName,
      isConfirmed: user.isConfirmed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
