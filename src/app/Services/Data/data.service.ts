import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/Shared/Models/task';
import { Observable } from 'rxjs';

@Injectable()

export class DataService {

  constructor(private url: string, private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }
  get(id: number): Observable<Task> {
    return this.http.get<Task>(this.url + "/" + id);
  }
  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, JSON.stringify(task), this.httpOptions);
  }
  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(this.url + "/" + id, JSON.stringify(task));
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
