import { DASHBOARD_STATS, ORDERS, SALES_30D, orderTotalLabel } from '../../lib/adminData';
import { fmt } from '../../lib/data';

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)', padding: '20px 22px' }}>
      <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.6 }}>{label}</span>
      <strong style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 28, marginTop: 8 }}>{value}</strong>
    </div>
  );
}

function SalesChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const w = 900;
  const h = 220;
  const barGap = 4;
  const barW = (w - barGap * (data.length - 1)) / data.length;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} role="img" aria-label="Ventes des 30 derniers jours" preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
      <line x1={0} y1={h} x2={w} y2={h} stroke="var(--color-divider)" strokeWidth={1} />
      {data.map((v, i) => {
        const barH = (v / max) * (h - 12);
        const x = i * (barW + barGap);
        const isLast = i === data.length - 1;
        return (
          <rect
            key={i}
            x={x}
            y={h - barH}
            width={barW}
            height={barH}
            fill={isLast ? 'var(--color-accent)' : 'var(--color-accent-200)'}
          />
        );
      })}
    </svg>
  );
}

export default function Dashboard() {
  const recentOrders = ORDERS.slice(0, 5);

  return (
    <>
      <h1 style={{ margin: '0 0 4px', fontSize: 28 }}>Tableau de bord</h1>
      <p style={{ opacity: 0.6, fontSize: 14, marginBottom: 28 }}>Vue d'ensemble de l'activité boutique.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        <StatTile label="Ventes du jour" value={fmt(DASHBOARD_STATS.ventesDuJour)} />
        <StatTile label="Commandes en attente" value={String(DASHBOARD_STATS.commandesEnAttente)} />
        <StatTile label="Articles en rupture" value={String(DASHBOARD_STATS.articlesEnRupture)} />
        <StatTile label="Panier moyen" value={fmt(DASHBOARD_STATS.panierMoyen)} />
      </div>

      <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)', padding: 24, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>Ventes — 30 derniers jours</h3>
          <span style={{ fontSize: 12, opacity: 0.55 }}>En FCFA, aujourd'hui en accent</span>
        </div>
        <SalesChart data={SALES_30D} />
      </div>

      <div style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-divider)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '2px solid var(--color-divider)' }}>
          <h3 style={{ margin: 0 }}>Commandes récentes</h3>
        </div>
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', opacity: 0.55 }}>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Commande</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Client</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '10px 20px' }}>Statut</th>
              <th style={{ textAlign: 'right', padding: '10px 20px' }}>Montant</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td style={{ padding: '12px 20px', fontWeight: 600 }}>{o.id}</td>
                <td style={{ padding: '12px 20px' }}>{o.client}</td>
                <td style={{ padding: '12px 20px', opacity: 0.7 }}>{o.date}</td>
                <td style={{ padding: '12px 20px' }}>{o.statut}</td>
                <td style={{ padding: '12px 20px', textAlign: 'right', fontWeight: 600 }}>{orderTotalLabel(o)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
