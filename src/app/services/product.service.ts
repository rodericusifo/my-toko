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
export class ProductService {
  constructor(
    private http: HttpClient,
    private authInfoService: AuthInfoService
  ) {}

  public getProductList(): Observable<HttpResponse<IResponse>> {
    return this.http
      .get<IResponse>(
        `${environment.API_URL}products/list?userID=${
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

  public createProduct(product: {
    name: string;
    code: string;
    Brand: string;
    image: File;
  }): Observable<HttpResponse<IResponse>> {
    let formData: any = new FormData();
    formData.append('name', product.name);
    formData.append('code', product.code);
    formData.append('Brand', product.Brand);
    formData.append('image', product.image);

    return this.http
      .post<IResponse>(
        `${environment.API_URL}products/create?userID=${
          this.authInfoService.getDecodedToken().id
        }`,
        formData,
        {
          headers: new HttpHeaders({
            Authorization: this.authInfoService.getAuth()!,
          }),
          observe: 'response',
        }
      )
      .pipe(catchError(this.handlingError));
  }

  public editProduct(
    productID: string,
    product: {
      name: string;
      code: string;
      image: File;
    }
  ): Observable<HttpResponse<IResponse>> {
    let formData: any = new FormData();
    formData.append('name', product.name);
    formData.append('code', product.code);
    formData.append('image', product.image);

    return this.http
      .put<IResponse>(
        `${environment.API_URL}products/${productID}/edit?userID=${
          this.authInfoService.getDecodedToken().id
        }`,
        formData,
        {
          headers: new HttpHeaders({
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
