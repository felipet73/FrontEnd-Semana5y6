import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductoService } from '../../Services/producto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
declare const Swal: any;

@Component({
  selector: 'app-nuevo-producto',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css',
})
export class NuevoProductoComponent implements OnInit {
  productoforms: FormGroup = new FormGroup({});
  titulo_formulario = 'Registro de nuevo producto';
  id: number = 0;
  Editar: boolean = false;
  constructor(
    private productoServicio: ProductoService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
    this.productoforms = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      categoria: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      precio: new FormControl('', [
        Validators.required,
        //Validators.minLength(7),
      ]),
      stock: new FormControl('', [
        Validators.required,
        //Validators.minLength(10),
      ]),
      minimo: new FormControl('', [
        Validators.required,
        //Validators.minLength(10),
      ]),
      //correo: new FormControl('', [Validators.required, Validators.email]),
    });
    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        //actualizar
        this.titulo_formulario = 'Actualizar datos de producto';
        this.id = parametros['parametro'];
        this.Editar = true;
        this.productoServicio.unProducto(this.id).subscribe((producto) => {
          this.productoforms.patchValue(producto);
        });
      } else {
        this.productoforms.reset();
      }
    });
  }

  ngOnInit() {}
  guardarProducto() {
    if (this.productoforms.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.Editar == true) {
          const producto = this.productoforms.value;
          producto.id = this.id;
          this.productoServicio
            .actualizarProducto(producto)
            .subscribe((producto) => {
              if (producto == null) {
                Swal.fire('Productos', 'Error al guardar', 'error');
              }
              Swal.fire('Productos', 'Se guardo con exito', 'success');
              this.productoforms.reset();
              this.navegacion.navigate(['']);
            });
        } else {
          const producto = this.productoforms.value;
          this.productoServicio
            .guardarProducto(producto)
            .subscribe((unProducto) => {
              Swal.fire('Productos', 'Se guardo con exito', 'success');
              this.productoforms.reset();
              this.navegacion.navigate(['']);
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Productos', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
}
