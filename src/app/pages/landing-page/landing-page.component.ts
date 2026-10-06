import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { HeroComponent } from './components/hero/hero.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { MenuDestacadoComponent } from './components/menu-destacado/menu-destacado.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { BannerCtaComponent } from './components/banner-cta/banner-cta.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { Comida } from '../../models/comida.model';
import { ComidaService } from '../../service/comida.service';

@Component({
  selector: 'app-landing-page',
  imports: [
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
    HeroComponent,
    NosotrosComponent,
    MenuDestacadoComponent,
    GaleriaComponent,
    BannerCtaComponent,
    UbicacionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  private comidaService = inject(ComidaService);

  comidaArray: Comida[] = [];

  ngOnInit(): void {
    this.comidaArray = this.comidaService.getComidas().slice(0, 4);
  }
}
