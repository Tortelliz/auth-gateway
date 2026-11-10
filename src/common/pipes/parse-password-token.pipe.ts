import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePasswordTokenPipe implements PipeTransform {
  transform(token: string) {
    if (token.length != 6) throw new BadRequestException('Invalid token');
    return token;
  }
}
