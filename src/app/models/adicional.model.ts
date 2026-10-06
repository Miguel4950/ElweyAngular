import { Categoria } from './categoria.model';

export class Adicional {
  constructor(
    public id: number,
    public nombre: string,
    public precio: number,
    public activo: boolean = true,
    public categorias: Categoria[] = [],
  ) {}
}
