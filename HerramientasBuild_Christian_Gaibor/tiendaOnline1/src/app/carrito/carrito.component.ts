import { Component, OnInit } from '@angular/core';
import { CarShopingService } from '../car-shoping.service';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos : any[] = [];
  total = 0;
  loading = false;
  error:string;
  constructor(private carShopingService : CarShopingService, private httpService : HttpService, private router: Router) { }

  ngOnInit() {
    this.carShopingService.getAllProductsCarrito().subscribe(productos=>{
      this.productos=productos;
    })
  }

  pagar(){
    //EXISTE UN PROBLEMA AL PAGAR DESPUES DE LA PRIMERA VEZ, SE DEBE ACTUALIZAR LA PAGINA PARA QUE EL CARRITO SE ENCERE
    this.carShopingService.updateProductPagar(this.productos);
    console.log('productos',this.productos);
  }
}
