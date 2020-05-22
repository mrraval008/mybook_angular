import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor() { }


  handleError(errorRes) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }

    errorMessage = errorRes.error.message;
    
    return throwError(errorMessage);
  }
}
