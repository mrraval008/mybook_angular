import { Injectable } from '@angular/core';
// import {  Toaster } from "ngx-toast-notifications";


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
