import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CarShopingService } from '../car-shoping.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
	productos : any[] = [];
  producto : any;
	productoFilter: any = {nombre: ''};

  constructor(private carShopingService : CarShopingService,private router: Router){}

  public cantidadAdd;

  ngOnInit() {
    this.carShopingService.getAllProducts().subscribe(productos=>{
      this.productos=productos;
    })
  }

  verMas(articuloSel) {
    this.carShopingService.setItem(articuloSel);
    this.router.navigate(['/dash/detalleitem']);
  }

  addCanasta(articuloSel) {
    this.carShopingService.getOneProduct(articuloSel.id).subscribe(producto => {
      this.producto = producto;
      producto.carrito=this.cantidadAdd;
      this.carShopingService.updateProduct(this.producto);
      this.carShopingService.agregarItemShoping(this.producto);
    });
  }
}
