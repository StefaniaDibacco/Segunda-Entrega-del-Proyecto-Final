import CarritoI from '../interfaces/carrito';
import ProductI from '../interfaces/producto';
import fs from 'fs';
import path from 'path';

const carritos: CarritoI[] = require('./../db/carritos');

class Carrito {
  // Metodo para leer productos del carrito
  leer(id: number): CarritoI | undefined | [] {
    try {
      const carrito = carritos.find((c) => c.id === id);
      return carrito;
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos al carrito
  guardar(producto: ProductI, idCarrito: number) {
    try {
      const index = carritos.map((carrito) => carrito.id).indexOf(idCarrito);
      if (index === -1) {
        throw new Error('Carrito no encontrado');
      }
      carritos[index].productos.push(producto);
      this.actualizarDB(carritos);
      return true;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
      return false;
    }
  }

  // Metodo para borrar productos del carrito
  borrar(idProducto: number, idCarrito: number) {
    try {
      const index = carritos.map((carrito) => carrito.id).indexOf(idCarrito);
      if (index === -1) {
        throw new Error('Carrito no encontrado');
      }
      carritos[index].productos = carritos[index].productos.filter(
        (aProduct) => aProduct.id !== idProducto
      );
      this.actualizarDB(carritos);
      return true;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
      return false;
    }
  }

  actualizarDB(data: CarritoI[]) {
    fs.writeFileSync(
      path.resolve(__dirname, '../db/carritos.json'),
      JSON.stringify(data)
    );
  }
}

export const carritoPersistencia = new Carrito();
