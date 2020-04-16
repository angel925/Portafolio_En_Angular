import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  
  producto: ProductoDescripcion;
  id: string;

  constructor(private route: ActivatedRoute,
              public _Producto: ProductosService ) { // inyecto el servicio que me toma los parametros de los codigos de productos
              
  }

  ngOnInit(): void {

    this.route.params
    .subscribe(parametros =>{
      //console.log(parametros["id"]);
      this._Producto.getProducto(parametros["id"])// obtengo los parametros resividos por el servicio que me toma los cod de
                                                 //productos
      .subscribe( (producto: ProductoDescripcion )=> {
        this.id = parametros["id"];
        this.producto = producto;
       // console.log(producto)
      });


    })
  }

}
