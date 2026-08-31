import { Link } from 'react-router-dom';
import type { Product } from '../lib/data';
import { etoiles, prixBarreLabel, prixLabel } from '../lib/data';
import Placeholder from './Placeholder';

type Variant = 'bestseller' | 'newArrival' | 'list' | 'similar';

export default function ProductCard({
  product: p,
  variant,
  onAdd,
}: {
  product: Product;
  variant: Variant;
  onAdd: (id: string) => void;
}) {
  const open = `/produits/${p.id}`;
  const addBtn = (className: string, style?: React.CSSProperties) => (
    <button
      className={className}
      style={{ borderRadius: 4, justifyContent: 'flex-start', padding: '10px 14px', ...style }}
      onClick={(e) => {
        e.preventDefault();
        onAdd(p.id);
      }}
    >
      {variant === 'similar' ? 'Ajouter' : 'Ajouter au panier'}
    </button>
  );

  if (variant === 'similar') {
    return (
      <article style={{ background: 'var(--color-neutral-100)', borderRadius: 4, boxShadow: 'var(--shadow-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Link to={open} style={{ display: 'block', position: 'relative' }}>
          <Placeholder caption={p.nom} style={{ height: 150 }} />
        </Link>
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <Link to={open} style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, textDecoration: 'none', color: 'inherit', lineHeight: 1.2 }}>{p.nom}</Link>
          <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 17, marginTop: 'auto' }}>{prixLabel(p)}</strong>
          {addBtn('btn btn-secondary')}
        </div>
      </article>
    );
  }

  const imgHeight = variant === 'list' ? 180 : 190;
  const showBadge = variant === 'bestseller' || variant === 'list';
  const showCat = variant === 'bestseller' || variant === 'newArrival';
  const showBarre = variant === 'bestseller' || variant === 'list';
  const addClass = variant === 'newArrival' ? 'btn btn-secondary' : 'btn btn-primary';

  return (
    <article style={{ background: 'var(--color-neutral-100)', borderRadius: 4, boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Link to={open} style={{ position: 'relative', display: 'block' }}>
        <Placeholder caption={p.nom} style={{ height: imgHeight }} />
        {showBadge && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: 'var(--color-accent)', color: 'var(--color-neutral-100)', fontSize: 10, fontWeight: 800, letterSpacing: '.06em', padding: '3px 8px' }}>
            {p.badge}
          </span>
        )}
      </Link>
      <div style={{ padding: variant === 'list' ? 14 : '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {showCat && <span style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.5 }}>{p.cat}</span>}
        <Link to={open} style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15, lineHeight: 1.2, textDecoration: 'none', color: 'inherit' }}>{p.nom}</Link>
        <span style={{ fontSize: 12, color: 'var(--color-accent-700)' }}>
          {etoiles(p.note)} <span style={{ opacity: 0.55, color: 'var(--color-text)' }}>({p.avis})</span>
        </span>
        {variant === 'newArrival' ? (
          <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 20, marginTop: 'auto' }}>{prixLabel(p)}</strong>
        ) : (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 'auto' }}>
            <strong style={{ fontFamily: 'var(--font-heading)', fontSize: variant === 'list' ? 19 : 20 }}>{prixLabel(p)}</strong>
            {showBarre && p.barre > 0 && <span style={{ fontSize: 12, opacity: 0.45, textDecoration: 'line-through' }}>{prixBarreLabel(p)}</span>}
          </div>
        )}
        <span style={{ fontSize: 11, color: variant === 'bestseller' ? 'var(--color-accent-700)' : undefined, opacity: variant === 'bestseller' ? undefined : 0.65 }}>{p.stock}</span>
        {addBtn(addClass)}
      </div>
    </article>
  );
}
