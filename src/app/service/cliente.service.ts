import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {
    this.inicializarDatos();
  }

  // Base de datos simulada en memoria
  private clientes: Cliente[] = [];

  private inicializarDatos(): void {
    this.clientes = [
      new Cliente(
        1,
        'Carlos Mendoza',
        'carlos.mendoza@email.com',
        'carlos123',
        '3104567890',
        'Carrera 7 # 45-23, Bogotá',
        true,
        [],
      ),
      new Cliente(
        2,
        'Valeria Gómez',
        'valeria.gomez@email.com',
        'valeria456',
        '3159876543',
        'Calle 100 # 15-34, Bogotá',
        true,
        [],
      ),
      new Cliente(
        3,
        'Andrés Felipe Rodríguez',
        'andres.rodriguez@email.com',
        'andres789',
        '3201122334',
        'Avenida Circunvalar # 85-12, Bogotá',
        true,
        [],
      ),
      new Cliente(
        4,
        'Mariana Quintero',
        'mariana.quintero@email.com',
        'mariana321',
        '3018899001',
        'Transversal 23 # 67-89, Bogotá',
        true,
        [],
      ),
      new Cliente(
        5,
        'Santiago Morales',
        'santiago.morales@email.com',
        'santiago654',
        '3184455667',
        'Diagonal 45 # 19-50, Bogotá',
        false,
        [],
      ),
      new Cliente(
        6,
        'Camila Restrepo',
        'camila.restrepo@email.com',
        'camila987',
        '3127788990',
        'Calle 127 # 53-10, Bogotá',
        true,
        [],
      ),
    ];
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  getClienteById(id: number): Cliente | undefined {
    return this.clientes.find((c) => c.id === id);
  }

  addCliente(cliente: Cliente): void {
    const maxId =
      this.clientes.length > 0
        ? Math.max(...this.clientes.map((c) => c.id))
        : 0;
    cliente.id = maxId + 1;
    this.clientes.push(cliente);
  }

  updateCliente(id: number, cliente: Cliente): void {
    cliente.id = id;
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clientes[index] = cliente;
    }
  }

  eliminarCliente(id: number): void {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clientes.splice(index, 1);
    }
  }
}
