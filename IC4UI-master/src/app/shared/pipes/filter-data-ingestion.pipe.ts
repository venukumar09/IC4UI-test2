import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDataIngestion'
})
export class FilterDataIngestionPipe implements PipeTransform {

  transform(items: any[], args: any, searchFor:any): any {
    const searchText = args.toLowerCase();
     if(args !== undefined && args !== null && args.trim() !== ''){
       return items.filter(x => x[searchFor].toLowerCase().includes(searchText))
     } else {
       return items;
     }
   }
}
 