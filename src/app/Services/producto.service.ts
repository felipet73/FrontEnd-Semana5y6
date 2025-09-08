import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProducto } from '../interfases/iproducto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly rutaAPI = 'https://localhost:7112/api/Productos';
  constructor(private http: HttpClient) {}

  todos(): Observable<IProducto[]> {
    var productos = this.http
      .get<IProducto[]>(this.rutaAPI)
      .pipe(catchError(this.manejoErrores));
    return productos;
  }
  manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
    });
  }

  guardarProducto(producto: IProducto): Observable<IProducto> {
    return this.http
      .post<IProducto>(this.rutaAPI, producto)
      .pipe(catchError(this.manejoErrores));
  }
  actualizarProducto(producto: IProducto): Observable<IProducto> {
    return this.http
      .put<IProducto>(`${this.rutaAPI}/${producto.id}`, producto)
      .pipe(catchError(this.manejoErrores));
  }
  unProducto(id: number): Observable<IProducto> {
    return this.http
      .get<IProducto>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
  eliminarProducto(id:number): Observable<number>{
    return this.http
      .delete<number>(`${this.rutaAPI}/${id}`)
      .pipe(catchError(this.manejoErrores));
  }
}
