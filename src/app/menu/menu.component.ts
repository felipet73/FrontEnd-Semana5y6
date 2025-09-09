import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../Services/usuarios.service';
@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  emailuser: string = '';
  constructor(private usuarioServicio: UsuariosService) {
    this.emailuser = localStorage.getItem('User') || "";
  }

  ngOnInit() {
    this.emailuser = localStorage.getItem('User') || "";
  }

  cerrarSesion() {
    localStorage.removeItem('User');
    this.emailuser = '';
    this.usuarioServicio.logout();
  }
}
