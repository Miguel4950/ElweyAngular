import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operador } from '../models/operador.model';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {
  // 1. Inyección de HttpClient para el CRUD y login de operadores
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/operadores';

  // http://localhost:8080/operadores/all
  findAll(): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/operadores/1
  findById(id: number): Observable<Operador> {
    return this.http.get<Operador>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/operadores/login
  autenticar(usuario: string, contrasena: string): Observable<Operador> {
    return this.http.post<Operador>(`${this.apiUrl}/login`, {
      usuario,
      contrasena,
    });
  }

  // http://localhost:8080/operadores/add
  addOperador(operador: Operador): Observable<Operador> {
    return this.http.post<Operador>(`${this.apiUrl}/add`, operador);
  }

  // http://localhost:8080/operadores/update
  updateOperador(operador: Operador): Observable<Operador> {
    return this.http.put<Operador>(`${this.apiUrl}/update`, operador);
  }

  // http://localhost:8080/operadores/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
