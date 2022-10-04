import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { ConfirmCode } from 'backend/Register/modules/EmailVerify/entities/ConfirmCode';
import type { ForgotPasswordCode } from 'backend/ForgotPassword/entities/ForgotPasswordCode';

/**
 * Описывает роли пользователя.
 */
export enum Role {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity({ name: 'users' })
export class User {
  /**
   * ID.
   */
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  /**
   * Email.
   */
  @Column({
    unique: true,
  })
  public email!: string;

  /**
   * Подтвержден ли пользователь по email.
   */
  @Column({
    default: false,
  })
  public isConfirmed!: boolean;

  /**
   * Захешированный пароль.
   */
  @Column()
  public hashedPassword!: string;

  /**
   * Роль.
   */
  @Column()
  public role!: Role;

  /**
   * Коды подтверждения.
   */
  @OneToOne('ConfirmCode', 'user')
  public confirmCode?: ConfirmCode;

  /**
   * Коды восстановления пароля.
   */
  @OneToOne('ForgotPasswordCode', 'user')
  public forgotPassword?: ForgotPasswordCode;

  /**
   * Время обновления.
   */
  @UpdateDateColumn()
  public updatedAt!: Date;

  /**
   * Время добавления.
   */
  @CreateDateColumn()
  public createdAt!: Date;
}
