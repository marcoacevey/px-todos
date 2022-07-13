import { InputType, Field } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';

@InputType()
export class CreateTodoInputDto {
  @AutoMap()
  @Field()
  done: boolean;

  @AutoMap()
  @Field()
  todoDesc: string;
}
