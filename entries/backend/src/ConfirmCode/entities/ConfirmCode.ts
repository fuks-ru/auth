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

@Entity({ name: 'confirm-codes' })
@Unique(['user'])
export class ConfirmCode {
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
  @OneToOne('User', 'confirmCode', {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user!: User;

  /**
   * Данные для подтверждения.
   */
  @Column()
  public data!: string;

  /**
   * Время обновления.
   */
  @UpdateDateColumn()
  public updatedAt!: Date;
}
