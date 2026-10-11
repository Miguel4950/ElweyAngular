import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comida } from '../models/comida.model';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  // 1. Inyección de HttpClient para consumir el API REST de Spring Boot
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/comidas';
  private categoriasUrl = 'http://localhost:8080/categorias';

  // http://localhost:8080/comidas/all
  findAll(): Observable<Comida[]> {
    return this.http.get<Comida[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/comidas/1
  findById(id: number): Observable<Comida> {
    return this.http.get<Comida>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/comidas/buscar?q=taco
  buscarPorNombre(query: string): Observable<Comida[]> {
    return this.http.get<Comida[]>(`${this.apiUrl}/buscar?q=${query || ''}`);
  }

  // http://localhost:8080/comidas/add
  addComida(comida: Comida): Observable<Comida> {
    const categoriaId = comida.categoria?.id;
    const url = categoriaId
      ? `${this.apiUrl}/add?categoriaId=${categoriaId}`
      : `${this.apiUrl}/add`;
    return this.http.post<Comida>(url, comida);
  }

  // http://localhost:8080/comidas/update
  updateComida(id: number, comida: Comida): Observable<Comida> {
    comida.id = id;
    const categoriaId = comida.categoria?.id;
    const url = categoriaId
      ? `${this.apiUrl}/update?categoriaId=${categoriaId}`
      : `${this.apiUrl}/update`;
    return this.http.put<Comida>(url, comida);
  }

  // http://localhost:8080/comidas/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // http://localhost:8080/categorias/all
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.categoriasUrl}/all`);
  }

  // http://localhost:8080/categorias/add
  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.categoriasUrl}/add`, categoria);
  }

  // http://localhost:8080/categorias/update
  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.categoriasUrl}/update`, categoria);
  }

  // http://localhost:8080/categorias/delete/1
  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.categoriasUrl}/delete/${id}`);
  }
}
