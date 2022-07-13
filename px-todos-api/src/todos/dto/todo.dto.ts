import { ObjectType, Field } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';

@ObjectType()
export class TodoDto {
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
