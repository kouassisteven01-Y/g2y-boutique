import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './lib/CartContext';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<ProductList />} />
          <Route path="/produits/:id" element={<ProductDetail />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/commande" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
