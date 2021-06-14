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
export class OrderService {

  constructor(
    private http: HttpClient,
    private authInfoService: AuthInfoService
  ) { }

  public getOrderList(): Observable<HttpResponse<IResponse>> {
    return this.http
      .get<IResponse>(
        `${environment.API_URL}orders/list?userID=${
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

  public createOrder(order: {
    orderNumber: string;
    orderDate: string;
    customerName: string;
    isTaxed: boolean;
  }): Observable<HttpResponse<IResponse>> {
    return this.http
      .post<IResponse>(
        `${environment.API_URL}orders/create?userID=${
          this.authInfoService.getDecodedToken().id
        }`,
        order,
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

  public getOrderIDDetail(orderID: string): Observable<HttpResponse<IResponse>> {
    return this.http
      .get<IResponse>(
        `${environment.API_URL}orders/${orderID}/detail?userID=${
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

  public addOrderIDProduct(
    orderID: string,
    orderProduct: { quantity: number; UOM: string }
  ): Observable<HttpResponse<IResponse>> {
    return this.http
      .post<IResponse>(
        `${environment.API_URL}orders/${orderID}/add-product?userID=${
          this.authInfoService.getDecodedToken().id
        }`,
        orderProduct,
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

  public editOrderStatus(
    orderID: string,
    status: string,
    canceledReason: string,
  ): Observable<HttpResponse<IResponse>> {
    return this.http
      .put<IResponse>(
        `${environment.API_URL}orders/${orderID}/edit-status?userID=${
          this.authInfoService.getDecodedToken().id
        }&&status=${status}&&canceledReason=${canceledReason}`,
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
