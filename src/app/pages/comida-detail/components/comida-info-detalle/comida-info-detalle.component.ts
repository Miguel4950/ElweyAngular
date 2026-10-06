import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Comida } from '../../../../models/comida.model';
import { ComidaAdicionalesComponent } from '../comida-adicionales/comida-adicionales.component';

@Component({
  selector: 'app-comida-info-detalle, app-col-info-detalle',
  imports: [RouterLink, DecimalPipe, ComidaAdicionalesComponent],
  templateUrl: './comida-info-detalle.component.html',
  styleUrl: './comida-info-detalle.component.css',
})
export class ComidaInfoDetalleComponent {
  // Signal Input
  comida = input<Comida>();
}
