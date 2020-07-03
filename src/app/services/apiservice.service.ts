import { Injectable } from '@angular/core';
import { catchError, retry} from 'rxjs/internal/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'jwt-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
   API_URL= environment.API_URL;
  constructor(private http: HttpClient) { }
 

  
  getDataforSearch():Observable<HttpResponse<Studentlist[]>> {
    let url = this.API_URL + `/studentList`
    return this.http.get<Studentlist[]>(url, { observe: 'response' });
  }

  getData():Observable<HttpResponse<StudentRecords[]>> {
    let url = this.API_URL + `/getStudents`
    return this.http.get<StudentRecords[]>(url, { observe: 'response' });
  }

}
export class Studentlist {
  name: string;
  id: number;
  email: string;
}

export class StudentRecords {
  name: string;
  id: number;
  email: string;
}
