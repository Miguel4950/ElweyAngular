import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Categoria } from '../../../../models/categoria.model';

@Component({
  selector: 'app-comida-adicionales',
  imports: [DecimalPipe],
  templateUrl: './comida-adicionales.component.html',
  styleUrl: './comida-adicionales.component.css',
})
export class ComidaAdicionalesComponent {
  categoria = input<Categoria>();
}
