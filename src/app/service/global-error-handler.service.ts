import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor(private toastService:ToastrService) { }


  handleError(errorRes) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }

    errorMessage = errorRes.error.message;
    this.toastService.error(errorMessage);
    
    return throwError(errorMessage);
  }
}
