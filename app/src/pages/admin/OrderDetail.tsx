import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Placeholder from '../../components/Placeholder';
import { findOrder, orderTotalLabel, type OrderStatus } from '../../lib/adminData';
import { findProduct, fmt } from '../../lib/data';

export default function OrderDetail() {
  const { id = '' } = useParams();
  const order = findOrder(id);
  const [statut, setStatut] = useState<OrderStatus | undefined>(order?.statut);
  const [note, setNote] = useState(order?.note ?? '');
  const [factured, setFactured] = useState(false);

  if (!order) {
    return (
      <>
        <p>Commande introuvable.</p>
        <Link to="/gestion/commandes" className="btn btn-secondary">Retour aux commandes</Link>
      </>
    );
  }

  return (
    <>
      <nav style={{ fontSize: 12, opacity: 0.6, marginBottom: 12 }}>
        <Link to="/gestion/commandes" style={{ color: 'inherit' }}>Commandes</Link> / <span>{order.id}</span>
      </nav>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>{order.id}</h1>
        <span style={{ fontSize: 13, opacity: 0.6 }}>{order.date}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '2px solid var(--color-divider)' }}>
              <h4 style={{ margin: 0 }}>Articles</h4>
            </div>
            {order.lignes.map((l) => {
              const p = findProduct(l.productId);
              return (
                <div key={l.productId} style={{ display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: 16, padding: 16, borderBottom: '1px solid var(--color-divider)', alignItems: 'center' }}>
                  <Placeholder style={{ height: 48 }} />
                  <div>
                    <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 14 }}>{p.nom}</strong>
                    <span style={{ fontSize: 12, opacity: 0.55 }}>Réf. {p.ref} · × {l.qty}</span>
                  </div>
                  <strong>{fmt(p.prix * l.qty)}</strong>
                </div>
              );
            })}
            <div style={{ display: 'flex', padding: '14px 20px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Total</span>
              <strong style={{ marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontSize: 18 }}>{orderTotalLabel(order)}</strong>
            </div>
          </div>

          <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)', padding: 20 }}>
            <h4 style={{ margin: '0 0 12px' }}>Livraison</h4>
            <p style={{ fontSize: 13, margin: 0, lineHeight: 1.6 }}>
              {order.client} · {order.telephone}<br />
              {order.adresse}<br />
              {order.livraison} · Paiement : {order.paiement}
            </p>
          </div>

          <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)', padding: 20 }}>
            <h4 style={{ margin: '0 0 12px' }}>Note interne</h4>
            <textarea className="input" style={{ minHeight: 90 }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ajouter une note visible uniquement en interne…" />
          </div>
        </div>

        <aside style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h4 style={{ margin: 0 }}>Statut</h4>
          <div className="field">
            <select className="input" value={statut} onChange={(e) => setStatut(e.target.value as OrderStatus)}>
              <option value="En préparation">En préparation</option>
              <option value="Expédiée">Expédiée</option>
              <option value="Livrée">Livrée</option>
            </select>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setFactured(true)}>
            {factured ? 'Facture générée ✓' : 'Générer la facture'}
          </button>
        </aside>
      </div>
    </>
  );
}
