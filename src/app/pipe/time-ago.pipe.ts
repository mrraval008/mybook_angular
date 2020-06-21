import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    const intervals = {
      'year': 31536000,
      'month': 2592000,
      'week': 604800,
      'day': 86400,
      'hour': 3600,
      'minute': 60,
      'second': 1
    };
    let dateVal = new Date(value);
    // let dateISOStr = new Date(new Date(value).toISOString());
    let seconds = Math.floor((((new Date()).getTime()) - (dateVal.getTime())) / 1000);
    let output = "";
    if (seconds < 29) {
      return 'Just Now';
    }
    for (let key in intervals) {
      let _val = Math.floor(seconds / intervals[key])
      if (_val > 0) {
        if (key == 'day' && _val == 1) {
          output = "yesterday";
          break;
        }
        if (_val > 1) {
          output = `${_val} ${key}s ago`;
        } else {
          output = `${_val} ${key} ago`;
        }
        if (key == 'day' || key == 'week' || key == 'month' || key == 'year') {
          output = `${dateVal.toDateString()} at ${dateVal.getHours()}:${dateVal.getMinutes()} `
          break;
        }
        break;
      }
    }
    return output
  }

}
