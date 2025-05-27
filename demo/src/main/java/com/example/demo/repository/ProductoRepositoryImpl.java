package com.example.demo.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.IProductoDTO;

@Repository
public class ProductoRepositoryImpl implements IProductoRepository{

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<IProductoDTO> findALL() {
        String sql ="SELECT * FROM producto";
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(IProductoDTO.class));
    }

    @Override
    public int save(IProductoDTO producto) {
        String sql ="INSERT INTO producto (pt_nombre, pt_descripcin, pt_proveedor, pt_cantidad, pt_estado) VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(sql, new Object[]{producto.getPt_nombre(), producto.getPt_descripcin(), producto.getPt_proveedor(), producto.getPt_cantidad(), producto.getPt_estado()} );
    }

    @Override
    public int update(IProductoDTO producto) {
        String sql ="UPDATE producto SET pt_nombre=?, pt_descripcin=?, pt_proveedor=?, pt_cantidad=?, pt_estado=? WHERE id_producto=?";
        return jdbcTemplate.update(sql, new Object[]{producto.getPt_nombre(), producto.getPt_descripcin(), producto.getPt_proveedor(), producto.getPt_cantidad(),producto.getPt_estado(),  producto.getId_producto()});
    }

    @Override
    public int deleteById(int id) {
        String sql= "UPDATE producto set pt_estado=0 WHERE id_producto=?";
        return jdbcTemplate.update(sql, new Object[]{id});
    }

    @Override
    public int cambiarEstado(int id, int estado) {
        String sql ="UPDATE producto SET pt_estado=? WHERE id_producto=?";
        return jdbcTemplate.update(sql, new Object[]{estado,id});
    }
    
}
