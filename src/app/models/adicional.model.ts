import { Categoria } from './categoria.model';

// buena practica
export interface Adicional {
  id: number;
  nombre: string;
  precio: number;
  activo?: boolean;
  categorias?: Categoria[];
  categoriaId?: number;
  nombresCategorias?: string;
}
