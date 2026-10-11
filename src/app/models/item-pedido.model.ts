import { Pedido } from './pedido.model';
import { Comida } from './comida.model';
import { Adicional } from './adicional.model';

export class ItemPedido {
  constructor(
    public id: number,
    public cantidad: number,
    public pedido: Pedido | null,
    public comida: Comida,
    public adicionales: Adicional[] = [],
    public subtotal?: number,
  ) {}
}
