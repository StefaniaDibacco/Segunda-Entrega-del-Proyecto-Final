import { Request, Response, NextFunction } from 'express';
import { productsPersistencia } from '../persistencia/productos';

class Producto {
  checkAddProducts(req: Request, res: Response, next: NextFunction) {
    // const { nombre, descripcion, precio, foto, codigo, stock } = req.body;

    /* if (
      !nombre ||
      !precio ||
      !descripcion ||
      !foto ||
      !codigo ||
      !stock ||
      typeof nombre !== 'string' ||
      typeof descripcion !== 'string' ||
      isNaN(precio) ||
      typeof foto !== 'string' ||
      isNaN(codigo) ||
      isNaN(stock)
    ) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    } */

    next();
  }

  checkProductExists(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      const id = Number(req.params.id);

      const producto = productsPersistencia.leerUno(id);

      if (!producto) {
        return res.status(404).json({
          msg: 'producto not found',
        });
      }
    }
    next();
  }

  getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    const producto = id
      ? productsPersistencia.leerUno(id)
      : productsPersistencia.leer();

    res.json({
      data: producto,
    });
  }

  addProducts(req: Request, res: Response) {
    const { nombre, descripcion, precio, foto, codigo, stock } = req.body;
    const newItem = productsPersistencia.guardar(
      nombre,
      precio,
      foto,
      descripcion,
      codigo,
      stock
    );

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  updateProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { nombre, precio, foto, descripcion, codigo, stock } = req.body;
    const newItem = productsPersistencia.actualizar(
      id,
      nombre,
      precio,
      foto,
      descripcion,
      codigo,
      stock
    );
    res.json({
      data: newItem,
      msg: 'actualizando producto',
    });
  }

  deleteProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    productsPersistencia.borrarUno(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const productController = new Producto();
