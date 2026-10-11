import { Pedido } from './pedido.model';
import { Comida } from './comida.model';
import { Adicional } from './adicional.model';

// buena practica
export interface ItemPedido {
  id: number;
  cantidad: number;
  pedido?: Pedido | null;
  comida: Comida;
  adicionales?: Adicional[];
  subtotal?: number;
}
