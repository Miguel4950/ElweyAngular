import { Component, inject, input, output } from '@angular/core';
import { Comida } from '../../../../models/comida.model';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-comida-table',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './comida-table.component.html',
  styleUrl: './comida-table.component.css',
})
export class ComidaTableComponent {
  // Inyección de dependencias funcional como en el código del profesor
  router = inject(Router);

  ancho: number = 60;
  alto: number = 60;

  // Signal Inputs
  comidaArray = input<Comida[]>();

  comidaDeleted = output<Comida>();

  verDetalleComida(comida: Comida): void {
    this.router.navigate(['/comidas', comida.id]);
  }

  eliminarComida(comida: Comida): void {
    if (confirm(`¿Estás seguro de eliminar "${comida.nombre}"?`)) {
      this.comidaDeleted.emit(comida);
    }
  }
}
