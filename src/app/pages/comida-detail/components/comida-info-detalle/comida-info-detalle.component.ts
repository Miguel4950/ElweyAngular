import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comida } from '../../../../models/comida.model';
import { ComidaAdicionalesComponent } from '../comida-adicionales/comida-adicionales.component';
import { PedidoService } from '../../../../service/pedido.service';
import { ClienteService } from '../../../../service/cliente.service';

@Component({
  selector: 'app-comida-info-detalle, app-col-info-detalle',
  imports: [RouterLink, DecimalPipe, FormsModule, ComidaAdicionalesComponent],
  templateUrl: './comida-info-detalle.component.html',
  styleUrl: './comida-info-detalle.component.css',
})
export class ComidaInfoDetalleComponent {
  private pedidoService = inject(PedidoService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  // Signal Input
  comida = input<Comida>();

  adicionalesSeleccionados: number[] = [];
  cantidad: number = 1;
  procesandoPedido: boolean = false;

  actualizarAdicionales(ids: number[]): void {
    this.adicionalesSeleccionados = ids;
  }

  ordenarPlato(plato: Comida): void {
    // 1. Obtener el cliente activo en sesión (o permitir que el backend asigne cliente por defecto)
    this.procesandoPedido = true;
    const clienteActual = this.clienteService.getClienteActual();
    const clienteId = clienteActual ? clienteActual.id : undefined;

    // 2. Enviar petición POST al endpoint REST /pedidos/ordenar y navegar al detalle del pedido
    this.pedidoService
      .ordenarPlato(plato.id, clienteId, this.adicionalesSeleccionados, this.cantidad)
      .subscribe({
        next: (nuevoPedido) => {
          this.procesandoPedido = false;
          this.router.navigate(['/pedidos', nuevoPedido.id]);
        },
        error: () => {
          this.procesandoPedido = false;
        },
      });
  }
}
