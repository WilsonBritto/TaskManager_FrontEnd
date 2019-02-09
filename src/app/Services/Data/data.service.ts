import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from 'src/app/Shared/Models/itask';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url: string, private http: HttpClient) { }

  getAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.url);
  }
  get(id: number): Observable<ITask> {
    return this.http.get<ITask>(this.url + "/" + id);
  }
  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, JSON.stringify(task));
  }
  update(id: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(this.url + "/" + id, JSON.stringify(task));
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
