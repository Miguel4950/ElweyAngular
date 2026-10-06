import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { Comida } from '../../models/comida.model';
import { ComidaService } from '../../service/comida.service';
import { ComidaInfoDetalleComponent } from './components/comida-info-detalle/comida-info-detalle.component';

@Component({
  selector: 'app-comida-detail',
  imports: [
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
    ComidaInfoDetalleComponent,
  ],
  templateUrl: './comida-detail.component.html',
  styleUrl: './comida-detail.component.css',
})
export class ComidaDetailComponent implements OnInit {
  // Inyección de dependencias idéntica al código del profesor
  private route = inject(ActivatedRoute);
  private comidaService = inject(ComidaService);

  comidaId = -1;
  comida: Comida | undefined;

  ngOnInit(): void {
    // 1. Obtener el id a través de la url
    this.comidaId = Number(this.route.snapshot.params['id']);
    // 2. Buscar la comida en el servicio
    this.comida = this.comidaService.getComidaById(this.comidaId);
  }
}
