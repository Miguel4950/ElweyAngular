import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe, DatePipe } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { Pedido } from '../../models/pedido.model';
import { Domiciliario } from '../../models/domiciliario.model';
import { PedidoService } from '../../service/pedido.service';
import { DomiciliarioService } from '../../service/domiciliario.service';

@Component({
  selector: 'app-pedido-detail',
  standalone: true,
  imports: [
    RouterLink,
    DecimalPipe,
    DatePipe,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './pedido-detail.component.html',
  styleUrl: './pedido-detail.component.css',
})
export class PedidoDetailComponent implements OnInit {
  // 1. Inyección de servicios REST para consultar el pedido y los domiciliarios
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pedidoService = inject(PedidoService);
  private domiciliarioService = inject(DomiciliarioService);

  pedido: Pedido | null = null;
  domiciliarios: Domiciliario[] = [];
  mensajeActualizado: string = '';

  estadosDisponibles: string[] = [
    'RECIBIDO',
    'COCINANDO',
    'ENVIADO',
    'ENTREGADO',
    'CANCELADO',
  ];

  ngOnInit(): void {
    // 1. Obtener ID del pedido desde la ruta y cargar tanto el pedido como los domiciliarios
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.pedidoService.findById(id).subscribe({
        next: (data) => (this.pedido = data),
        error: () => (this.pedido = null),
      });
    }
    this.domiciliarioService.findAll().subscribe((doms) => {
      this.domiciliarios = doms;
    });
  }

  cambiarEstado(event: Event): void {
    if (!this.pedido) return;
    const nuevoEstado = (event.target as HTMLSelectElement).value;
    this.pedidoService.cambiarEstado(this.pedido.id, nuevoEstado).subscribe((res) => {
      this.pedido = res;
      this.mensajeActualizado = `Estado actualizado a ${res.estado}.`;
    });
  }

  cambiarDomiciliario(event: Event): void {
    if (!this.pedido) return;
    const domId = Number((event.target as HTMLSelectElement).value);
    if (!domId) return;
    this.pedidoService.asignarDomiciliario(this.pedido.id, domId).subscribe((res) => {
      this.pedido = res;
      this.mensajeActualizado = `Domiciliario asignado: ${res.domiciliario?.nombre}.`;
    });
  }

  eliminarPedido(): void {
    if (!this.pedido) return;
    this.pedidoService.deleteById(this.pedido.id).subscribe(() => {
      this.router.navigate(['/pedidos']);
    });
  }
}
