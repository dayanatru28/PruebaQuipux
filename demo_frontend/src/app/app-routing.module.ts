import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './components/playlists/playlists.component'; 
import { RegistrarUsuariosComponent  } from './components/registrar-usuarios/registrar-usuarios.component'; 

const routes: Routes = [
  { path: 'registro', component: RegistrarUsuariosComponent },
  { path: '', component: PlaylistsComponent } // <--- Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
