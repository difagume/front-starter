import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinimagen'
})
export class SinimagenPipe implements PipeTransform {

  transform(imagenes: any[]): any {
    const noimage = 'assets/images/lunch-box.png';
    // if (!imagenes) {
    return noimage;
    // }
    return (imagenes.length > 0) ? imagenes[1].url : noimage;
  }
}
