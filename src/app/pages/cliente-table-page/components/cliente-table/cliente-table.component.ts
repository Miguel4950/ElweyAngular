import { Component, inject, input, output } from '@angular/core';
import { Cliente } from '../../../../models/cliente.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-table',
  imports: [RouterLink],
  templateUrl: './cliente-table.component.html',
  styleUrl: './cliente-table.component.css',
})
export class ClienteTableComponent {
  router = inject(Router);

  clienteArray = input<Cliente[]>();
  clienteDeleted = output<Cliente>();

  verDetalleCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id]);
  }

  eliminarCliente(cliente: Cliente): void {
    if (confirm(`¿Estás seguro de eliminar al cliente "${cliente.nombre}"?`)) {
      this.clienteDeleted.emit(cliente);
    }
  }
}
