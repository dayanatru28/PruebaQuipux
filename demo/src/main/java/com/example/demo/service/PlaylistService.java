package com.example.demo.service;

import com.example.demo.model.Playlist;
import com.example.demo.model.Song;
import com.example.demo.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    public Playlist crearPlaylist(Playlist playlist) {
        if (playlist.getNombre() == null || playlist.getNombre().isEmpty()) {
            throw new IllegalArgumentException("El nombre de la lista no puede ser nulo o vacío.");
        }
        if (playlist.getCanciones() != null) {
            for (Song song : playlist.getCanciones()) {
                song.setPlaylist(playlist);
            }
        }

        return playlistRepository.save(playlist);
    }

    public List<Playlist> obtenerTodas() {
        return playlistRepository.findAll();
    }

    public Optional<Playlist> obtenerPorNombre(String nombre) {
        return playlistRepository.findByNombre(nombre);
    }

    public void eliminarPorNombre(String nombre) {
        Optional<Playlist> lista = playlistRepository.findByNombre(nombre);
        if (lista.isPresent()) {
            playlistRepository.delete(lista.get());
        } else {
            throw new IllegalArgumentException("La lista no existe.");
        }
    }

    public boolean existePorNombre(String nombre) {
        return playlistRepository.existsByNombre(nombre);
    }
}
