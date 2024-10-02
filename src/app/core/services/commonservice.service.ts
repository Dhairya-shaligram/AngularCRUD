// import { Injectable } from '@angular/core';
// import { HttpClient,  HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ApiPostResponse, ApiResponse, BaseApiResponse, CommonPaginationModel, DepartmentResponseModel, EmployeeResponseModel, ForgotPasswordRequestModel } from '../model/common-model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CommonService 
// {
//   readonly apiUrl = 'https://localhost:44361/api';
//   readonly photoUrl = "http://localhost:50306/Photos/";
//   readonly token = localStorage.getItem('authToken');  
//   readonly headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

//   constructor(private http: HttpClient) { }


//   getDepartments(paginationModel: CommonPaginationModel): Observable<ApiResponse<DepartmentResponseModel[]>> {
//     return this.http.post<ApiResponse<DepartmentResponseModel[]>>(`${this.apiUrl}/department/list`, paginationModel, { headers: this.headers });
//   } 

//   getEmployees(paginationModel: CommonPaginationModel): Observable<ApiResponse<EmployeeResponseModel[]>> {
//     return this.http.post<ApiResponse<EmployeeResponseModel[]>>(`${this.apiUrl}/employee/list`, paginationModel, { headers: this.headers });
//   }

//   saveDepartment(formData : FormData): Observable<ApiPostResponse<number>> {
//     return this.http.post<any>(`${this.apiUrl}/department/save`, formData, { headers: this.headers });
//   }

//   changePassword(formData: FormData): Observable<ApiPostResponse<number>> {
//     return this.http.post<any>(`${this.apiUrl}/account/change-password`, formData, { headers: this.headers });
//   }

//   forgotPassword(forgotPasswordRequestModel: ForgotPasswordRequestModel): Observable<BaseApiResponse> {
//     debugger
//     return this.http.post<any>(`${this.apiUrl}/account/forgot-password`, forgotPasswordRequestModel);
//   }
  
//   savEmployee(formData : FormData): Observable<ApiPostResponse<number>> {
//     return this.http.post<any>(`${this.apiUrl}/employee/save`, formData, { headers: this.headers });
//   }

//   GetDepartmentList(): Observable<ApiResponse<DepartmentResponseModel[]>> {
//     return this.http.get<ApiResponse<DepartmentResponseModel[]>>(`${this.apiUrl}/employee/department-list`, { headers: this.headers });
//   }

//   checkDepartmentExist(departmentId: string | null, departmentName: string): Observable<ApiPostResponse<number>> {
//     let params = new HttpParams()
//     .set('departmentName', departmentName);

//     if (departmentId) 
//     {
//       params = params.set('departmentId', departmentId);
//     }
//     return this.http.get<any>(this.apiUrl + '/department/CheckDepartmentExist/', {params, headers: this.headers });
//   }

//   checkEmailIdExist(employeeId: string | null, email: string): Observable<ApiPostResponse<number>> {
//     let params = new HttpParams()
//     .set('email', email);

//     if (employeeId) {
//       params = params.set('employeeId', employeeId);
//     }
//     return this.http.get<any>(this.apiUrl + '/employee/CheckEmployeeEmailExist/', {params, headers: this.headers });
//   }

//   deleteEmployee(employeeId: string): Observable<string> {
//     return this.http.delete<string>(this.apiUrl + '/employee/delete/' + employeeId, { headers: this.headers });
//   }

//   deleteDepartment(departmentId: string): Observable<ApiPostResponse<number>> {
//     return this.http.delete<any>(this.apiUrl + '/department/delete/' + departmentId, { headers: this.headers });
//   }

