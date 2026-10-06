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
  private clienteActual: Cliente | null = null;

  private inicializarDatos(): void {
    this.clientes = [
      new Cliente(
        1,
        'Lionel Messi',
        'lionel.messi@email.com',
        'messi10',
        '3104567890',
        'Carrera 7 # 45-23, Bogotá',
        true,
        [],
      ),
      new Cliente(
        2,
        'Carlos Mendoza',
        'carlos.mendoza@email.com',
        'carlos123',
        '3159876543',
        'Calle 100 # 15-34, Bogotá',
        true,
        [],
      ),
      new Cliente(
        3,
        'Valeria Gómez',
        'valeria.gomez@email.com',
        'valeria456',
        '3201122334',
        'Avenida Circunvalar # 85-12, Bogotá',
        true,
        [],
      ),
      new Cliente(
        4,
        'Andrés Felipe Rodríguez',
        'andres.rodriguez@email.com',
        'andres789',
        '3018899001',
        'Transversal 23 # 67-89, Bogotá',
        true,
        [],
      ),
    ];

    // Por defecto, se asigna el primer cliente para permitir acceso directo a Mi Portal
    this.clienteActual = this.clientes[0];
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }

  getClienteById(id: number): Cliente | undefined {
    return this.clientes.find((c) => c.id === id);
  }

  getClienteActual(): Cliente | null {
    return this.clienteActual;
  }

  setClienteActual(cliente: Cliente | null): void {
    this.clienteActual = cliente;
  }

  autenticar(correo: string, contrasena: string): Cliente | undefined {
    const encontrado = this.clientes.find(
      (c) =>
        c.correo.trim().toLowerCase() === correo.trim().toLowerCase() &&
        c.contrasena === contrasena,
    );
    if (encontrado) {
      this.clienteActual = encontrado;
    }
    return encontrado;
  }

  cerrarSesion(): void {
    this.clienteActual = null;
  }

  addCliente(cliente: Cliente): Cliente {
    const maxId =
      this.clientes.length > 0
        ? Math.max(...this.clientes.map((c) => c.id))
        : 0;
    cliente.id = maxId + 1;
    this.clientes.push(cliente);
    this.clienteActual = cliente;
    return cliente;
  }

  updateCliente(id: number, cliente: Cliente): void {
    cliente.id = id;
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clientes[index] = cliente;
      if (this.clienteActual?.id === id) {
        this.clienteActual = cliente;
      }
    }
  }

  eliminarCliente(id: number): void {
    const index = this.clientes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      if (this.clienteActual?.id === id) {
        this.clienteActual = null;
      }
    }
  }
}
