import { Pedido } from './pedido.model';

export class Cliente {
  constructor(
    public id: number,
    public nombre: string,
    public correo: string,
    public contrasena: string,
    public telefono: string,
    public direccion: string,
    public activo: boolean = true,
    public pedidos: Pedido[] = [],
  ) {}
}
