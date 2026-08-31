import { Link, useNavigate } from 'react-router-dom';
import Placeholder from '../components/Placeholder';
import { findProduct, fmt } from '../lib/data';
import { useCart } from '../lib/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, cartCount, setQty, remove, subtotalLabel, shippingLabel, discountLabel, totalLabel } = useCart();

  return (
    <section style={{ padding: '26px 80px 64px' }}>
      <nav style={{ fontSize: 12, opacity: 0.6, marginBottom: 14 }}>
        <Link to="/" style={{ color: 'inherit' }}>Accueil</Link> / <span>Panier</span>
      </nav>
      <h1 style={{ margin: '0 0 24px', fontSize: 36 }}>
        Mon panier <span style={{ fontSize: 18, fontWeight: 400, opacity: 0.55 }}>{cartCount} article(s)</span>
      </h1>

      {cart.length === 0 && (
        <div style={{ background: 'var(--color-neutral-100)', borderRadius: 4, padding: 56, textAlign: 'left', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ margin: '0 0 8px' }}>Votre panier est vide</h3>
          <p style={{ opacity: 0.65, maxWidth: '48ch' }}>Parcourez les meilleures ventes ou composez un pack scolaire pour commencer.</p>
          <Link to="/produits" className="btn btn-primary" style={{ borderRadius: 4 }}>Voir le catalogue</Link>
        </div>
      )}

      {cart.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 36, alignItems: 'start' }}>
          <div style={{ background: 'var(--color-neutral-100)', borderRadius: 4, boxShadow: 'var(--shadow-sm)' }}>
            {cart.map((l) => {
              const p = findProduct(l.id);
              return (
                <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 18, padding: 18, borderBottom: '1px solid var(--color-divider)', alignItems: 'start' }}>
                  <Placeholder style={{ height: 96 }} />
                  <div>
                    <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 15, display: 'block' }}>{p.nom}</strong>
                    <span style={{ fontSize: 12, opacity: 0.55, display: 'block', margin: '4px 0 10px' }}>Réf. {p.ref} · {fmt(p.prix)} l'unité</span>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-divider)', borderRadius: 4 }}>
                        <button className="btn" style={{ width: 32, height: 32, justifyContent: 'center' }} onClick={() => setQty(l.id, -1)}>−</button>
                        <span style={{ width: 34, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>{l.qty}</span>
                        <button className="btn" style={{ width: 32, height: 32, justifyContent: 'center' }} onClick={() => setQty(l.id, 1)}>+</button>
                      </div>
                      <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => remove(l.id)}>Supprimer</button>
                    </div>
                  </div>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 18, whiteSpace: 'nowrap' }}>{fmt(p.prix * l.qty)}</strong>
                </div>
              );
            })}
            <div style={{ padding: 18, display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div className="field" style={{ flex: 1, maxWidth: 280 }}>
                <label>Code promo</label>
                <input className="input" style={{ borderRadius: 4 }} placeholder="RENTREE26" />
              </div>
              <button className="btn btn-secondary" style={{ borderRadius: 4, padding: '9px 16px' }}>Appliquer</button>
            </div>
          </div>

          <aside style={{ background: 'var(--color-neutral-100)', borderRadius: 4, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ margin: '0 0 16px' }}>Récapitulatif</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14, borderBottom: '2px solid var(--color-divider)', paddingBottom: 16 }}>
              <div style={{ display: 'flex' }}><span style={{ opacity: 0.65 }}>Sous-total</span><span style={{ marginLeft: 'auto', fontWeight: 600 }}>{subtotalLabel}</span></div>
              <div style={{ display: 'flex' }}><span style={{ opacity: 0.65 }}>Livraison estimée (Abidjan)</span><span style={{ marginLeft: 'auto', fontWeight: 600 }}>{shippingLabel}</span></div>
              <div style={{ display: 'flex' }}><span style={{ opacity: 0.65 }}>Remise lot</span><span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--color-accent-700)' }}>{discountLabel}</span></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', padding: '16px 0 20px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16 }}>Total</span>
              <strong style={{ marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontSize: 26 }}>{totalLabel}</strong>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', borderRadius: 4, justifyContent: 'flex-start', padding: '13px 18px', fontSize: 15 }} onClick={() => navigate('/commande')}>Passer la commande</button>
            <Link to="/produits" className="btn btn-secondary" style={{ width: '100%', borderRadius: 4, justifyContent: 'flex-start', padding: '13px 18px', marginTop: 10 }}>Continuer mes achats</Link>
            <p style={{ fontSize: 11, opacity: 0.55, margin: '16px 0 0' }}>Paiement Orange Money, MTN MoMo, Wave, Moov Money, carte bancaire ou à la livraison.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
