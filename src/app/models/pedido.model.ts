import { Cliente } from './cliente.model';
import { Domiciliario } from './domiciliario.model';
import { ItemPedido } from './item-pedido.model';

// buena practica
export interface Pedido {
  id: number;
  estado: string;
  fecha_creacion?: string | Date;
  cliente: Cliente;
  domiciliario: Domiciliario | null;
  items: ItemPedido[];
  fecha_entrega?: string | Date | null;
  total?: number;
  fechaCreacion?: string;
  fechaEntrega?: string | null;
}
