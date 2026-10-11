import { Pedido } from './pedido.model';

// buena practica
export interface Domiciliario {
  id: number;
  cedula: string;
  nombre: string;
  celular: string;
  disponible: boolean;
  pedidos?: Pedido[];
}
