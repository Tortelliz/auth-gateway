import { Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
  transform(value: string) {
    const email = value.trim().toLowerCase();
    return isEmail(email);
  }
}
