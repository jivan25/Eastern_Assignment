import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'
import { EmployeeModel } from './Employee/employeeModel';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  GET_EMPLOYEE_URL='http://localhost:3000/data';
  constructor(private httpClient:HttpClient) { }


  getEmployeeDetails():Observable<EmployeeModel[]>{
    return this.httpClient.get(this.GET_EMPLOYEE_URL).pipe(catchError(this.handleError));
  }

  getEmployeeDetailsById(id:number):Observable<EmployeeModel>{
    return this.httpClient.get(this.GET_EMPLOYEE_URL+'/'+id).pipe(catchError(this.handleError));
  }

  addEmployeeDetails(body){
    return this.httpClient.post(this.GET_EMPLOYEE_URL,body).pipe(catchError(this.handleError));
  }

  updateEmployeeDetails(body,id){
    return this.httpClient.put(this.GET_EMPLOYEE_URL+'/'+id,body).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
    } else {
      return throwError(
        error.error.message
      );
    }
  }

}
