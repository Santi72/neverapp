import { Pipe, PipeTransform } from '@angular/core';
import { ProductoModel } from '../../models/producto-model';

/**
 * Generated class for the KeysPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {

  transform( value: any) {

    let keys = [];
    for( let key in value ){     
      keys.push(key);
    }
    return keys  

  }
}
