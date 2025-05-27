import { Cancion } from './cancion.dto';

export interface Playlist {
  nombre: string;
  descripcion: string;
  canciones: Cancion[];
}
