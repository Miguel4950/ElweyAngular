import { Component, inject, input, output } from '@angular/core';
import { Comida } from '../../../../models/comida.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-comida-table',
  imports: [RouterLink],
  templateUrl: './comida-table.component.html',
  styleUrl: './comida-table.component.css',
})
export class ComidaTableComponent {
  // DI
  router = inject(Router);

  ancho: number = 60;
  alto: number = 60;

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
