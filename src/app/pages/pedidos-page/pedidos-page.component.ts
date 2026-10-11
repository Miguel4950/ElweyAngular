import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../service/pedido.service';

@Component({
  selector: 'app-pedidos-page',
  imports: [
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './pedidos-page.component.html',
  styleUrl: './pedidos-page.component.css',
})
export class PedidosPageComponent implements OnInit {
  // DI
  private pedidoService = inject(PedidoService);

  pedidos: Pedido[] = [];
  filtroEstado: string = '';
  mensajeExito: string = '';

  estadosDisponibles: string[] = [
    'En preparación',
    'En camino',
    'Entregado',
    'Cancelado',
  ];

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    // 1. Consultar lista completa de pedidos desde GET /pedidos/all
    this.pedidoService.findAll().subscribe((data) => {
      this.pedidos = data;
    });
  }

  get pedidosFiltrados(): Pedido[] {
    if (!this.filtroEstado) {
      return this.pedidos;
    }
    return this.pedidos.filter(
      (p) => p.estado && p.estado.toLowerCase() === this.filtroEstado.toLowerCase(),
    );
  }

  cambiarEstado(pedido: Pedido, event: Event): void {
    // 1. Actualizar estado del pedido mediante PUT /pedidos/{id}/estado
    const nuevoEstado = (event.target as HTMLSelectElement).value;
    this.pedidoService.cambiarEstado(pedido.id, nuevoEstado).subscribe((actualizado) => {
      pedido.estado = actualizado.estado;
      pedido.fechaEntrega = actualizado.fechaEntrega;
      this.mensajeExito = `Estado del Pedido #${pedido.id} actualizado a ${nuevoEstado}.`;
    });
  }

  eliminarPedido(id: number): void {
    // 1. Eliminar pedido mediante DELETE /pedidos/delete/{id}
    this.pedidoService.deleteById(id).subscribe(() => {
      this.pedidos = this.pedidos.filter((p) => p.id !== id);
      this.mensajeExito = `Pedido #${id} eliminado correctamente.`;
    });
  }
}
