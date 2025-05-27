import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosAdministradorComponent } from './components/productos-administrador/productos-administrador.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router'; 
import { RegistrarUsuariosComponent } from './components/registrar-usuarios/registrar-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosAdministradorComponent,
    PlaylistsComponent,
    AppComponent,
    RegistrarUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule 
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
