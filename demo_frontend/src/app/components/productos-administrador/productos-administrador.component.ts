import { Component } from '@angular/core';
import { productoDTO } from '../../models/producto.dto';
import { ProductosService } from '../../services/productos.service';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core'; 

@Component({
  selector: 'app-productos-administrador',
  templateUrl: './productos-administrador.component.html',
  styleUrl: './productos-administrador.component.css'
})
export class ProductosAdministradorComponent {

  productos: productoDTO[] = [];
  formProductos: FormGroup;
  isUpdate: boolean = false;

  constructor(private productoService: ProductosService, private modalService: NgbModal) {
    this.formProductos = new FormGroup({
      id_producto: new FormControl(), // Si el campo es solo para mostrar y no editable
      pt_nombre: new FormControl('', Validators.required), // Campo obligatorio
      pt_descripcin: new FormControl('', Validators.required), // Campo obligatorio
      pt_proveedor: new FormControl('', Validators.required), // Campo obligatorio
      pt_cantidad: new FormControl('', [Validators.required, Validators.min(0)]), // Campo obligatorio con validación adicional
      pt_estado: new FormControl(1)
    });
  }

  ngOnInit() {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.listarProductos().subscribe(resp => {
      if (resp) {
        this.productos = resp;
      }
    });
  }

  nuevoProducto(modalContent:TemplateRef<any>) {
    this.isUpdate = false;
    this.formProductos.reset(); // Limpiar el formulario
    this.modalService.open(modalContent); // Abre el modal
  }

  // Configura el formulario para editar un producto existente
  // selectItem(item: productoDTO) {
  //   this.isUpdate = true;
  //   this.formProductos.controls['pt_nombre'].setValue(item.pt_nombre);
  //   this.formProductos.controls['pt_descripcin'].setValue(item.pt_descripcin);
  //   this.formProductos.controls['pt_proveedor'].setValue(item.pt_proveedor);
  //   this.formProductos.controls['pt_cantidad'].setValue(item.pt_cantidad);
  //   this.openModal();  // Abre el modal al preparar para editar el producto
  // }

  selectItem(producto: any, modalContent:TemplateRef<any>) {
    this.isUpdate = true;
    this.formProductos.patchValue(producto); // Rellena el formulario con los datos del producto seleccionado
    this.modalService.open(modalContent); // Abre el modal para editar
  }


  // Envía los datos del formulario para añadir o actualizar un producto
  submitProducto() {
    console.log(this.isUpdate)
    if (this.formProductos.valid) {
      if (this.isUpdate) {
        // Llama al servicio para actualizar el producto
        this.productoService.editarProductos(this.formProductos.value).subscribe(
          () => {
            this.listarProductos();
            this.modalService.dismissAll(); // Cierra el modal al actualizar el producto
          },
          error => {
            console.error('Error al actualizar el producto', error);
          }
        );
      } else {
        // Llama al servicio para añadir un nuevo producto
        this.productoService.guardarProductos(this.formProductos.value).subscribe(
          () => {
            this.listarProductos();
            this.modalService.dismissAll(); // Cierra el modal al añadir el producto
          },
          error => {
            console.error('Error al añadir el producto', error);
          }
        );
      }
    }

    this.modalService.dismissAll();
  }

  toggleEstado(producto: any) {
    // Cambia el estado localmente
    producto.pt_estado = producto.pt_estado === 1 ? 0 : 1;

    // Llama al servicio para actualizar el estado en el servidor
    this.productoService.actualizarEstado(producto.id_producto, producto.pt_estado).subscribe(
      () => {
        this.listarProductos();
      },
      error => {
        console.error('Error al actualizar el estado', error);
      }
    );
  }


}
