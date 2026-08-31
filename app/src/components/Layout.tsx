import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ minWidth: 1440, fontFamily: 'var(--font-body)', color: 'var(--color-text)', background: 'var(--color-bg)' }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
