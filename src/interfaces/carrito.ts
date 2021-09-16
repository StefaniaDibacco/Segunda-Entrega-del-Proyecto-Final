import ProductI from './producto';

export default interface Carrito {
  id: number;
  timestamp: number;
  productos: ProductI[];
}
