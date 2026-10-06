import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ComidaTableComponent } from './components/comida-table/comida-table.component';
import { Comida } from '../../models/comida.model';
import { ComidaService } from '../../service/comida.service';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-comida-table-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
    PageTitleComponent,
    ComidaTableComponent,
    RouterLink,
    DecimalPipe,
  ],
  templateUrl: './comida-table-page.component.html',
  styleUrl: './comida-table-page.component.css',
})
export class ComidaTablePageComponent implements OnInit {
  private comidaService = inject(ComidaService);
  private router = inject(Router);

  title: string = 'Gestión de Comidas';
  username: string = '';
  comidaArray: Comida[] = [];
  esVistaTarjetas: boolean = false;
  filtroCategoria: string = '';
  busqueda: string = '';

  ngOnInit(): void {
    this.comidaArray = this.comidaService.getComidas();
    this.detectarVista();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectarVista();
      });
  }

  detectarVista(): void {
    this.esVistaTarjetas = this.router.url.includes('tarjetas');
  }

  seleccionarCategoria(cat: string): void {
    this.filtroCategoria = cat;
  }

  onBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.busqueda = input.value;
  }

  get comidasFiltradas(): Comida[] {
    return this.comidaArray.filter((item) => {
      const matchCat =
        !this.filtroCategoria ||
        (item.categoria &&
          item.categoria.nombre.toLowerCase() ===
            this.filtroCategoria.toLowerCase());
      const matchText =
        !this.busqueda ||
        item.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(this.busqueda.toLowerCase());
      return matchCat && matchText;
    });
  }

  eliminarComida(comida: Comida): void {
    this.comidaService.eliminarComida(comida.id);
    this.comidaArray = this.comidaService.getComidas();
  }
}
