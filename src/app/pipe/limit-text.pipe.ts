import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText'
})
export class LimitTextPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value.length > args[0]){
      return value.substr(0,args[0]) + '...'
    }
    return value;
  }

}
