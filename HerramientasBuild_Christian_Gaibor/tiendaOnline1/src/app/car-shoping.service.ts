import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProductoInterface } from '../models/producto';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class CarShopingService {
  private item : any = {};
  private carShoping : any[] = [];

  constructor(private afs: AngularFirestore) { }

  private productosCollection: AngularFirestoreCollection<ProductoInterface>;
  private productos: Observable<ProductoInterface[]>;
  private productoDoc: AngularFirestoreDocument<ProductoInterface>;
  private producto: Observable<ProductoInterface>;

  setCarShoping(){
    do {
      this.carShoping.pop();
    } while (this.carShoping.length > 0);
  }

  getAllProducts() {
    this.productosCollection = this.afs.collection<ProductoInterface>('producto');
    return this.productos = this.productosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductoInterface;
          data.id = action.payload.doc.id;
          return data;
        });
    }));
  }

  getAllProductsCarrito() {
    this.productosCollection = this.afs.collection('producto', ref => ref.where('carrito', '>', 0));
    return this.productos = this.productosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductoInterface;
          data.id = action.payload.doc.id;
          return data;
        });
    }));
  }

  setItem(producto){
    this.producto = producto;
  }

  getItem() {
    return this.producto;
  }

  agregarItemShoping(cant){
      this.carShoping.push({producto: this.producto, cantidad: cant})
  }

  getCarShopping(){
  	return this.carShoping;
  }

  getOneProduct(id: string) {
    this.productoDoc = this.afs.doc<ProductoInterface>(`producto/${id}`);
    return this.producto = this.productoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ProductoInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  updateProduct(producto: ProductoInterface): void {
    let id = producto.id;
    this.productoDoc = this.afs.doc<ProductoInterface>(`producto/${id}`);
    this.productoDoc.update(producto);
  }

  updateProductPagar(producto:any[] =[]):void{
    for(let e  of producto){
      let id=e.id;
      this.productoDoc = this.afs.doc<ProductoInterface>(`producto/${id}`);
      e.carrito=0;
      this.productoDoc.update(e);
    }
  }

  getCarShoping(){
  	return this.carShoping;
  }

}
