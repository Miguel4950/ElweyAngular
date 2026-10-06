import { Pedido } from './pedido.model';
import { Comida } from './comida.model';
import { Adicional } from './adicional.model';

export class ItemPedido {
  constructor(
    public id: number,
    public cantidad: number,
    public pedido: Pedido,
    public comida: Comida,
    public adicionales: Adicional[] = [],
  ) {}
}
