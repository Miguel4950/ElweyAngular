import { Component, input, output } from '@angular/core';
import { Categoria } from '../../../../models/categoria.model';

@Component({
  selector: 'app-comida-adicionales',
  imports: [],
  templateUrl: './comida-adicionales.component.html',
  styleUrl: './comida-adicionales.component.css',
})
export class ComidaAdicionalesComponent {
  categoria = input<Categoria>();
  adicionalesChange = output<number[]>();

  seleccionadosIds: number[] = [];

  toggleAdicional(id: number, event: Event): void {
    // 1. Actualizar la lista de adicionales seleccionados según el checkbox
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.seleccionadosIds.includes(id)) {
        this.seleccionadosIds = [...this.seleccionadosIds, id];
      }
    } else {
      this.seleccionadosIds = this.seleccionadosIds.filter((item) => item !== id);
    }
    // 2. Emitir al componente padre los IDs seleccionados
    this.adicionalesChange.emit(this.seleccionadosIds);
  }
}
