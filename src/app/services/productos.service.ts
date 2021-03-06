import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto} from '../interfaces/producto.interface'



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando= true;
  productos : Producto[]=[];
  productosFiltrado : Producto [] = [];

  constructor(private http: HttpClient) {  


      this.cargarProductos();

  }

  private cargarProductos(){

    return new Promise( (resolve , reject ) => {
      
      this.http.get('https://angular-html-ed40c.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto [])=>{
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 1000);
        resolve();
      
      });
    });

  }

  getProducto( id : string ){
  return this.http.get(`https://angular-html-ed40c.firebaseio.com/productos/${ id }.json`)
  } 

// buscar los productos, con el metodo

  buscarProducto( termino : string ){

    if (this.productos.length == 0 ){
      // cargar productos 
      this.cargarProductos().then(()=>{
        //ejecutar despues de tener los productos 
        // aplicar filtro
        this.filtrarProductos(termino);      })
    } else {
      //APLCAR EL FILTRO  
      this.filtrarProductos(termino);  
    }
    
  }

  private filtrarProductos (termino : string ){

    //console.log( this.productos);

    this.productosFiltrado = []; 
    
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || prod.titulo.indexOf(termino) >= 0){

        this.productosFiltrado.push( prod );
      }else {
        // en caso de que no encuentre el producto o categoria
      }
    });
  }
}