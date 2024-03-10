import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  url = 'http://localhost:3000/students';
  constructor(private http: HttpClient) {}
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  addStudent(data: Student) {
    return this.http.post<any>(this.url, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }

  updateStudent(student: Student):Observable<any>{
    return this.http.put<any>(this.url + '/' +student._id ,student );
  }
}
