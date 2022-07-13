import { CreateTodoInputDto } from './create-todo-input.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';

@InputType()
export class UpdateTodoInputDto {
  @AutoMap()
  @Field()
  todoId: number;

  @AutoMap()
  @Field()
  done: boolean;

  @AutoMap()
  @Field()
  todoDesc: string;
}
