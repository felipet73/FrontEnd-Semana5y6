import { UsuariosService } from './../../Services/usuarios.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
declare const Swal: any;

@Component({
  selector: 'app-login.component',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.component.html',
  styleUrl: './login.component.component.css'
})
export class LoginComponent implements OnInit {
  loginforms: FormGroup = new FormGroup({});
  titulo_formulario = 'Login';
  emailuser: string = '';

constructor(
    private usuariosServicio: UsuariosService,
    private navegacion: Router,
    private parametros: ActivatedRoute
  ) {
    this.loginforms = new FormGroup({
      correo: new FormControl('', [
        Validators.required,
      ]),
      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.parametros.params.subscribe((parametros) => {
        this.loginforms.reset();
    });
  }

  ngOnInit() {
    this.emailuser = '';
  }
  Login() {
    if (this.loginforms.invalid) {
      console.log('Formulario invalido');
      Swal.fire({
                  title: 'Error',
                  text: 'Ingrese todos los datos del formulario',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
      return;
    }
      const usuario = this.loginforms.value;
          this.usuariosServicio
            .login(usuario.correo, usuario.pwd)
            .pipe(
              catchError( (err:any) => {
                localStorage.removeItem('User');
                Swal.fire({
                  title: 'Error',
                  text: 'Usuario o contraseña incorrecta',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
                return [];
              })
            )
            .subscribe( (unUsuario) => {
              console.log(unUsuario, 'usuario logueado');
              if (!unUsuario) {
                Swal.fire({
                  title: 'Error',
                  text: 'Usuario o contraseña incorrecta',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              } else {
                localStorage.setItem('User', usuario.correo);
                this.emailuser = usuario.correo;
                this.loginforms.reset();
                  document.location.reload();
                  this.navegacion.navigate(['/clientes']);
              }
            }
          );
  }
}
