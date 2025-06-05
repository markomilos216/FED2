import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ccvMask'
})
export class CardCcvPipe implements PipeTransform {

  transform(value: string | number): string {
    return value ? '***' : '';
  }

}
