import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrl: './registrar-usuarios.component.css'
})
export class RegistrarUsuariosComponent {
  mensaje: string = '';

  constructor(private authService: AuthService) {}

  registrar(username: string, password: string) {
    const usuario = { username, password };

    this.authService.registrarUsuario(usuario).subscribe({
      next: (res) => {
        this.mensaje = 'Usuario registrado exitosamente.';
      },
      error: (err) => {
        this.mensaje = 'Error al registrar: ' + (err.error || 'Usuario ya existe');
      }
    });
  }
}
