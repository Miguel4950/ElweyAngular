import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador.model';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  // 1. Inyección de HttpClient para el CRUD y login de administradores
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/administradores';

  // http://localhost:8080/administradores/all
  findAll(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/administradores/1
  findById(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/administradores/login
  autenticar(usuario: string, contrasena: string): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.apiUrl}/login`, {
      usuario,
      contrasena,
    });
  }

  // http://localhost:8080/administradores/add
  addAdministrador(administrador: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.apiUrl}/add`, administrador);
  }

  // http://localhost:8080/administradores/update
  updateAdministrador(administrador: Administrador): Observable<Administrador> {
    return this.http.put<Administrador>(`${this.apiUrl}/update`, administrador);
  }

  // http://localhost:8080/administradores/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
