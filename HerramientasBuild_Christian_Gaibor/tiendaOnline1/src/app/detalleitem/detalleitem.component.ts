import { Component, OnInit } from '@angular/core';
import { CarShopingService } from '../car-shoping.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ProductoInterface } from '../../models/producto';

@Component({
  selector: 'app-detalleitem',
  templateUrl: './detalleitem.component.html',
  styleUrls: ['./detalleitem.component.css']
})
export class DetalleitemComponent implements OnInit {
  private producto: Observable<ProductoInterface>;

  constructor(private carShopingService : CarShopingService, private router: Router) { }

  ngOnInit() {
  	this.producto = this.carShopingService.getItem();
  }

  volver() {
  	this.router.navigate(['/dash']);
  }

}
