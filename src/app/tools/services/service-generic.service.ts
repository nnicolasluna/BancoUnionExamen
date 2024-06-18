import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Observable, catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceGenericService<T> {
  private baseUrl= environment.apiBaseUrl

  constructor(private http:HttpClient) { }

  getAll(resourceUrl: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + resourceUrl).pipe(
      catchError((error) => {
        console.error(error);
        return of([])
      })
    );;
  }
  getAllbyOne(resourceUrl: string, id: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${resourceUrl}/${id}`).pipe(
      catchError((error) => {
        console.log(error)
        return of()
      })
    );
  }
  getOne(resourceUrl: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${resourceUrl}/${id}`).pipe(
      catchError((error) => {
        console.log(error)
        return of()
      })
    );
  }
  create(resourceUrl: string, data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + resourceUrl, data);
  }
  update(resourceUrl: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${resourceUrl}`, data);
  }

  delete(resourceUrl: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${resourceUrl}/${id}`);
  }
}
