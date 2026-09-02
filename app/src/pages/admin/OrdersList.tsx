import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ORDERS, type OrderStatus, orderTotalLabel } from '../../lib/adminData';

const STATUS_TAG: Record<OrderStatus, string> = {
  'En préparation': 'tag-warning',
  Expédiée: 'tag-accent',
  Livrée: 'tag-success',
};

export default function OrdersList() {
  const [statut, setStatut] = useState<OrderStatus | 'Toutes'>('Toutes');

  const rows = useMemo(() => ORDERS.filter((o) => statut === 'Toutes' || o.statut === statut), [statut]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Commandes</h1>
        <span style={{ fontSize: 13, opacity: 0.6 }}>{ORDERS.length} commandes</span>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <select className="input" style={{ width: 220 }} value={statut} onChange={(e) => setStatut(e.target.value as OrderStatus | 'Toutes')}>
          <option value="Toutes">Tous les statuts</option>
          <option value="En préparation">En préparation</option>
          <option value="Expédiée">Expédiée</option>
          <option value="Livrée">Livrée</option>
        </select>
      </div>

      <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }}>
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', opacity: 0.55 }}>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Commande</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Client</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Statut</th>
              <th style={{ textAlign: 'right', padding: '10px 20px' }}>Montant</th>
              <th style={{ textAlign: 'right', padding: '10px 20px' }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id}>
                <td style={{ padding: '12px 20px', fontWeight: 600 }}>{o.id}</td>
                <td style={{ padding: '12px 20px' }}>{o.client}</td>
                <td style={{ padding: '12px 20px', opacity: 0.7 }}>{o.date}</td>
                <td style={{ padding: '12px 20px' }}><span className={`tag ${STATUS_TAG[o.statut]}`}>{o.statut}</span></td>
                <td style={{ padding: '12px 20px', textAlign: 'right', fontWeight: 600 }}>{orderTotalLabel(o)}</td>
                <td style={{ padding: '12px 20px', textAlign: 'right' }}>
                  <Link to={`/gestion/commandes/${o.id}`} className="btn btn-secondary" style={{ padding: '7px 14px', fontSize: 13 }}>Voir</Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '32px 20px', textAlign: 'center', opacity: 0.55 }}>Aucune commande avec ce statut.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
