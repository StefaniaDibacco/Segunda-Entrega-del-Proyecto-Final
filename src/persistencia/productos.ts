import Product from '../interfaces/producto';
import fs from 'fs';
import path from 'path';

let elementos: Product[] = require('./../db/productos');

class Productos {
  // Metodo para leer mis productos
  leer(): Product[] {
    try {
      return elementos;
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos
  guardar(
    nombre: string,
    precio: number,
    foto: string,
    descripcion: string,
    codigo: string,
    stock: number
  ): Product | undefined {
    try {
      if (typeof nombre !== 'string')
        throw new Error('Nombre tiene que ser string');
      if (isNaN(precio)) throw new Error('Precio tiene que ser un nro');
      if (typeof foto !== 'string')
        throw new Error('Foto tiene que ser string de url');

      const elemento = {
        id: elementos.length + 1,
        timestamp: Date.now(),
        nombre,
        descripcion,
        precio,
        foto,
        codigo,
        stock,
      };

      elementos.push(elemento);
      this.actualizarDB(elementos);
      return elemento;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  // Metodo para leer un producto
  leerUno(id: number): Product | undefined {
    try {
      const producto = elementos.find((aProduct) => aProduct.id === id);
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar productos
  actualizar(
    id: number,
    nombre: string | null = null,
    precio: number | null = null,
    foto: string | null = null,
    descripcion: string = '',
    codigo: string = '',
    stock: number
  ): Product | undefined {
    try {
      if (typeof nombre !== 'string')
        throw new Error('Titulo tiene que ser string');
      if (typeof precio !== 'number')
        throw new Error('Price tiene que ser un nro');
      if (typeof foto !== 'string')
        throw new Error('Thumbnail tiene que ser string de url');

      const index = elementos.map((aProduct) => aProduct.id).indexOf(id);
      if (index === -1) {
        throw new Error('Producto no encontrado');
      }

      elementos[index].nombre = nombre;
      elementos[index].precio = precio;
      elementos[index].foto = foto;
      elementos[index].descripcion = descripcion;
      elementos[index].codigo = codigo;
      elementos[index].stock = stock;

      this.actualizarDB(elementos);
      return elementos[index];
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para borrar un producto
  borrarUno(id: number): Product | undefined {
    try {
      const idBuscado = id;
      const productoEliminado = elementos.find(
        (aProduct) => aProduct.id === idBuscado
      );
      elementos = elementos.filter((aProduct) => aProduct.id !== idBuscado);
      this.actualizarDB(elementos);
      return productoEliminado;
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }

  actualizarDB(data: Product[]) {
    fs.writeFileSync(
      path.resolve(__dirname, '../db/productos.json'),
      JSON.stringify(data)
    );
  }
}

export const productsPersistencia = new Productos();
