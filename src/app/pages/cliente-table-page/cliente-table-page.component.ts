import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CalaverasComponent } from '../../components/calaveras/calaveras.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ClienteTableComponent } from './components/cliente-table/cliente-table.component';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../service/cliente.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-table-page',
  imports: [
    NavbarComponent,
    FooterComponent,
    CalaverasComponent,
    PageTitleComponent,
    ClienteTableComponent,
    RouterLink,
  ],
  templateUrl: './cliente-table-page.component.html',
  styleUrl: './cliente-table-page.component.css',
})
export class ClienteTablePageComponent implements OnInit {
  private clienteService = inject(ClienteService);

  title: string = 'Gestión de Clientes';
  clienteArray: Cliente[] = [];

  ngOnInit(): void {
    this.clienteArray = this.clienteService.getClientes();
  }

  eliminarCliente(cliente: Cliente): void {
    this.clienteService.eliminarCliente(cliente.id);
  }
}
