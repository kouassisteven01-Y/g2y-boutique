import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Placeholder from '../components/Placeholder';
import ProductCard from '../components/ProductCard';
import { AVIS, PRODUCTS, PRODUCT_DETAIL, etoiles, findProduct, prixBarreLabel, prixLabel, remiseLabel } from '../lib/data';
import { useCart } from '../lib/CartContext';

type Tab = 'desc' | 'carac' | 'liv' | 'avis';

const SIMILAR = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[9], PRODUCTS[10]];

// Keyed by product id from the route below, so qty/tab reset naturally on
// navigation between products via remount instead of an effect.
export default function ProductDetail() {
  const { id = '' } = useParams();
  return <ProductDetailView key={id} product={findProduct(id)} />;
}

function ProductDetailView({ product }: { product: ReturnType<typeof findProduct> }) {
  const navigate = useNavigate();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>('desc');

  const tabBtn = (t: Tab, label: string) => (
    <button
      className="btn"
      style={{
        borderRadius: 0,
        padding: '12px 20px',
        borderBottom: tab === t ? '3px solid var(--color-accent)' : undefined,
        color: tab === t ? 'var(--color-accent)' : undefined,
      }}
      onClick={() => setTab(t)}
    >
      {label}
    </button>
  );

  return (
    <>
      <section style={{ padding: '26px 80px 0' }}>
        <nav style={{ fontSize: 12, opacity: 0.6 }}>
          <Link to="/" style={{ color: 'inherit' }}>Accueil</Link> / <Link to="/produits" style={{ color: 'inherit' }}>{product.cat}</Link> / <span>{product.nom}</span>
        </nav>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 48, padding: '24px 80px 48px', alignItems: 'start' }}>
        <div>
          <Placeholder caption={`photo produit — ${product.nom}`} style={{ height: 440, display: 'grid', placeItems: 'center' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 10 }}>
            <Placeholder style={{ height: 86 }} bordered />
            <Placeholder style={{ height: 86 }} />
            <Placeholder style={{ height: 86 }} />
            <Placeholder style={{ height: 86 }} />
          </div>
        </div>
        <div>
          <span style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.5 }}>{product.cat}</span>
          <h1 style={{ margin: '8px 0 10px', fontSize: 34 }}>{product.nom}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, marginBottom: 20 }}>
            <span style={{ color: 'var(--color-accent)' }}>{etoiles(product.note)}</span>
            <span style={{ opacity: 0.6 }}>{product.avis} avis</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.6 }}>Réf. {product.ref}</span>
          </div>
          <div style={{ borderTop: '2px solid var(--color-divider)', borderBottom: '2px solid var(--color-divider)', padding: '18px 0', display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 38, lineHeight: 1 }}>{prixLabel(product)}</strong>
            {product.barre > 0 && <span style={{ fontSize: 15, opacity: 0.45, textDecoration: 'line-through' }}>{prixBarreLabel(product)}</span>}
            <span className="tag tag-accent" style={{ borderRadius: 3, fontWeight: 800 }}>{remiseLabel(product)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, padding: '16px 0' }}>
            <span style={{ color: 'var(--color-accent-700)', fontWeight: 600 }}>{product.stock}</span>
            <span style={{ opacity: 0.7 }}>Livraison estimée à Abidjan : 24 à 48 h · Retrait boutique sous 2 h</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 16 }}>
            <span style={{ fontSize: 12, opacity: 0.65 }}>Format</span>
            <div className="seg" style={{ borderRadius: 4, alignSelf: 'flex-start' }}>
              <label className="seg-opt"><input type="radio" name="fmt" defaultChecked />Unité</label>
              <label className="seg-opt"><input type="radio" name="fmt" />Lot de 10</label>
              <label className="seg-opt"><input type="radio" name="fmt" />Carton de 50</label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-divider)', borderRadius: 4, background: 'var(--color-neutral-100)' }}>
              <button className="btn" style={{ width: 40, justifyContent: 'center', fontSize: 18 }} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span style={{ width: 44, textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>{qty}</span>
              <button className="btn" style={{ width: 40, justifyContent: 'center', fontSize: 18 }} onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn-primary" style={{ flex: 1, borderRadius: 4, justifyContent: 'flex-start', padding: '13px 18px', fontSize: 15 }} onClick={() => add(product.id, qty)}>Ajouter au panier</button>
          </div>
          <button
            className="btn btn-secondary"
            style={{ width: '100%', borderRadius: 4, justifyContent: 'flex-start', padding: '13px 18px', fontSize: 15 }}
            onClick={() => {
              add(product.id, qty);
              navigate('/commande');
            }}
          >
            Acheter maintenant
          </button>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20, fontSize: 11 }}>
            <span className="tag tag-neutral" style={{ borderRadius: 3 }}>Orange Money</span>
            <span className="tag tag-neutral" style={{ borderRadius: 3 }}>MTN MoMo</span>
            <span className="tag tag-neutral" style={{ borderRadius: 3 }}>Wave</span>
            <span className="tag tag-neutral" style={{ borderRadius: 3 }}>Moov Money</span>
            <span className="tag tag-neutral" style={{ borderRadius: 3 }}>Carte bancaire</span>
            <span className="tag tag-neutral" style={{ borderRadius: 3 }}>Paiement à la livraison</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 80px 48px' }}>
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--color-divider)' }}>
          {tabBtn('desc', 'Description')}
          {tabBtn('carac', 'Caractéristiques')}
          {tabBtn('liv', 'Livraison et retours')}
          {tabBtn('avis', `Avis (${product.avis})`)}
        </div>
        {tab === 'desc' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, paddingTop: 28 }}>
            <div>
              <p style={{ maxWidth: '64ch' }}>{PRODUCT_DETAIL.description}</p>
              <h4 style={{ marginTop: 24 }}>Contenu du lot</h4>
              <ul style={{ fontSize: 14, paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {PRODUCT_DETAIL.contenu.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 12px' }}>Caractéristiques techniques</h4>
              <table className="table">
                <tbody>
                  {PRODUCT_DETAIL.specs.map((s) => (
                    <tr key={s.k}><td style={{ opacity: 0.6, width: '45%' }}>{s.k}</td><td style={{ fontWeight: 600 }}>{s.v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'carac' && (
          <div style={{ paddingTop: 28, maxWidth: 560 }}>
            <table className="table">
              <tbody>
                {PRODUCT_DETAIL.specs.map((s) => (
                  <tr key={s.k}><td style={{ opacity: 0.6, width: '45%' }}>{s.k}</td><td style={{ fontWeight: 600 }}>{s.v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'liv' && (
          <div style={{ paddingTop: 28 }}>
            <p style={{ maxWidth: '64ch' }}>Livraison à Abidjan sous 24 à 48 h, intérieur du pays sous 72 h via nos partenaires transport. Retrait gratuit en boutique à Cocody Angré (Cocody Angré, sous 2 h). Retours acceptés sous 7 jours, produit non ouvert, accompagné de la facture.</p>
          </div>
        )}
        {tab === 'avis' && (
          <div style={{ paddingTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {AVIS.map((a) => (
              <blockquote key={a.auteur} style={{ margin: 0, background: 'var(--color-neutral-100)', borderRadius: 4, padding: 22, boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ color: 'var(--color-accent)', fontSize: 13 }}>{a.etoiles}</span>
                <p style={{ fontSize: 14, margin: '10px 0 14px' }}>{a.texte}</p>
                <footer style={{ fontSize: 12, opacity: 0.6 }}>{a.auteur} — {a.lieu}</footer>
              </blockquote>
            ))}
          </div>
        )}
      </section>

      <section style={{ padding: '0 80px 64px' }}>
        <div style={{ borderTop: '2px solid var(--color-divider)', paddingTop: 28, marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Souvent achetés ensemble</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {SIMILAR.map((p) => (
            <ProductCard key={p.id} product={p} variant="similar" onAdd={(pid) => add(pid, 1)} />
          ))}
        </div>
      </section>
    </>
  );
}
