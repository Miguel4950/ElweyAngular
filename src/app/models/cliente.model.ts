import { Pedido } from './pedido.model';

// buena practica
export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  activo?: boolean;
  pedidos?: Pedido[];
  apellido?: string;
  email?: string;
  password?: string;
  fechaRegistro?: string;
  nombreCompleto?: string;
}
