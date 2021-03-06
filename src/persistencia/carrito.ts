import { ProductI } from '../interfaces/producto';
import path from 'path';
import env from 'dotenv';
env.config();

const tipoMemoria = path.resolve(
  __dirname,
  `./../dbController/${process.env.DB_CONFIG}.ts`
);
const DBController = require(tipoMemoria);
console.log(tipoMemoria);
class Carrito {
  // Metodo para leer productos del carrito
  async leer(_id: string) {
    try {
      const carrito = await DBController.leerC(_id);
      return carrito;
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos al carrito
  async guardar(producto: ProductI, idCarrito: string) {
    try {
      return await DBController.guardarC(producto, idCarrito);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
      return false;
    }
  }

  // Metodo para borrar productos del carrito
  async borrar(idProducto: string, idCarrito: string) {
    try {
      return await DBController.borrarUnPdeC(idCarrito, idProducto);
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
      return false;
    }
  }
}

export const carritoPersistencia = new Carrito();
