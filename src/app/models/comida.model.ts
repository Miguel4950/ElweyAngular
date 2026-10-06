import { Categoria } from './categoria.model';

export class Comida {
  constructor(
    public id: number,
    public nombre: string,
    public precio: number,
    public descripcion: string,
    public imagen_url: string,
    public etiqueta: string,
    public activo: boolean = true,
    public categoria: Categoria,
  ) {}
}
