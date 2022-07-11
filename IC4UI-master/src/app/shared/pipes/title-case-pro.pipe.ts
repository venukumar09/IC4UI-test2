import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';


@Pipe({
  name: 'titleCasePro'
})
export class TitleCasePipePro implements PipeTransform {

  transform(item: string): any {
     if(item !== undefined && item !== null){
      return item.split('_').map(_.capitalize).join('_');
     } else {
       return item;
     }
   }
}
