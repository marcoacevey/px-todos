import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosResolver } from './todos.resolver';
import { TodoProfile } from './profiles/todo.profile';
@Module({
  providers: [TodosResolver, TodoProfile, TodosService],
})
export class TodosModule {}
