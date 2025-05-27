package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.IProductoDTO;
import com.example.demo.repository.IProductoRepository;

@Service
public class IProductoServiceImpl implements IProductoService {

    @Autowired
    private IProductoRepository iProductoRepository;

    @Override
    public List<IProductoDTO> findALL() {
        List<IProductoDTO> list;

        try {
            list=iProductoRepository.findALL();
        } catch (Exception e) {
            throw e;
        }

        return list;
    }

    @Override
    public int save(IProductoDTO producto) {
        int row;
        try {
            row=iProductoRepository.save(producto);
        } catch (Exception e) {
            throw e;
        }
        return row;
    }

    @Override
    public int update(IProductoDTO producto) {
        int row;
        try {
            row=iProductoRepository.update(producto);
        } catch (Exception e) {
            throw e;
        }
        return row;
    }

    @Override
    public int deleteById(int id) {
        int row;
        try {
            row=iProductoRepository.deleteById(id);
        } catch (Exception e) {
            throw e;
        }
        return row;
    }

    @Override
    public int cambiarEstado(int id, int estado) {
        int row;
        try {
            row=iProductoRepository.cambiarEstado(id,estado);
        } catch (Exception e) {
            throw e;
        }
        return row;
    }

}
