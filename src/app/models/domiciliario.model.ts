import { Pedido } from './pedido.model';

export class Domiciliario {
  constructor(
    public id: number,
    public cedula: string,
    public nombre: string,
    public celular: string,
    public disponible: boolean = true,
    public pedidos: Pedido[] = [],
  ) {}
}
