import { Link } from 'react-router-dom';
import Placeholder from '../components/Placeholder';
import { findProduct, fmt } from '../lib/data';
import { useCart } from '../lib/CartContext';

const ORDER_NO = 'G2Y-2026-04871';

export default function Confirmation() {
  const { cart, totalLabel } = useCart();

  return (
    <section style={{ padding: '56px 80px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 36, alignItems: 'start' }}>
        <div>
          <span style={{ display: 'inline-block', background: 'var(--color-accent)', color: 'var(--color-neutral-100)', fontSize: 11, letterSpacing: '.14em', padding: '5px 12px', marginBottom: 20 }}>COMMANDE CONFIRMÉE</span>
          <h1 style={{ margin: '0 0 12px', fontSize: 44, lineHeight: 1.02, maxWidth: '20ch' }}>Merci, votre commande est enregistrée.</h1>
          <p style={{ fontSize: 16, opacity: 0.7, maxWidth: '56ch' }}>Un SMS de confirmation a été envoyé au numéro indiqué. Vous pouvez suivre la préparation depuis votre compte.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'var(--color-divider)', margin: '28px 0' }}>
            <div style={{ background: 'var(--color-neutral-100)', padding: 18 }}>
              <span style={{ fontSize: 11, letterSpacing: '.08em', opacity: 0.55, textTransform: 'uppercase' }}>Commande</span>
              <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 18, marginTop: 4 }}>{ORDER_NO}</strong>
            </div>
            <div style={{ background: 'var(--color-neutral-100)', padding: 18 }}>
              <span style={{ fontSize: 11, letterSpacing: '.08em', opacity: 0.55, textTransform: 'uppercase' }}>Montant payé</span>
              <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 18, marginTop: 4 }}>{totalLabel}</strong>
            </div>
            <div style={{ background: 'var(--color-neutral-100)', padding: 18 }}>
              <span style={{ fontSize: 11, letterSpacing: '.08em', opacity: 0.55, textTransform: 'uppercase' }}>Livraison estimée</span>
              <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 18, marginTop: 4 }}>Mardi 2 sept.</strong>
            </div>
          </div>

          <h4 style={{ margin: '0 0 10px' }}>Suivi</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--color-divider)' }}>
            <div style={{ background: 'var(--color-neutral-100)', padding: 14, borderTop: '4px solid var(--color-accent)' }}>
              <strong style={{ fontSize: 13, fontFamily: 'var(--font-heading)' }}>Payée</strong>
              <span style={{ display: 'block', fontSize: 11, opacity: 0.55 }}>31 août, 14:02</span>
            </div>
            <div style={{ background: 'var(--color-neutral-100)', padding: 14, borderTop: '4px solid var(--color-accent-300)' }}>
              <strong style={{ fontSize: 13, fontFamily: 'var(--font-heading)' }}>En préparation</strong>
              <span style={{ display: 'block', fontSize: 11, opacity: 0.55 }}>En cours</span>
            </div>
            <div style={{ background: 'var(--color-neutral-100)', padding: 14, borderTop: '4px solid var(--color-neutral-300)' }}>
              <strong style={{ fontSize: 13, fontFamily: 'var(--font-heading)', opacity: 0.5 }}>Expédiée</strong>
              <span style={{ display: 'block', fontSize: 11, opacity: 0.4 }}>—</span>
            </div>
            <div style={{ background: 'var(--color-neutral-100)', padding: 14, borderTop: '4px solid var(--color-neutral-300)' }}>
              <strong style={{ fontSize: 13, fontFamily: 'var(--font-heading)', opacity: 0.5 }}>Livrée</strong>
              <span style={{ display: 'block', fontSize: 11, opacity: 0.4 }}>—</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button className="btn btn-primary" style={{ borderRadius: 4, padding: '12px 20px' }}>Voir ma commande</button>
            <Link to="/" className="btn btn-secondary" style={{ borderRadius: 4, padding: '12px 20px' }}>Retour à la boutique</Link>
          </div>
        </div>

        <aside style={{ background: 'var(--color-neutral-100)', borderRadius: 4, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 14px' }}>Détail</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px solid var(--color-divider)', paddingBottom: 16 }}>
            {cart.map((l) => {
              const p = findProduct(l.id);
              return (
                <div key={l.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Placeholder style={{ width: 44, height: 44, flex: 'none' }} />
                  <span style={{ fontSize: 13, lineHeight: 1.25 }}>{p.nom}<span style={{ display: 'block', opacity: 0.55, fontSize: 11 }}>× {l.qty}</span></span>
                  <strong style={{ marginLeft: 'auto', fontSize: 13 }}>{fmt(p.prix * l.qty)}</strong>
                </div>
              );
            })}
          </div>
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--color-divider)' }}>
            <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.55 }}>Adresse de livraison</span>
            <p style={{ fontSize: 13, margin: '6px 0 0' }}>
              Koffi Aya<br />
              Cocody, Angré 8e tranche<br />
              Rue des Jardins, en face de la pharmacie<br />
              Abidjan · +225 07 00 00 00 00
            </p>
          </div>
          <div style={{ paddingTop: 16 }}>
            <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.55 }}>Paiement</span>
            <p style={{ fontSize: 13, margin: '6px 0 0' }}>Wave · {totalLabel}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
