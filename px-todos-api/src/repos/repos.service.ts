import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../todos/entities/todo.entity';

@Injectable()
export class ReposService {
  constructor(
    @InjectRepository(Todo) public readonly todosRepo: Repository<Todo>,
  ) {}
}
