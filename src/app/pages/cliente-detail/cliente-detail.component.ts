import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-detail',
  imports: [
    RouterLink,
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
  ],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.css',
})
export class ClienteDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clienteService = inject(ClienteService);

  clienteId = -1;
  cliente: Cliente | undefined;

  ngOnInit(): void {
    // 1. Obtener el id a traves de la url
    this.clienteId = Number(this.route.snapshot.params['id']);
    // 2. Buscar el cliente en la BD
    this.cliente = this.clienteService.getClienteById(this.clienteId);
  }
}
