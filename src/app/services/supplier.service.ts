import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response-interface';
import { AuthInfoService } from './auth-info.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private http: HttpClient,
    private authInfoService: AuthInfoService
  ) { }

  public getSupplierList(): Observable<HttpResponse<IResponse>> {
    return this.http
      .get<IResponse>(
        `${environment.API_URL}suppliers/list?userID=${
          this.authInfoService.getDecodedToken().id
        }`,
        {
          headers: new HttpHeaders({
            Authorization: this.authInfoService.getAuth()!,
          }),
          responseType: 'json',
          observe: 'response',
        }
      )
      .pipe(catchError(this.handlingError));
  }

  public createSupplier(supplier: {
    name: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    discount: number;
  }): Observable<HttpResponse<IResponse>> {
    return this.http
      .post<IResponse>(
        `${environment.API_URL}suppliers/create?userID=${
          this.authInfoService.getDecodedToken().id
        }`,
        supplier,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.authInfoService.getAuth()!,
          }),
          observe: 'response',
        }
      )
      .pipe(catchError(this.handlingError));
  }

  private handlingError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
