import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/public';

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }
}
