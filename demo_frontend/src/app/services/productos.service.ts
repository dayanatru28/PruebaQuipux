import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { productoDTO } from '../models/producto.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlEndPointPublica = 'http://localhost:8081/prueba/api/v1/producto';

  constructor(private httpClient: HttpClient) { }

  listarProductos(): Observable<productoDTO[]> {
    return this.httpClient.get<productoDTO[]>(this.urlEndPointPublica + '/listar').pipe(map(res => res));
  }

  guardarProductos(request: any): Observable<any> {
    return this.httpClient.post<any>(this.urlEndPointPublica + '/guardar', request).pipe(map(res => res));
  }

  editarProductos(request: any): Observable<any> {
    return this.httpClient.post<any>(this.urlEndPointPublica + '/editar', request).pipe(map(res => res));
  }

  // Método para actualizar el estado del producto
  actualizarEstado(id: number, estado: number): Observable<any> {
    return this.httpClient.post(this.urlEndPointPublica + '/cambiarEstado', { id, estado });
  }

  eliminarProductos(id: number): Observable<any> {
    return this.httpClient.post<any>(this.urlEndPointPublica + '/eliminar/', id).pipe(map(res => res));
  }
}
