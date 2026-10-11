import { Categoria } from './categoria.model';

// buena practica
export interface Comida {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen_url: string;
  etiqueta: string;
  activo: boolean;
  categoria: Categoria;
  imagenUrl?: string;
  nombreCategoria?: string;
}
