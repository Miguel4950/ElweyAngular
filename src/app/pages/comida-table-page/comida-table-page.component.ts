import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ComidaTableComponent } from './components/comida-table/comida-table.component';
import { Comida } from '../../models/comida.model';
import { ComidaService } from '../../service/comida.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comida-table-page',
  imports: [
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
    PageTitleComponent,
    ComidaTableComponent,
    RouterLink,
  ],
  templateUrl: './comida-table-page.component.html',
  styleUrl: './comida-table-page.component.css',
})
export class ComidaTablePageComponent implements OnInit {
  // Inyección de dependencias funcional idéntica al código del profesor
  private comidaService = inject(ComidaService);

  title: string = 'Gestión de Comidas';
  username: string = '';
  comidaArray: Comida[] = [];

  ngOnInit(): void {
    // Un único arreglo de comidas
    this.comidaArray = this.comidaService.getComidas();
  }

  eliminarComida(comida: Comida): void {
    this.comidaService.eliminarComida(comida.id);
  }
}
