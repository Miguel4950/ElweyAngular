import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  // 1. Inyección de HttpClient para consumir el API REST de clientes en Spring Boot
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/clientes';

  private clienteActual: Cliente | null = null;
  private rolActual: string = 'CLIENTE';

  // http://localhost:8080/clientes/all
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/clientes/1
  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/clientes/login
  autenticar(correo: string, contrasena: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/login`, {
      email: correo,
      password: contrasena,
    });
  }

  // http://localhost:8080/clientes/add
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/add`, cliente);
  }

  // http://localhost:8080/clientes/update
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    cliente.id = id;
    return this.http.put<Cliente>(`${this.apiUrl}/update`, cliente);
  }

  // http://localhost:8080/clientes/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getClienteActual(): Cliente | null {
    return this.clienteActual;
  }

  setClienteActual(cliente: Cliente | null, rol: string = 'CLIENTE'): void {
    this.clienteActual = cliente;
    this.rolActual = rol;
  }

  getRolActual(): string {
    return this.rolActual;
  }

  cerrarSesion(): void {
    this.clienteActual = null;
    this.rolActual = 'CLIENTE';
  }
}
