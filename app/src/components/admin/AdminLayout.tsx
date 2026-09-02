import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NAV = [
  { to: '/gestion', label: 'Tableau de bord', end: true },
  { to: '/gestion/articles', label: 'Articles' },
  { to: '/gestion/commandes', label: 'Commandes' },
];

const linkStyle = (active: boolean): React.CSSProperties => ({
  display: 'block',
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: active ? 700 : 400,
  color: active ? 'var(--color-accent)' : 'var(--color-text)',
  textDecoration: 'none',
  borderLeft: active ? '3px solid var(--color-accent)' : '3px solid transparent',
  background: active ? 'var(--color-accent-100)' : 'transparent',
});

export default function AdminLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ minWidth: 1280, minHeight: '100vh', display: 'grid', gridTemplateColumns: '240px 1fr', fontFamily: 'var(--font-body)', color: 'var(--color-text)', background: 'var(--color-bg)' }}>
      <aside style={{ borderRight: '2px solid var(--color-divider)', background: 'var(--color-neutral-100)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px' }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, background: 'var(--color-accent)', color: 'var(--color-neutral-100)', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14 }}>G2</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15, lineHeight: 1.1 }}>
            G2Y CONSEIL
            <span style={{ display: 'block', fontSize: 10, fontWeight: 400, letterSpacing: '.1em', opacity: 0.55 }}>ESPACE DE GESTION</span>
          </span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', borderTop: '2px solid var(--color-divider)', paddingTop: 8 }}>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} style={({ isActive }) => linkStyle(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/"
          style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '2px solid var(--color-divider)', fontSize: 13, color: 'var(--color-text)', opacity: 0.65, textDecoration: 'none' }}
        >
          ← Retour à la boutique
        </Link>
      </aside>
      <main style={{ padding: '32px 40px' }}>
        <Outlet />
      </main>
    </div>
  );
}
