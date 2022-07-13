import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReposService } from './repos.service';
import { Todo } from '../todos/entities/todo.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [ReposService],
  exports: [ReposService],
})
export class ReposModule {}
