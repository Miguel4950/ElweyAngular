import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domiciliario } from '../models/domiciliario.model';

@Injectable({
  providedIn: 'root',
})
export class DomiciliarioService {
  // 1. Inyección de HttpClient para el CRUD de domiciliarios
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/domiciliarios';

  // http://localhost:8080/domiciliarios/all
  findAll(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/domiciliarios/1
  findById(id: number): Observable<Domiciliario> {
    return this.http.get<Domiciliario>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/domiciliarios/add
  addDomiciliario(domiciliario: Domiciliario): Observable<Domiciliario> {
    return this.http.post<Domiciliario>(`${this.apiUrl}/add`, domiciliario);
  }

  // http://localhost:8080/domiciliarios/update
  updateDomiciliario(domiciliario: Domiciliario): Observable<Domiciliario> {
    return this.http.put<Domiciliario>(`${this.apiUrl}/update`, domiciliario);
  }

  // http://localhost:8080/domiciliarios/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
