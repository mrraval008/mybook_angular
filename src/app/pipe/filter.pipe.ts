import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let fileterText = args[0];
    let filterField = args[1];
    if(fileterText == ""){
      return value;
    }
    if(value && value.length > 0){
      return value.filter(element => {
        return element[filterField].toLowerCase().includes(fileterText);
      });
    }
    return value;
  }

}
