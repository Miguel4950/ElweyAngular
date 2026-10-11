import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional.model';

@Injectable({
  providedIn: 'root',
})
export class AdicionalService {
  // 1. Inyección de HttpClient para gestionar el catálogo de adicionales por REST
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/adicionales';

  // http://localhost:8080/adicionales/all
  findAll(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/adicionales/1
  findById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/adicionales/categoria/1
  findByCategoria(categoriaId: number): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(`${this.apiUrl}/categoria/${categoriaId}`);
  }

  // http://localhost:8080/adicionales/add
  addAdicional(adicional: Adicional, categoriaId?: number): Observable<Adicional> {
    const url = categoriaId
      ? `${this.apiUrl}/add?categoriaId=${categoriaId}`
      : `${this.apiUrl}/add`;
    return this.http.post<Adicional>(url, adicional);
  }

  // http://localhost:8080/adicionales/update
  updateAdicional(adicional: Adicional, categoriaId?: number): Observable<Adicional> {
    const url = categoriaId
      ? `${this.apiUrl}/update?categoriaId=${categoriaId}`
      : `${this.apiUrl}/update`;
    return this.http.put<Adicional>(url, adicional);
  }

  // http://localhost:8080/adicionales/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
