import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Placeholder from '../../components/Placeholder';
import { PRODUCTS, type ArticleStatus, fmt } from '../../lib/data';

const STATUS_TAG: Record<ArticleStatus, string> = {
  Publié: 'tag-success',
  Brouillon: 'tag-neutral',
  'En rupture': 'tag-warning',
};

export default function ArticlesList() {
  const [query, setQuery] = useState('');
  const [statut, setStatut] = useState<ArticleStatus | 'Tous'>('Tous');

  const rows = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (statut !== 'Tous' && p.statut !== statut) return false;
      if (query && !p.nom.toLowerCase().includes(query.toLowerCase()) && !p.ref.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, statut]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Articles</h1>
        <span style={{ fontSize: 13, opacity: 0.6 }}>{PRODUCTS.length} articles</span>
        <Link to="/gestion/articles/nouveau" className="btn btn-primary" style={{ marginLeft: 'auto', padding: '10px 16px' }}>+ Nouvel article</Link>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input className="input" style={{ maxWidth: 320 }} placeholder="Rechercher par nom ou référence…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="input" style={{ width: 200 }} value={statut} onChange={(e) => setStatut(e.target.value as ArticleStatus | 'Tous')}>
          <option value="Tous">Tous les statuts</option>
          <option value="Publié">Publié</option>
          <option value="Brouillon">Brouillon</option>
          <option value="En rupture">En rupture</option>
        </select>
      </div>

      <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }}>
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', opacity: 0.55 }}>
              <th style={{ textAlign: 'left', padding: '10px 20px', width: 64 }}></th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Article</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Catégorie</th>
              <th style={{ textAlign: 'right', padding: '10px 20px' }}>Prix</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Stock</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Statut</th>
              <th style={{ textAlign: 'right', padding: '10px 20px' }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: 12 }}><Placeholder style={{ width: 44, height: 44 }} /></td>
                <td style={{ padding: '12px 20px' }}>
                  <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 14 }}>{p.nom}</strong>
                  <span style={{ fontSize: 12, opacity: 0.55 }}>Réf. {p.ref}</span>
                </td>
                <td style={{ padding: '12px 20px', fontSize: 13, opacity: 0.75 }}>{p.cat}</td>
                <td style={{ padding: '12px 20px', textAlign: 'right', fontWeight: 600 }}>{fmt(p.prix)}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, opacity: 0.75 }}>{p.stock}</td>
                <td style={{ padding: '12px 20px' }}><span className={`tag ${STATUS_TAG[p.statut]}`}>{p.statut}</span></td>
                <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                  <Link to={`/gestion/articles/${p.id}`} className="btn btn-secondary" style={{ padding: '7px 14px', fontSize: 13 }}>Modifier</Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '32px 20px', textAlign: 'center', opacity: 0.55 }}>Aucun article ne correspond à ces filtres.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
