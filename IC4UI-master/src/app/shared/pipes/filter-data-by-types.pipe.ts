import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDataByType',
  pure: true
})
export class FilterDataByTypePipe implements PipeTransform {

  transform(items: any, selectedItems: any, key_name: string, type: string = null): any[] {
    const result = [];

    if (items === undefined) return;

    // returns all items if selectedItems are empty.
    if (items.length === 0 || selectedItems.length === 0) { return items; }

    if (type === 'table') {
      if (items.filteredData !== undefined) {
        items = items.filteredData;
      }
    }

    if (items === undefined) return;

    // returns items based on selected items.
    if (items.length !== 0) {
      for (let i = 0; i < selectedItems.length; i++) {
        items.filter((el: any) => {
          const key = el[key_name]
          if (key !== null && key !== undefined
            && (key.toLowerCase() === selectedItems[i].itemName.toLowerCase())) {
            result.push(el);
          }
        });
      }
      return result;
    }
  }

}
