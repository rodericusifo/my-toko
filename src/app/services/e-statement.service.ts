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
export class EStatementService {

  constructor(
    private http: HttpClient,
    private authInfoService: AuthInfoService
  ) { }

  public getEStatementDetail(): Observable<HttpResponse<IResponse>> {
    return this.http
      .get<IResponse>(
        `${environment.API_URL}e-statement/detail?userID=${
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

  private handlingError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
