import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response-interface';
import { AuthInfoService } from './auth-info.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private http: HttpClient,
    private authInfoService: AuthInfoService
  ) {}

  public getInvoiceList(): Observable<HttpResponse<IResponse>> {
    return this.http
      .get<IResponse>(
        `${environment.API_URL}invoices/list?userID=${
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

  public createInvoice(Invoice: {
    INVNumber: string;
    INVDate: string;
    POID: string;
  }): Observable<HttpResponse<IResponse>> {
    return this.http
      .post<IResponse>(
        `${environment.API_URL}invoices/create?userID=${
          this.authInfoService.getDecodedToken().id
        }`,
        Invoice,
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

  public editInvoiceStatus(
    invoiceID: string,
    status: string
  ): Observable<HttpResponse<IResponse>> {
    return this.http
      .put<IResponse>(
        `${environment.API_URL}invoices/${invoiceID}/edit-status?userID=${
          this.authInfoService.getDecodedToken().id
        }&&status=${status}`,
        {},
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
