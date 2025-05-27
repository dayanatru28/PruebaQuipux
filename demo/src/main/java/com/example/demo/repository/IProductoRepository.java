package com.example.demo.repository;

import java.util.List;

import com.example.demo.model.IProductoDTO;

public interface IProductoRepository {
    public List<IProductoDTO> findALL();
    public int save (IProductoDTO producto);
    public int update(IProductoDTO producto);
    public int deleteById(int id);
    public int cambiarEstado(int id, int estado);

    
}
