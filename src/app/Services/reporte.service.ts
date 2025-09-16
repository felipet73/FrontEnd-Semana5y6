import { IProducto } from './../interfases/iproducto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private readonly rutaAPI = 'https://localhost:7112/api/Productos';

  constructor(private http: HttpClient) { }

  async todos():Promise<IProducto[]> {
    const lista_productos = this.http.get<IProducto[]>(this.rutaAPI);
    return await firstValueFrom(lista_productos);
  }

}
