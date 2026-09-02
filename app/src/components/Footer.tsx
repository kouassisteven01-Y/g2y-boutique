import { Link } from 'react-router-dom';

const PAYMENTS = ['Orange Money', 'MTN MoMo', 'Wave', 'Moov Money', 'Carte bancaire', 'À la livraison'];
const SOCIALS = ['Facebook', 'Instagram', 'LinkedIn'];
const BOUTIQUE_LINKS = ['Papeterie', 'Livres et manuels', 'Mobilier de bureau', "Consommables d'impression", 'Informatique'];
const AIDE_LINKS = ['Livraison et retours', 'Suivi de commande', 'FAQ', 'Contact', 'Devis entreprise'];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-text)', color: 'var(--color-neutral-100)', padding: '48px 80px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, paddingBottom: 32, borderBottom: '1px solid rgba(255,255,255,.18)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, background: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 15 }}>G2</span>
            <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 16 }}>G2Y CONSEIL</strong>
          </div>
          <p style={{ fontSize: 13, opacity: 0.7, maxWidth: '38ch' }}>Matériel de bureau et scolaire à Abidjan. Fournisseur des entreprises, écoles et administrations depuis 2015.</p>
          <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>
            Cocody Angré 8e tranche, Abidjan<br />
            +225 27 22 00 00 00 · contact@g2yconseil.ci<br />
            Lun–Ven 8 h–18 h · Sam 9 h–14 h
          </p>
        </div>
        <div>
          <h6 style={{ margin: '0 0 12px', color: 'var(--color-accent-400)' }}>Boutique</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13 }}>
            {BOUTIQUE_LINKS.map((label) => (
              <Link key={label} to="/produits" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.75 }}>{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h6 style={{ margin: '0 0 12px', color: 'var(--color-accent-400)' }}>Aide</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13 }}>
            {AIDE_LINKS.map((label) => (
              <a key={label} href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none', opacity: 0.75 }}>{label}</a>
            ))}
          </div>
        </div>
        <div>
          <h6 style={{ margin: '0 0 12px', color: 'var(--color-accent-400)' }}>Paiement</h6>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PAYMENTS.map((label) => (
              <span key={label} style={{ border: '1px solid rgba(255,255,255,.3)', fontSize: 11, padding: '4px 8px' }}>{label}</span>
            ))}
          </div>
          <h6 style={{ margin: '20px 0 10px', color: 'var(--color-accent-400)' }}>Suivez-nous</h6>
          <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
            {SOCIALS.map((label) => (
              <span key={label} style={{ border: '1px solid rgba(255,255,255,.3)', padding: '5px 9px' }}>{label}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, fontSize: 11, opacity: 0.55, paddingTop: 18 }}>
        <span>© 2026 G2Y Conseil — RCCM CI-ABJ-2015-B-00000</span>
        <span style={{ marginLeft: 'auto' }}>Mentions légales</span>
        <span>CGV</span>
        <span>Confidentialité</span>
        <Link to="/gestion" style={{ color: 'inherit', textDecoration: 'none' }}>Espace pro</Link>
      </div>
    </footer>
  );
}
