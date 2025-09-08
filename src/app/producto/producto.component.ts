import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../Services/producto.service';
import { RouterLink } from '@angular/router';
import { IProducto } from '../interfases/iproducto';
import { Observable } from 'rxjs';

declare const Swal: any;

@Component({
  selector: 'app-producto',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent {
  lista_productos$!: IProducto[];

  constructor(private productoServicio: ProductoService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.productoServicio.todos().subscribe((productos) => {
      this.lista_productos$ = productos;
    });
  }

  eliminarProducto(id: number) {
    Swal.fire({
      title: 'Productos',
      text: 'Esta seguro que desea eliminar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#838688ff',
      confirmButtonText: 'Eliminar!!!!!!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productoServicio.eliminarProducto(id).subscribe((id) => {
          if (id > 0) {
            this.cargaTabla();
            Swal.fire(
              'Producto Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    });
  }

  variables_sesion(id: number) {
    sessionStorage.setItem('id_producto', id.toString());
  }
  eliminarvariable() {
    sessionStorage.removeItem('id_producto');
  }
}
