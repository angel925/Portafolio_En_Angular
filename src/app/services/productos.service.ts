import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto} from '../interfaces/producto.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando= true;
  productos : Producto[]=[];
  constructor(private http: HttpClient) {  


      this.cargarProductos();

  }

  private cargarProductos(){

    this.http.get('https://angular-html-ed40c.firebaseio.com/productos_idx.json')
    .subscribe((resp:Producto [])=>{
      this.productos = resp;
      setTimeout(() => {
        this.cargando = false;
      }, 1000);
    });
  }

  getProducto( id : string ){
  return this.http.get(`https://angular-html-ed40c.firebaseio.com/productos/${ id }.json`)
  } 
}