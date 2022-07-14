import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { BurguerDto } from './burguer.dto';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}
  @Query(() => String)
  async hello() {
    return await this.appService.getHello();
  }
  @Query(() => BurguerDto)
  async burguer() {
    return this.appService.getBurguer();
  }
}
