import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../lib/data';
import { useCart } from '../lib/CartContext';

type Sort = 'pertinence' | 'asc' | 'desc' | 'new';

export default function ProductList() {
  const { add } = useCart();
  const [sort, setSort] = useState<Sort>('pertinence');

  const list = useMemo(() => {
    const base = PRODUCTS.slice(0, 9);
    if (sort === 'asc') return base.slice().sort((a, b) => a.prix - b.prix);
    if (sort === 'desc') return base.slice().sort((a, b) => b.prix - a.prix);
    if (sort === 'new') return base.slice().reverse();
    return base;
  }, [sort]);

  return (
    <>
      <section style={{ padding: '26px 80px 12px' }}>
        <nav style={{ fontSize: 12, opacity: 0.6, marginBottom: 14 }}>
          <Link to="/" style={{ color: 'inherit' }}>Accueil</Link> / <span>Papeterie</span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 36 }}>Papeterie</h1>
          <span style={{ fontSize: 13, opacity: 0.6 }}>{list.length} résultats</span>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 36, padding: '20px 80px 64px', alignItems: 'start' }}>
        <aside style={{ background: 'var(--color-neutral-100)', borderRadius: 4, padding: 20, boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <h6 style={{ margin: '0 0 10px' }}>Sous-catégorie</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13 }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} defaultChecked />Cahiers et blocs</label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />Stylos et écriture</label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />Papier et ramettes</label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />Petit matériel</label>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: 18 }}>
            <h6 style={{ margin: '0 0 10px' }}>Prix (FCFA)</h6>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" style={{ borderRadius: 4 }} placeholder="Min" />
              <input className="input" style={{ borderRadius: 4 }} placeholder="Max" />
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: 18 }}>
            <h6 style={{ margin: '0 0 10px' }}>Marque</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13 }}>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />Bic</label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />Clairefontaine</label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />Maped</label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />Navigator</label>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: 18 }}>
            <h6 style={{ margin: '0 0 10px' }}>Disponibilité</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13 }}>
              <label className="radio"><input type="radio" name="dispo" defaultChecked /><span className="dot" />Tous</label>
              <label className="radio"><input type="radio" name="dispo" /><span className="dot" />En stock</label>
              <label className="radio"><input type="radio" name="dispo" /><span className="dot" />Retrait boutique</label>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: 18 }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}><input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} />En promotion uniquement</label>
          </div>
        </aside>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, borderBottom: '2px solid var(--color-divider)', paddingBottom: 14 }}>
            <span style={{ fontSize: 12, opacity: 0.6 }}>Trier par</span>
            <select className="input" style={{ width: 230, borderRadius: 4 }} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="pertinence">Pertinence</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
              <option value="new">Nouveautés</option>
            </select>
            <span style={{ marginLeft: 'auto', fontSize: 12, opacity: 0.6 }}>Affichage 1–{list.length} sur 48</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {list.map((p) => (
              <ProductCard key={p.id} product={p} variant="list" onAdd={(id) => add(id, 1)} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 32 }}>
            <button className="btn btn-secondary" style={{ borderRadius: 4 }}>Précédent</button>
            <button className="btn btn-primary" style={{ borderRadius: 4, width: 38, justifyContent: 'center' }}>1</button>
            <button className="btn btn-secondary" style={{ borderRadius: 4, width: 38, justifyContent: 'center' }}>2</button>
            <button className="btn btn-secondary" style={{ borderRadius: 4, width: 38, justifyContent: 'center' }}>3</button>
            <span style={{ opacity: 0.5, padding: '0 6px' }}>…</span>
            <button className="btn btn-secondary" style={{ borderRadius: 4, width: 38, justifyContent: 'center' }}>6</button>
            <button className="btn btn-secondary" style={{ borderRadius: 4, marginLeft: 6 }}>Suivant</button>
          </div>
        </div>
      </section>
    </>
  );
}
