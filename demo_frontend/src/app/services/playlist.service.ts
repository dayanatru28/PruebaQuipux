import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../models/playlist.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiUrl = 'http://localhost:8081/prueba/lists';

  constructor(private http: HttpClient) { }



  crearLista(lista: Playlist): Observable<any> {
    return this.http.post(this.apiUrl, lista, { observe: 'response' });
  }


  obtenerListas(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  obtenerListaPorNombre(nombre: string): Observable<Playlist> {
    const encodedName = encodeURIComponent(nombre);
    return this.http.get<Playlist>(`${this.apiUrl}/${encodedName}`);
  }

  eliminarLista(nombre: string): Observable<any> {
    const encodedName = encodeURIComponent(nombre);
    return this.http.delete(`${this.apiUrl}/${encodedName}`, { observe: 'response' });
  }
}
