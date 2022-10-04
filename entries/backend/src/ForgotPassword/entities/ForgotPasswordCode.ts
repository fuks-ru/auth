import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import type { User } from 'backend/User/entities/User';

@Entity({ name: 'forgot-password-codes' })
@Unique(['user'])
export class ForgotPasswordCode {
  /**
   * ID.
   */
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  /**
   * Значение кода подтверждения.
   */
  @Column()
  public value!: string;

  /**
   * Пользователь.
   */
  @OneToOne('User', 'forgotPassword', {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user!: User;

  /**
   * Время обновления.
   */
  @UpdateDateColumn()
  public updatedAt!: Date;
}
