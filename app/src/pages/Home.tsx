import { Link } from 'react-router-dom';
import Placeholder from '../components/Placeholder';
import ProductCard from '../components/ProductCard';
import { AVIS, CATS, PRODUCTS } from '../lib/data';
import { useCart } from '../lib/CartContext';

const BEST_SELLERS = [PRODUCTS[3], PRODUCTS[1], PRODUCTS[0], PRODUCTS[4]];
const NEW_ARRIVALS = [PRODUCTS[5], PRODUCTS[7], PRODUCTS[9], PRODUCTS[11]];

export default function Home() {
  const { add } = useCart();

  return (
    <>
      <section style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', background: 'var(--color-accent)', color: 'var(--color-neutral-100)' }}>
        <div style={{ padding: '64px 80px 60px' }}>
          <span style={{ display: 'inline-block', fontSize: 11, letterSpacing: '.16em', border: '1px solid rgba(255,255,255,.5)', padding: '4px 10px', marginBottom: 22 }}>RENTRÉE 2026</span>
          <h1 style={{ fontSize: 60, lineHeight: 0.98, margin: '0 0 18px', maxWidth: '12ch' }}>TOUT LE BUREAU, TOUTE L'ÉCOLE.</h1>
          <p style={{ fontSize: 17, maxWidth: '44ch', opacity: 0.92, marginBottom: 26 }}>Packs scolaires prêts à partir, mobilier et consommables livrés à Abidjan en 24 h. Jusqu'à −25 % sur les lots.</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link to="/produits" className="btn" style={{ background: 'var(--color-neutral-100)', color: 'var(--color-text)', borderRadius: 4, padding: '12px 22px', fontSize: 15 }}>Acheter maintenant</Link>
            <Link to="/produits" className="btn" style={{ border: '1px solid rgba(255,255,255,.6)', color: 'var(--color-neutral-100)', borderRadius: 4, padding: '12px 22px', fontSize: 15 }}>Voir les packs scolaires</Link>
          </div>
        </div>
        <Placeholder caption="visuel hero — rentrée scolaire" style={{ minHeight: 380, display: 'grid', placeItems: 'center', borderRadius: 0 }} />
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '2px solid var(--color-divider)', background: 'var(--color-neutral-100)' }}>
        <div style={{ padding: '22px 80px', borderRight: '1px solid var(--color-divider)' }}>
          <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 14 }}>Livraison 24 h à Abidjan</strong>
          <span style={{ fontSize: 12, opacity: 0.6 }}>Intérieur du pays sous 72 h</span>
        </div>
        <div style={{ padding: '22px 24px', borderRight: '1px solid var(--color-divider)' }}>
          <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 14 }}>Paiement sécurisé</strong>
          <span style={{ fontSize: 12, opacity: 0.6 }}>Mobile money, carte, à la livraison</span>
        </div>
        <div style={{ padding: '22px 24px', borderRight: '1px solid var(--color-divider)' }}>
          <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 14 }}>Retrait en boutique</strong>
          <span style={{ fontSize: 12, opacity: 0.6 }}>Cocody Angré, sous 2 h</span>
        </div>
        <div style={{ padding: '22px 24px' }}>
          <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 14 }}>Support 6j/7</strong>
          <span style={{ fontSize: 12, opacity: 0.6 }}>Devis entreprise et écoles</span>
        </div>
      </section>

      <section style={{ padding: '56px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 22 }}>
          <h2 style={{ margin: 0 }}>Catégories</h2>
          <span style={{ fontSize: 13, opacity: 0.55 }}>7 familles d'articles</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--color-divider)' }}>
          {CATS.map((c) => (
            <Link
              key={c.nom}
              to={`/produits?cat=${encodeURIComponent(c.nom)}`}
              style={{ background: 'var(--color-neutral-100)', padding: '22px 20px 20px', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 118 }}
            >
              <span style={{ fontSize: 22, color: 'var(--color-accent)' }}>{c.icone}</span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 15, lineHeight: 1.15 }}>{c.nom}</strong>
              <span style={{ fontSize: 12, opacity: 0.55, marginTop: 'auto' }}>{c.compte} articles</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 80px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20, borderTop: '2px solid var(--color-divider)', paddingTop: 28 }}>
          <h2 style={{ margin: 0 }}>Meilleures ventes</h2>
          <Link to="/produits" style={{ marginLeft: 'auto', fontSize: 13 }}>Tout voir</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {BEST_SELLERS.map((p) => (
            <ProductCard key={p.id} product={p} variant="bestseller" onAdd={(id) => add(id, 1)} />
          ))}
        </div>
      </section>

      <section style={{ margin: '0 80px 56px', background: 'var(--color-text)', color: 'var(--color-neutral-100)', borderRadius: 4, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '44px 44px 40px' }}>
          <span style={{ fontSize: 11, letterSpacing: '.16em', color: 'var(--color-accent-400)' }}>PACKS &amp; LOTS</span>
          <h2 style={{ margin: '12px 0 12px', fontSize: 34, lineHeight: 1.05, color: 'var(--color-neutral-100)' }}>Packs scolaires CP à Terminale, prêts en 1 clic.</h2>
          <p style={{ opacity: 0.75, maxWidth: '46ch' }}>Cahiers, protège-cahiers, stylos, règles et cartable — composés par niveau. Lots bureau pour entreprises : 5 % à 18 % de remise dès 10 unités.</p>
          <Link to="/produits" className="btn btn-primary" style={{ borderRadius: 4, padding: '11px 20px' }}>Composer un pack</Link>
        </div>
        <Placeholder caption="visuel pack scolaire" style={{ background: 'repeating-linear-gradient(135deg,rgba(255,255,255,.06) 0 10px,rgba(255,255,255,.12) 10px 20px)', display: 'grid', placeItems: 'center', minHeight: 260, borderRadius: 0 }} />
      </section>

      <section style={{ padding: '0 80px 56px' }}>
        <div style={{ borderTop: '2px solid var(--color-divider)', paddingTop: 28, marginBottom: 20, display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <h2 style={{ margin: 0 }}>Nouveautés</h2>
          <Link to="/produits" style={{ marginLeft: 'auto', fontSize: 13 }}>Tout voir</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {NEW_ARRIVALS.map((p) => (
            <ProductCard key={p.id} product={p} variant="newArrival" onAdd={(id) => add(id, 1)} />
          ))}
        </div>
      </section>

      <section style={{ padding: '0 80px 64px' }}>
        <div style={{ borderTop: '2px solid var(--color-divider)', paddingTop: 28, marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Avis clients</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {AVIS.map((a) => (
            <blockquote key={a.auteur} style={{ margin: 0, background: 'var(--color-neutral-100)', borderRadius: 4, padding: 22, boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ color: 'var(--color-accent)', fontSize: 13 }}>{a.etoiles}</span>
              <p style={{ fontSize: 14, margin: '10px 0 14px' }}>{a.texte}</p>
              <footer style={{ fontSize: 12, opacity: 0.6 }}>{a.auteur} — {a.lieu}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
