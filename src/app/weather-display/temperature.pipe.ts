import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || isNaN(value)) {
      return '--';
    }
    return Math.round(value).toString();
  }
}