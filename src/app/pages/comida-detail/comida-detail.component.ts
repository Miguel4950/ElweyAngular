import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { mergeMap } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { Comida } from '../../models/comida.model';
import { ComidaService } from '../../service/comida.service';
import { AdicionalService } from '../../service/adicional.service';
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
  // DI
  private route = inject(ActivatedRoute);
  private comidaService = inject(ComidaService);
  private adicionalService = inject(AdicionalService);

  comidaId = -1;
  comida: Comida | undefined;

  ngOnInit(): void {
    // 1. Obtener el id del plato desde la ruta activa
    this.comidaId = Number(this.route.snapshot.params['id']);

    // 2. Consultar el plato y encadenar con mergeMap la consulta de adicionales de su categoría
    this.comidaService
      .findById(this.comidaId)
      .pipe(
        mergeMap((comidaInfo) => {
          comidaInfo.imagen_url = comidaInfo.imagen_url || comidaInfo.imagenUrl || '';
          this.comida = comidaInfo;
          return this.adicionalService.findByCategoria(comidaInfo.categoria.id);
        }),
      )
      .subscribe((adicionalesList) => {
        if (this.comida && this.comida.categoria) {
          this.comida.categoria.adicionales = adicionalesList;
        }
      });
  }
}
