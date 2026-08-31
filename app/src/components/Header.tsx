import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../lib/CartContext';

const CATEGORY_LINKS = [
  'Papeterie',
  'Livres et manuels',
  'Mobilier de bureau',
  'Fournitures scolaires',
  "Consommables d'impression",
  'Rangement et classement',
  'Informatique',
];

export default function Header() {
  const navigate = useNavigate();
  const { cartCount, subtotalLabel } = useCart();

  return (
    <>
      <div style={{ background: 'var(--color-text)', color: 'var(--color-neutral-100)', fontSize: 12, padding: '7px 80px', display: 'flex', gap: 24, alignItems: 'center' }}>
        <span>Livraison Abidjan &amp; intérieur du pays</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Retrait en boutique gratuit</span>
        <span style={{ marginLeft: 'auto' }}>Support : +225 27 22 00 00 00</span>
      </div>

      <header style={{ background: 'var(--color-neutral-100)', borderBottom: '2px solid var(--color-divider)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '18px 80px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit', marginRight: 8 }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 38, height: 38, background: 'var(--color-accent)', color: 'var(--color-neutral-100)', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17 }}>G2</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19, letterSpacing: '-.01em', lineHeight: 1.05 }}>
              G2Y CONSEIL
              <span style={{ display: 'block', fontSize: 10, fontWeight: 400, letterSpacing: '.14em', opacity: 0.55 }}>BUREAU &amp; SCOLAIRE</span>
            </span>
          </Link>
          <form
            style={{ flex: 1, display: 'flex', border: '1px solid var(--color-divider)', borderRadius: 4, overflow: 'hidden', background: 'var(--color-bg)', maxWidth: 620 }}
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/produits');
            }}
          >
            <select className="input" style={{ width: 200, border: 0, borderRight: '1px solid var(--color-divider)', borderRadius: 0, background: 'transparent', fontSize: 13 }}>
              <option>Toutes catégories</option>
              <option>Papeterie</option>
              <option>Livres et manuels</option>
              <option>Mobilier de bureau</option>
              <option>Fournitures scolaires</option>
              <option>Consommables d'impression</option>
              <option>Rangement et classement</option>
              <option>Informatique</option>
            </select>
            <input className="input" style={{ border: 0, borderRadius: 0, background: 'transparent' }} placeholder="Rechercher un article, une référence…" />
            <button className="btn btn-primary" style={{ borderRadius: 0, paddingInline: 20 }} type="submit">Rechercher</button>
          </form>
          <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit', fontSize: 13 }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, border: '1px solid var(--color-divider)', borderRadius: 4 }}>☺</span>
            <span>Mon compte<span style={{ display: 'block', opacity: 0.55, fontSize: 11 }}>Connexion</span></span>
          </a>
          <Link to="/panier" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit', fontSize: 13 }}>
            <span style={{ position: 'relative', display: 'grid', placeItems: 'center', width: 34, height: 34, border: '1px solid var(--color-divider)', borderRadius: 4 }}>
              ▤
              <span style={{ position: 'absolute', top: -7, right: -7, minWidth: 18, height: 18, display: 'grid', placeItems: 'center', background: 'var(--color-accent)', color: 'var(--color-neutral-100)', fontSize: 11, fontWeight: 800, borderRadius: 9, padding: '0 4px' }}>
                {cartCount}
              </span>
            </span>
            <span>Panier<span style={{ display: 'block', opacity: 0.55, fontSize: 11 }}>{subtotalLabel}</span></span>
          </Link>
        </div>
        <nav style={{ display: 'flex', gap: 28, padding: '0 80px 12px', fontSize: 13 }}>
          {CATEGORY_LINKS.map((label, i) => (
            <Link
              key={label}
              to="/produits"
              style={i === 0 ? { color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 } : { color: 'inherit', textDecoration: 'none' }}
            >
              {label}
            </Link>
          ))}
          <Link to="/produits" style={{ color: 'inherit', textDecoration: 'none', marginLeft: 'auto', opacity: 0.6 }}>Promotions</Link>
        </nav>
      </header>
    </>
  );
}
