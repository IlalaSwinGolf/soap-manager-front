import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string) {
        var datePipe = new DatePipe("fr");
        value = datePipe.transform(value, 'dd/MM/yyyy, HH:mm:ss');
        return value;
    }
}