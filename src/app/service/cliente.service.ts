import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  // 1. Inyección de HttpClient y estado reactivo de la sesión con BehaviorSubject
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/clientes';

  private clienteActualSubject = new BehaviorSubject<Cliente | null>(null);
  clienteActual$ = this.clienteActualSubject.asObservable();

  private rolActualSubject = new BehaviorSubject<string>('CLIENTE');
  rolActual$ = this.rolActualSubject.asObservable();

  // http://localhost:8080/clientes/all
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/clientes/1
  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/clientes/login
  autenticar(correo: string, contrasena: string, rolSeleccionado: string = 'CLIENTE'): Observable<Cliente> {
    return this.http
      .post<Cliente>(`${this.apiUrl}/login`, {
        email: correo,
        password: contrasena,
      })
      .pipe(
        tap((cliente) => {
          this.clienteActualSubject.next(cliente);
          const correoLimpio = (cliente.correo || cliente.email || '').toLowerCase();
          if (correoLimpio === 'admin@elwey.com') {
            this.rolActualSubject.next('ADMIN');
          } else if (correoLimpio === 'operador@elwey.com') {
            this.rolActualSubject.next('OPERADOR');
          } else {
            this.rolActualSubject.next(rolSeleccionado || 'CLIENTE');
          }
        }),
      );
  }

  // http://localhost:8080/clientes/add
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/add`, cliente).pipe(
      tap((creado) => {
        this.clienteActualSubject.next(creado);
        this.rolActualSubject.next('CLIENTE');
      }),
    );
  }

  // http://localhost:8080/clientes/update
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    cliente.id = id;
    return this.http.put<Cliente>(`${this.apiUrl}/update`, cliente).pipe(
      tap((actualizado) => {
        if (this.clienteActualSubject.value?.id === id) {
          this.clienteActualSubject.next(actualizado);
        }
      }),
    );
  }

  // http://localhost:8080/clientes/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => {
        if (this.clienteActualSubject.value?.id === id) {
          this.clienteActualSubject.next(null);
        }
      }),
    );
  }

  getClienteActual(): Cliente | null {
    return this.clienteActualSubject.value;
  }

  setClienteActual(cliente: Cliente | null, rol: string = 'CLIENTE'): void {
    this.clienteActualSubject.next(cliente);
    this.rolActualSubject.next(rol);
  }

  getRolActual(): string {
    return this.rolActualSubject.value;
  }

  cerrarSesion(): void {
    this.clienteActualSubject.next(null);
    this.rolActualSubject.next('CLIENTE');
  }
}
