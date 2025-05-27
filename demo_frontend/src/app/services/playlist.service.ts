import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.dto';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'http://localhost:8081/prueba/lists';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const username = 'admin'; 
    const password = 'admin123'; 
    const auth = btoa(`${username}:${password}`); 
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`
    });
  }

  obtenerListas(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  crearLista(lista: Playlist): Observable<any> {
    return this.http.post(this.apiUrl, lista, { headers: this.getHeaders(), observe: 'response' });
  }

  obtenerListaPorNombre(nombre: string): Observable<Playlist> {
    const encodedName = encodeURIComponent(nombre);
    return this.http.get<Playlist>(`${this.apiUrl}/${encodedName}`, { headers: this.getHeaders() });
  }

  eliminarLista(nombre: string): Observable<any> {
    const encodedName = encodeURIComponent(nombre);
    return this.http.delete(`${this.apiUrl}/${encodedName}`, { headers: this.getHeaders(), observe: 'response' });
  }
}
