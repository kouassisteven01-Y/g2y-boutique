import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import { CartProvider } from './lib/CartContext';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/admin/Dashboard';
import ArticlesList from './pages/admin/ArticlesList';
import ArticleForm from './pages/admin/ArticleForm';
import OrdersList from './pages/admin/OrdersList';
import OrderDetail from './pages/admin/OrderDetail';

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
        <Route path="/gestion" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/nouveau" element={<ArticleForm />} />
          <Route path="articles/:id" element={<ArticleForm />} />
          <Route path="commandes" element={<OrdersList />} />
          <Route path="commandes/:id" element={<OrderDetail />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
