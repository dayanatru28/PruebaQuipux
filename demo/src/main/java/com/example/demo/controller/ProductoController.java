package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.IProductoDTO;
import com.example.demo.model.IServiceResponseDTO;
import com.example.demo.service.IProductoService;

@RestController
@RequestMapping("api/v1/producto")
@CrossOrigin("*")
public class ProductoController {
    @Autowired
    private IProductoService iProductoService;

    @GetMapping("/listar")
    public ResponseEntity<List<IProductoDTO>> listAll() {
        var result = iProductoService.findALL();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<IServiceResponseDTO> save(@RequestBody IProductoDTO producto) {
        IServiceResponseDTO serviceResponseDTO = new IServiceResponseDTO();
        int result = iProductoService.save(producto);
        if (result == 1) {
            serviceResponseDTO.setMensaje(("Producto almacenado correctamente"));
        }
        return new ResponseEntity<>(serviceResponseDTO, HttpStatus.OK);
    }

    @PostMapping("/editar")
    public ResponseEntity<IServiceResponseDTO> editar(@RequestBody IProductoDTO producto) {
        IServiceResponseDTO serviceResponseDTO = new IServiceResponseDTO();
        int result = iProductoService.update(producto);
        if (result == 1) {
            serviceResponseDTO.setMensaje(("Producto actualizado correctamente"));
        }
        return new ResponseEntity<>(serviceResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/eliminar/{id}")
    public ResponseEntity<IServiceResponseDTO> eliminar(@PathVariable int id) {
        IServiceResponseDTO serviceResponseDTO = new IServiceResponseDTO();
        int result = iProductoService.deleteById(id);
        if (result == 1) {
            serviceResponseDTO.setMensaje(("Producto actualizado correctamente"));
        }
        return new ResponseEntity<>(serviceResponseDTO, HttpStatus.OK);
    }

    @PostMapping("/cambiarEstado")
    public ResponseEntity<IServiceResponseDTO> cambiarEstado(@RequestBody Map<String, Object> requestBody) {
        IServiceResponseDTO serviceResponseDTO = new IServiceResponseDTO();

        int id = (int) requestBody.get("id");
        int estado = (int) requestBody.get("estado");

        int result = iProductoService.cambiarEstado(id,estado);

        if (result == 1) {
            serviceResponseDTO.setMensaje(("Producto actualizado correctamente"));
        }
        return new ResponseEntity<>(serviceResponseDTO, HttpStatus.OK); 

    }

}