//   uploadPhoto(photo: any) {
//     return this.http.post(this.apiUrl + 'employee/savefile', photo);
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, of, tap } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { StorageKey } from './storage.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../model/common-model';
import { environment } from 'src/app/environments/environment';
import { NotificationType } from '../enums/common-enum';
import { ApiUrlHelper } from 'src/app/config/api-url-helper';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private key = CryptoJS.enc.Utf8.parse('669DA974-AA2F-1429-AD1A-64FEF721F1FF');
  private iv = CryptoJS.enc.Utf8.parse('669DA974-AA2F-1429-AD1A-64FEF721F1FF');
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private apiUrl: ApiUrlHelper,
    private router: Router,
  ) {}

  doGet(apiUrl: string): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    const loginData = JSON.parse(
      this.Decrypt(localStorage.getItem(StorageKey.loginData)),
    );
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        'Bearer ' + loginData.JWTToken,
      );
    }
    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.get<ApiResponse>(url, httpOptions).pipe(
      tap(() => this.log(`doGet success`)),
      catchError(
        this.handleError<ApiResponse>(`doGet url = ${JSON.stringify(apiUrl)}`, {
          Data: null,
          Message: 'Something went wrong. Please try again after sometime.',
          Success: false,
          TAID: 0,
        }),
      ),
    );
  }

  doPost(apiUrl: string, postData: any): Observable<ApiResponse> {
    debugger
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    const loginData = JSON.parse(
      this.Decrypt(localStorage.getItem(StorageKey.loginData)),
    );
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        'Bearer ' + loginData.JWTToken,
      );
    }

    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData, httpOptions).pipe(
      tap(() => this.log(`doPost success`)),
      catchError(
        this.handleError<ApiResponse>(
          `doPost data = ${JSON.stringify(postData)}`,
          {
            Data: null,
            Message: 'Something went wrong. Please try again after sometime.',
            Success: false,
            TAID: 0,
          },
        ),
      ),
    );
  }

  downloadFile(apiUrl: string): any {
    const httpOptions = {
      headers: new HttpHeaders(),
      responseType: 'blob' as 'json',
    };
    const loginData = JSON.parse(
      this.Decrypt(localStorage.getItem(StorageKey.loginData)),
    );
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        'Bearer ' + loginData.JWTToken,
      );
    }
    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.get(url, httpOptions).pipe(
      tap(() => this.log(`downloadFile success`)),
      catchError(
        this.handleError(
          `downloadFile url = ${JSON.stringify(apiUrl)}`,
          new Blob(),
        ),
      ),
    );
  }

  doDelete(apiUrl: string, idtoDelete: string): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };
    const loginData = JSON.parse(
      this.Decrypt(localStorage.getItem(StorageKey.loginData)),
    );
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        'Bearer ' + loginData.JWTToken,
      );
    }

    const options = {
      headers: httpOptions.headers,
      body: {
        id: idtoDelete,
      },
    };

    const url = `${environment.apiUrl}${apiUrl}`;
    return this.http.delete<ApiResponse>(url, options).pipe(
      tap(() => this.log(`doDelete success`)),
      catchError(
        this.handleError<ApiResponse>(
          `doDelete url = ${JSON.stringify(apiUrl)}`,
          {
            Data: null,
            Message: 'Something went wrong. Please try again after sometime.',
            Success: false,
            TAID: 0,
          },
        ),
      ),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('Log from service : ' + message);
  }

  encodeBase64(plainString: string): string {
    return Buffer.from(plainString, 'ascii').toString('base64');
  }

  decodeBase64(Base64String: string): string {
    if (Base64String) {
      return Buffer.from(Base64String, 'base64').toString('ascii');
    } else {
      return '""';
    }
  }

  public Encrypt(clearText: string): string {
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(clearText),
      this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    return encrypted.toString();
  }

  public Decrypt(cipherText: string | null): string {
    if (cipherText) {
      const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } else {
      return '""';
    }
  }

  showNotification(title: string, message: string, type: NotificationType) {
    const from = 'top',
      align = 'right';

    switch (type) {
      case 1:
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' +
            message +
            '</span>',
          title,
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: 'toast-' + from + '-' + align,
          },
        );
        break;
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' +
            message +
            '</span>',
          title,
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: 'toast-' + from + '-' + align,
          },
        );
        break;
      case 3:
        this.toastr.warning(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' +
            message +
            '</span>',
          title,
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: 'toast-' + from + '-' + align,
          },
        );
        break;
      case 4:
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' +
            message +
            '</span>',
          title,
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            positionClass: 'toast-' + from + '-' + align,
          },
        );
        break;
      case 5:
        this.toastr.show(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' +
            message +
            '</span>',
          title,
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            positionClass: 'toast-' + from + '-' + align,
          },
        );
        break;
      default:
        break;
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  getApiURL(url: string, requestData: any): string {
    if (requestData) {
      const queryParams: string[] = [];
      Object.keys(requestData).forEach((key) => {
        queryParams.push(key + '=' + requestData[key]);
      });
      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }
    }
    return url;
  }

  // New changes
  // public role_rights = [];
  // async getMenuListByRoleId(RoleId: any) {
  //   const apiUrl = this.apiUrl.apiUrl.rolerights.getMenuListByRoleId + RoleId;
  //   const roleRights = await this.doGet(apiUrl).toPromise();
  //   this.role_rights = roleRights.Data;
  // }

  // public checkRoleRights(_url: string, type: string) {
  //   const data = this.role_rights.find(
  //     (x) => x.menuUrl == _url && x.menuUrl != '',
  //   );
  //   if (type == 'add') {
  //     return data && data.isAdd ? true : false;
  //   } else if (type == 'edit') {
  //     return data && data.isEdit ? true : false;
  //   } else if (type == 'delete') {
  //     return data && data.isDelete ? true : false;
  //   }
  //   return false;
  // }

  public byPassLoader(apiUrl: string): boolean {
    if (apiUrl.toLowerCase().includes('dropdown')) {
      return true;
    }
    if (apiUrl.indexOf(this.apiUrl.apiUrl.employee.getDepartmentList) == -1) {
      return false;
    }
    return true;
  }
}
