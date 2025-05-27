package com.example.demo.controller;

import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Playlist;
import com.example.demo.service.PlaylistService;

@RestController
@RequestMapping("/lists")
@CrossOrigin(origins = "http://localhost:4200")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<?> crearLista(@RequestBody Playlist playlist) {
        try {
            // Validar que el nombre no sea null o vacío
            if (playlist == null || !StringUtils.hasText(playlist.getNombre())) {
                return ResponseEntity.badRequest().body("Nombre inválido: no puede estar vacío");
            }
            Playlist nueva = playlistService.crearPlaylist(playlist);
            String encodedName = URLEncoder.encode(nueva.getNombre(), StandardCharsets.UTF_8.toString());
            return ResponseEntity.created(URI.create("/lists/" + encodedName)).body(nueva);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Nombre inválido: " + e.getMessage());
        } catch (Exception e) {
            // Aquí puedes hacer un log del error si quieres
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado");
        }
    }

    @GetMapping
    public ResponseEntity<List<Playlist>> obtenerListas() {
        List<Playlist> listas = playlistService.obtenerTodas();
        return ResponseEntity.ok(listas);
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerPorNombre(@PathVariable String nombre) {
        try {
            if (!StringUtils.hasText(nombre)) {
                return ResponseEntity.badRequest().body("Nombre inválido");
            }
            String decodedNombre = URLDecoder.decode(nombre, StandardCharsets.UTF_8.toString());
            var optional = playlistService.obtenerPorNombre(decodedNombre);
            if (optional.isPresent()) {
                return ResponseEntity.ok(optional.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista no encontrada");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nombre inválido");
        }
    }

    @DeleteMapping("/{nombre}")
    public ResponseEntity<?> eliminarPorNombre(@PathVariable String nombre) {
        try {
            if (!StringUtils.hasText(nombre)) {
                return ResponseEntity.badRequest().body("Nombre inválido");
            }
            String decodedNombre = URLDecoder.decode(nombre, StandardCharsets.UTF_8.toString());
            if (!playlistService.existePorNombre(decodedNombre)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista no encontrada");
            }
            playlistService.eliminarPorNombre(decodedNombre);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Nombre inválido");
        }
    }
}
