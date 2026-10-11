import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Comida } from '../../../../models/comida.model';
import { ComidaAdicionalesComponent } from '../comida-adicionales/comida-adicionales.component';
import { PedidoService } from '../../../../service/pedido.service';
import { ClienteService } from '../../../../service/cliente.service';

@Component({
  selector: 'app-comida-info-detalle',
  imports: [RouterLink, FormsModule, ComidaAdicionalesComponent],
  templateUrl: './comida-info-detalle.component.html',
  styleUrl: './comida-info-detalle.component.css',
})
export class ComidaInfoDetalleComponent {
  // DI
  private pedidoService = inject(PedidoService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  comida = input<Comida>();

  adicionalesSeleccionados: number[] = [];
  cantidad: number = 1;
  procesandoPedido: boolean = false;

  actualizarAdicionales(ids: number[]): void {
    this.adicionalesSeleccionados = ids;
  }

  ordenarPlato(plato: Comida): void {
    // 1. Obtener el cliente activo en sesión
    this.procesandoPedido = true;
    const clienteActual = this.clienteService.getClienteActual();
    const clienteId = clienteActual ? clienteActual.id : undefined;

    // 2. Enviar petición POST al endpoint REST /pedidos/ordenar
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
