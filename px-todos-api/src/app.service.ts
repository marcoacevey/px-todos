import { Injectable } from '@nestjs/common';
import { BurguerDto } from './burguer.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public getBurguer(): BurguerDto {
    let burguer = new BurguerDto();
    burguer.topSliceBun = 'Autraliano';
    burguer.cheese = 'Prato';
    burguer.patty = 'Alcatra';
    burguer.letucce = 'Alface Lisa';
    burguer.tomato = 'Tomate Italiano';
    burguer.bottonSliceBun = 'Autraliano';

    return burguer;
  }
}
