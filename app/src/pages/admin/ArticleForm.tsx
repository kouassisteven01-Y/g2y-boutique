import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Placeholder from '../../components/Placeholder';
import { CATS, type ArticleStatus, findProduct } from '../../lib/data';

export default function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const existing = id ? findProduct(id) : undefined;

  const [nom, setNom] = useState(existing?.nom ?? '');
  const [description, setDescription] = useState(isNew ? '' : "Format 17 × 22 cm, couverture polypropylène résistante à l'humidité, papier 70 g grands carreaux Seyès.");
  const [cat, setCat] = useState(existing?.cat ?? CATS[0].nom);
  const [prix, setPrix] = useState(String(existing?.prix ?? ''));
  const [prixPromo, setPrixPromo] = useState(existing?.barre ? String(existing.barre) : '');
  const [tva, setTva] = useState('18');
  const [stockQty, setStockQty] = useState('');
  const [ref, setRef] = useState(existing?.ref ?? '');
  const [variantes, setVariantes] = useState('');
  const [statut, setStatut] = useState<ArticleStatus>(existing?.statut ?? 'Brouillon');
  const [saved, setSaved] = useState<'brouillon' | 'publié' | null>(null);

  const save = (as: ArticleStatus) => {
    setStatut(as);
    setSaved(as === 'Publié' ? 'publié' : 'brouillon');
  };

  return (
    <>
      <nav style={{ fontSize: 12, opacity: 0.6, marginBottom: 12 }}>
        <Link to="/gestion/articles" style={{ color: 'inherit' }}>Articles</Link> / <span>{isNew ? 'Nouvel article' : nom}</span>
      </nav>
      <h1 style={{ margin: '0 0 24px', fontSize: 28 }}>{isNew ? 'Nouvel article' : "Modifier l'article"}</h1>

      {saved && (
        <div style={{ background: '#e8f5ea', border: '1px solid #1a7f37', color: '#1a7f37', padding: '12px 16px', fontSize: 14, marginBottom: 20 }}>
          {saved === 'publié' ? 'Article publié.' : 'Brouillon enregistré.'} (prototype — non persisté)
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
        <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="field">
            <label>Nom de l'article</label>
            <input className="input" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Cahier 200 pages grands carreaux" />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea className="input" style={{ minHeight: 110 }} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="field">
            <label>Photos</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              <Placeholder caption="ajouter" style={{ height: 84 }} />
              <Placeholder style={{ height: 84 }} />
              <Placeholder style={{ height: 84 }} />
              <Placeholder style={{ height: 84 }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="field">
              <label>Catégorie</label>
              <select className="input" value={cat} onChange={(e) => setCat(e.target.value)}>
                {CATS.map((c) => <option key={c.nom} value={c.nom}>{c.nom}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Référence</label>
              <input className="input" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="CAH-200-GC" />
            </div>
            <div className="field">
              <label>Prix (FCFA)</label>
              <input className="input" type="number" value={prix} onChange={(e) => setPrix(e.target.value)} placeholder="1500" />
            </div>
            <div className="field">
              <label>Prix promo (FCFA)</label>
              <input className="input" type="number" value={prixPromo} onChange={(e) => setPrixPromo(e.target.value)} placeholder="Optionnel" />
            </div>
            <div className="field">
              <label>TVA (%)</label>
              <input className="input" type="number" value={tva} onChange={(e) => setTva(e.target.value)} />
            </div>
            <div className="field">
              <label>Stock (unités)</label>
              <input className="input" type="number" value={stockQty} onChange={(e) => setStockQty(e.target.value)} placeholder="240" />
            </div>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>Variantes (format, couleur…)</label>
              <input className="input" value={variantes} onChange={(e) => setVariantes(e.target.value)} placeholder="Unité, Lot de 10, Carton de 50" />
            </div>
          </div>
        </div>

        <aside style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h4 style={{ margin: 0 }}>Publication</h4>
          <div className="field">
            <label>Statut</label>
            <select className="input" value={statut} onChange={(e) => setStatut(e.target.value as ArticleStatus)}>
              <option value="Brouillon">Brouillon</option>
              <option value="Publié">Publié</option>
              <option value="En rupture">En rupture</option>
            </select>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => save('Brouillon')}>Enregistrer en brouillon</button>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => save('Publié')}>Publier</button>
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/gestion/articles')}>Annuler</button>
        </aside>
      </div>
    </>
  );
}
