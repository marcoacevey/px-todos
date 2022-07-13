import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'todos' })
export class Todo extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({ name: 'todo_id' })
  todoId: number;

  @AutoMap()
  @Column({ default: false, name: 'done' })
  done: boolean;

  @AutoMap()
  @Column({ name: 'todo_desc' })
  todoDesc: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
