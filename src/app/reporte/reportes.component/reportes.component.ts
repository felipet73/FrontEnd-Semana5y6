import { PdfService } from './../../Services/pdf.service';
import { ReporteService } from './../../Services/reporte.service';
import { IProducto } from './../../interfases/iproducto';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes.component',
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent implements OnInit {
  cargado = false;
  lista_productos: IProducto[] = [];
  constructor(private reporteService: ReporteService, private pdfServicio: PdfService) {}

  ngOnInit(): void {
    this.cargado = true;
    try {
      this.reporteService.todos().then((lista) => (this.lista_productos = lista));
    } catch (error) {
      console.log(error);
    } finally {
      this.cargado = false;
    }
  }
  async generarPDF() {
    this.cargado = true;
    try {
      if (this.lista_productos.length < 0) {
        this.reporteService.todos().then((lista) => (this.lista_productos = lista));
      }
      const blob = await this.pdfServicio.generarPDF(this.lista_productos);
      this.pdfServicio.descargarBlob(blob);
    } catch (e) {
      console.log('error', e);
      alert('No se puedo generar el pdf');
    } finally {
      this.cargado = false;
    }
  }
}
