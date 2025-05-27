import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist.dto';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {

  playlistForm!: FormGroup;
  listas: Playlist[] = [];
  mensaje: string = '';

  // FormControl para la búsqueda
  buscarNombreControl: FormControl = new FormControl('');

  playlistEncontrada?: Playlist;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      canciones: this.fb.array([])
    });

    this.cargarListas();

    // Limpiar mensajes y resultados cuando el usuario escribe en el buscador
    this.buscarNombreControl.valueChanges.subscribe(() => {
      this.mensajeError = '';
      this.playlistEncontrada = undefined;
      this.mensaje = '';
    });
  }

  get canciones(): FormArray {
    return this.playlistForm.get('canciones') as FormArray;
  }

  agregarCancion() {
    const cancionGroup = this.fb.group({
      titulo: ['', Validators.required],
      artista: [''],
      album: [''],
      anno: [''],
      genero: ['']
    });
    this.canciones.push(cancionGroup);
  }

  eliminarCancion(index: number) {
    this.canciones.removeAt(index);
  }

  cargarListas() {
    this.playlistService.obtenerListas().subscribe({
      next: (data) => {
        this.listas = data;
      },
      error: (err) => {
        console.error('Error al cargar listas', err);
        this.mensaje = 'Error al cargar las listas';
      }
    });
  }

  crearPlaylist() {
    // Limpiar mensajes y búsqueda antes de crear
    this.mensaje = '';
    this.mensajeError = '';
    this.playlistEncontrada = undefined;
    // Opcional: this.buscarNombreControl.setValue('');

    if (this.playlistForm.valid) {
      const nuevaLista: Playlist = this.playlistForm.value;

      this.playlistService.crearLista(nuevaLista).subscribe({
        next: () => {
          this.mensaje = 'Lista creada con éxito';
          this.playlistForm.reset();
          this.canciones.clear();
          this.cargarListas();
        },
        error: (err) => {
          console.error('Error al crear lista', err);
          this.mensaje = 'Error al crear la lista';
        }
      });
    } else {
      this.mensaje = 'Complete los campos requeridos';
    }
  }

  eliminarLista(nombre: string) {
    // Limpiar mensajes y búsqueda antes de eliminar
    this.mensaje = '';
    this.mensajeError = '';
    this.playlistEncontrada = undefined;
    // Opcional: this.buscarNombreControl.setValue('');

    if (confirm(`¿Está seguro que quiere eliminar la lista "${nombre}"?`)) {
      this.playlistService.eliminarLista(nombre).subscribe({
        next: () => {
          this.mensaje = `Lista "${nombre}" eliminada`;
          this.cargarListas();
        },
        error: (err) => {
          console.error('Error al eliminar lista', err);
          this.mensaje = 'Error al eliminar la lista';
        }
      });
    }
  }

  buscarPlaylist() {
    const nombre = this.buscarNombreControl.value?.trim();
    if (!nombre) {
      this.mensajeError = 'Por favor ingresa un nombre válido.';
      this.playlistEncontrada = undefined;
      return;
    }

    this.playlistService.obtenerListaPorNombre(nombre).subscribe({
      next: (playlist) => {
        this.playlistEncontrada = playlist;
        this.mensajeError = '';
      },
      error: (err) => {
        this.playlistEncontrada = undefined;
        this.mensajeError = 'No se encontró la playlist con ese nombre.';
        console.error(err);
      }
    });
  }
}
