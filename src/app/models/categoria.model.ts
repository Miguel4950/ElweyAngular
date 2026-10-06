import { Comida } from './comida.model';
import { Adicional } from './adicional.model';

export class Categoria {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public activo: boolean = true,
    public comidas: Comida[] = [],
    public adicionales: Adicional[] = [],
  ) {}
}
