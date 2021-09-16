import { Router } from 'express';
import { carritoController } from '../controllers/carrito';
import { checkUser } from '../middleware/user';

const router = Router();

router.get(
  '/listar/:id?',
  [checkUser, carritoController.checkProductExists],
  carritoController.getCarrito
);

router.post(
  '/agregar/:id_carrito',
  [checkUser, carritoController.checkAddProducts],
  carritoController.addProducts
);

router.delete(
  '/borrar/:id_carrito',
  [checkUser, carritoController.checkProductExists],
  carritoController.deleteProduct
);

export default router;
