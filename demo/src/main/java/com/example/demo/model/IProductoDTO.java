package com.example.demo.model;
import lombok.Data;

@Data
public class IProductoDTO {
    public int id_producto;
    public String pt_nombre;
    public String pt_descripcin;
    public String pt_proveedor;
    public int pt_cantidad;
    public int pt_estado;

}
