import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

import autoTable, { RowInput } from 'jspdf-autotable';
import { IProducto } from '../interfases/iproducto';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  async generarPDF(lista_productos:IProducto[], titulo = "Lista de Productos"  ):Promise<Blob>{
    const doc = new jsPDF({orientation: 'portrait',unit:'pt',format:'a4'});

    doc.setFontSize(16);
    doc.text(titulo,40,40)

    doc.setFontSize(12);
    doc.text(`Generado ${new Date().toLocaleDateString()}`,40,50)

    const cabecera = [['#','Nombre','Descripcion','Categoria','Precio','Stock','Minimo']]
    const body:RowInput[] = lista_productos.map(producto =>[
      String(producto.id),
      producto.nombre,
      producto.descripcion,
      producto.categoria,
      producto.precio,
      producto.stock,
      producto.minimo
    ])

    autoTable(doc,{
      head: cabecera,
      body:body,
      startY: 70,
      styles:{fontSize:9, cellPadding:6, overflow:'linebreak'},
      headStyles:{fillColor:[30,64,175]},
      columnStyles:{
        0:{cellWidth:40},
        1:{cellWidth:100},
        2:{cellWidth:100},
        3:{cellWidth:60},
        4:{cellWidth:60},
        5:{cellWidth:60}
      },
      didDrawPage: data => {
        const str = `Pagina ${data.pageNumber} de ${doc.internal.pages}`
        doc.setFontSize(10);
        doc.text(str, doc.internal.pageSize.getWidth()-60,doc.internal.pageSize.getHeight()-10)
      }
    })

    const blob = await doc.output('blob')
    return blob;
  }

  descargarBlob(blob:Blob, nombre = "lista.pdf"){
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = nombre
    a.href = url
    a.click()
    URL.revokeObjectURL(url)
  }

}
