import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  // 1. Inyección de HttpClient para gestionar pedidos contra el backend Spring Boot
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/pedidos';

  // http://localhost:8080/pedidos/all
  findAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/all`);
  }

  // http://localhost:8080/pedidos/1
  findById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  // http://localhost:8080/pedidos/cliente/1
  findByCliente(clienteId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  // http://localhost:8080/pedidos/ordenar
  ordenarPlato(
    comidaId: number,
    clienteId?: number,
    adicionalesIds: number[] = [],
    cantidad: number = 1,
  ): Observable<Pedido> {
    let url = `${this.apiUrl}/ordenar?comidaId=${comidaId}&cantidad=${cantidad}`;
    if (clienteId) {
      url += `&clienteId=${clienteId}`;
    }
    for (const adId of adicionalesIds) {
      url += `&adicionalesIds=${adId}`;
    }
    return this.http.post<Pedido>(url, {});
  }

  // http://localhost:8080/pedidos/1/estado
  cambiarEstado(pedidoId: number, estado: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${pedidoId}/estado`, { estado });
  }

  // http://localhost:8080/pedidos/1/domiciliario/2
  asignarDomiciliario(pedidoId: number, domiciliarioId: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${pedidoId}/domiciliario/${domiciliarioId}`,
      {},
    );
  }

  // http://localhost:8080/pedidos/delete/1
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
