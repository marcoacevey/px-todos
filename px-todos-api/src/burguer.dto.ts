import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BurguerDto {
  @Field()
  topSliceBun: string;
  @Field()
  letucce: string;
  @Field()
  tomato: string;
  @Field()
  patty: string;
  @Field()
  cheese: string;
  @Field()
  bottonSliceBun: string;
}
