import { Comida } from './comida.model';
import { Adicional } from './adicional.model';

// buena practica
export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  activo?: boolean;
  comidas?: Comida[];
  adicionales?: Adicional[];
}
