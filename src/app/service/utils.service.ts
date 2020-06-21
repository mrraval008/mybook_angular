import { Injectable } from '@angular/core';
// import {  Toaster } from "ngx-toast-notifications";


export interface responseData{
  status:String,
  data:any
}

@Injectable({
  providedIn: 'root'
})


export class UtilsService {

  constructor() { }

  setLocaleStorageData(obj){
    for(let key in obj){
      localStorage.setItem(key,obj[key])
    }
  }

  getLocalStorageData(key){
   return localStorage.getItem(key)
  }
  removeLocalStorage(key){
    localStorage.removeItem(key)
  }

  isEmpty(obj){
    if (typeof obj == 'number' || typeof obj == 'boolean') {
      return false;
    }

    if (obj == "") {
      return true;
    }

    for (var x in obj) {
      return false;
    }

    return true;
  }

  // showSuccess() {
  //   this.toast.success('Hello world!nndb sakndakjdndn sadnakjdn adsa', 'Toastr fun!', {
  //     timeOut: 200000
  //   });
  // }
  // showError() {
  //   this.toast.error('everything is broken', 'Major Error', {
  //     timeOut: 3000
  //   });
  // }
  // showWarning() {
  //   this.toast.warning('everything is broken', 'Major Error', {
  //     timeOut: 3000
  //   });
  // }
  // showInfo() {
  //   this.toast.info('everything is broken', 'Major Error', {
  //     timeOut: 3000
  //   });
  // }

}
