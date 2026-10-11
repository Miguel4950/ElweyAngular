import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comida } from '../../../../models/comida.model';

@Component({
  selector: 'app-menu-destacado',
  imports: [RouterLink],
  templateUrl: './menu-destacado.component.html',
  styleUrl: './menu-destacado.component.css',
})
export class MenuDestacadoComponent {
  comidaArray = input<Comida[]>();
}
