import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardMask'
})
export class CardNumberPipe implements PipeTransform {

  transform(cardNumber: string): string{
    if (!cardNumber || cardNumber.length < 8) return cardNumber
    const visibleEnd = cardNumber.slice(-4);
    const maskedSection = '*'.repeat(cardNumber.length - 4);

    const groupedMasked = maskedSection.match(/.{1,4}/g)?.join(' ') ?? '';

    return `${groupedMasked} ${visibleEnd}`;
  }

}
