import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly rutaAPI = 'https://localhost:7112/api/Usuarios';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.rutaAPI, { correo:email, pwd:password });
  }
  logout() {
    localStorage.removeItem('User');
    location.href = '/login';
  }
}
