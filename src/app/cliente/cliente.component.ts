import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../Services/cliente.service';
import { RouterLink } from '@angular/router';
import { ICliente } from '../interfases/icliente';
import { Observable } from 'rxjs';

declare const Swal: any;

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent {
  lista_clientes$!: ICliente[];
  emailuser: string = '';
  constructor(private clienteServicio: ClienteService) {

    this.emailuser = localStorage.getItem('User') || '';
    if (this.emailuser == '') {
      location.href = '/login';
    }
  }

  ngOnInit() {
    this.cargaTabla();
    this.emailuser = localStorage.getItem('User') || '';
    if (this.emailuser == '') {
      location.href = '/login';
    }

  }
  cargaTabla() {
    this.clienteServicio.todos().subscribe((clientes) => {
      this.lista_clientes$ = clientes;
    });
  }

  eliminarCliente(id: number) {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea eliminar este cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#838688ff',
      confirmButtonText: 'Eliminar!!!!!!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminarcliente(id).subscribe((id) => {
          if (id > 0) {
            this.cargaTabla();
            Swal.fire(
              'Cliente Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    });
  }

  variables_sesion(id: number) {
    sessionStorage.setItem('id_cliente', id.toString());
  }
  eliminarvariable() {
    sessionStorage.removeItem('id_cliente');
  }
}
