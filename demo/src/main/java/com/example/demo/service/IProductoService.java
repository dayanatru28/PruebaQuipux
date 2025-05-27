package com.example.demo.service;

import java.util.List;

import com.example.demo.model.IProductoDTO;

public interface IProductoService {

    public List<IProductoDTO> findALL();
    public int save (IProductoDTO producto);
    public int update(IProductoDTO producto);
    public int deleteById(int id);
    public int cambiarEstado(int id, int estado);

}
