import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BurguerDto } from './burguer.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('burguer')
  getBurguer(): BurguerDto {
    return this.appService.getBurguer();
  }
}
