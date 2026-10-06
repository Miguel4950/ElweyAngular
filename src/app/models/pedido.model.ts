import { Cliente } from './cliente.model';
import { Domiciliario } from './domiciliario.model';
import { ItemPedido } from './item-pedido.model';

export class Pedido {
  constructor(
    public id: number,
    public estado: string,
    public fecha_creacion: string | Date,
    public cliente: Cliente,
    public domiciliario: Domiciliario,
    public items: ItemPedido[] = [],
    public fecha_entrega: string | Date | null = null,
  ) {}
}
