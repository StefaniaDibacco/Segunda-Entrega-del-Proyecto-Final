import { Request, Response, NextFunction } from 'express';
import { carritoPersistencia } from '../persistencia/carrito';

class Carrito {
  checkAddProducts(req: Request, res: Response, next: NextFunction) {
    next();
  }

  checkProductExists(req: Request, res: Response, next: NextFunction) {
    next();
  }

  getCarrito(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const carrito = carritoPersistencia.leer(id);
      return res.json({
        data: carrito,
      });
    } catch (error) {
      return res.status(404).json({
        mensaje: error,
      });
    }
  }

  addProducts(req: Request, res: Response) {
    const { producto } = req.body;
    const idCarrito = Number(req.params.id_carrito);
    try {
      const newItem = carritoPersistencia.guardar(producto, idCarrito);
      if (newItem) {
        return res.json({
          msg: 'carrito agregado con exito',
          data: producto,
        });
      }
      throw new Error('error al agregar producto');
    } catch (error) {
      return res.status(404).json({
        msg: error,
      });
    }
  }

  deleteProduct(req: Request, res: Response) {
    const idProduct = Number(req.body.id_product);
    const idCarrito = Number(req.params.id_carrito);
    try {
      const borrado = carritoPersistencia.borrar(idProduct, idCarrito);
      if (borrado) {
        return res.json({
          msg: 'producto borrado del carrito con exito',
        });
      }
      throw new Error('error al borrar producto');
    } catch (error) {
      return res.status(404).json({
        msg: error,
      });
    }
  }
}

export const carritoController = new Carrito();
