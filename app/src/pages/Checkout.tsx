import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Placeholder from '../components/Placeholder';
import { PAIEMENTS, findProduct, fmt } from '../lib/data';
import { SHIPPING_OPTIONS, useCart } from '../lib/CartContext';

const STEP_NAMES = ['Identification', 'Livraison', 'Mode et créneau', 'Paiement'];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotalLabel, shippingLabel, discountLabel, totalLabel, shippingOptionId, setShippingOption } = useCart();
  const [step, setStep] = useState(1);

  const steps = STEP_NAMES.map((nom, i) => ({
    num: '0' + (i + 1),
    nom,
    actif: i + 1 === step,
    etat: i + 1 < step ? 'Validée' : i + 1 === step ? 'En cours' : 'À venir',
  }));

  const nextStep = () => {
    if (step === 4) navigate('/confirmation');
    else setStep(step + 1);
    window.scrollTo(0, 0);
  };
  const prevStep = () => {
    if (step === 1) navigate('/panier');
    else setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section style={{ padding: '26px 80px 12px' }}>
        <h1 style={{ margin: '0 0 20px', fontSize: 32 }}>Commande</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'var(--color-divider)', marginBottom: 32 }}>
          {steps.map((s) => (
            <div key={s.num} style={{ background: 'var(--color-neutral-100)' }}>
              {s.actif ? (
                <div style={{ padding: '14px 18px', borderTop: '4px solid var(--color-accent)', display: 'flex', gap: 10, alignItems: 'baseline', color: 'var(--color-accent)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13 }}>{s.num}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{s.nom}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6, color: 'var(--color-text)' }}>{s.etat}</span>
                </div>
              ) : (
                <div style={{ padding: '14px 18px', borderTop: '4px solid transparent', display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13 }}>{s.num}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{s.nom}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.5 }}>{s.etat}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 36, padding: '0 80px 64px', alignItems: 'start' }}>
        <div style={{ background: 'var(--color-neutral-100)', borderRadius: 4, padding: 28, boxShadow: 'var(--shadow-sm)' }}>
          {step === 1 && (
            <>
              <h3 style={{ margin: '0 0 6px' }}>1. Identification</h3>
              <p style={{ opacity: 0.65, fontSize: 14 }}>Connectez-vous, créez un compte, ou commandez en tant qu'invité.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520, marginTop: 18 }}>
                <label className="radio"><input type="radio" name="ident" defaultChecked /><span className="dot" />Je commande en tant qu'invité</label>
                <label className="radio"><input type="radio" name="ident" /><span className="dot" />J'ai déjà un compte G2Y</label>
                <label className="radio"><input type="radio" name="ident" /><span className="dot" />Je crée un compte</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
                  <div className="field"><label>Nom et prénoms</label><input className="input" style={{ borderRadius: 4 }} placeholder="Koffi Aya" /></div>
                  <div className="field"><label>Téléphone</label><input className="input" style={{ borderRadius: 4 }} placeholder="+225 07 00 00 00 00" /></div>
                  <div className="field" style={{ gridColumn: 'span 2' }}><label>E-mail (facture)</label><input className="input" style={{ borderRadius: 4 }} placeholder="nom@exemple.ci" /></div>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3 style={{ margin: '0 0 6px' }}>2. Livraison ou retrait</h3>
              <div style={{ display: 'flex', gap: 14, margin: '18px 0' }}>
                <label className="radio"><input type="radio" name="mode" defaultChecked /><span className="dot" />Livraison à domicile</label>
                <label className="radio"><input type="radio" name="mode" /><span className="dot" />Retrait en boutique (Cocody Angré)</label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 560 }}>
                <div className="field">
                  <label>Ville</label>
                  <select className="input" style={{ borderRadius: 4 }}>
                    <option>Abidjan</option><option>Bouaké</option><option>Yamoussoukro</option><option>San-Pédro</option><option>Korhogo</option>
                  </select>
                </div>
                <div className="field"><label>Commune / quartier</label><input className="input" style={{ borderRadius: 4 }} placeholder="Cocody, Angré 8e tranche" /></div>
                <div className="field" style={{ gridColumn: 'span 2' }}><label>Adresse et repère</label><input className="input" style={{ borderRadius: 4 }} placeholder="Rue des Jardins, en face de la pharmacie" /></div>
                <div className="field" style={{ gridColumn: 'span 2' }}><label>Instructions pour le livreur</label><textarea className="input" style={{ borderRadius: 4 }} placeholder="Appeler à l'arrivée" /></div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h3 style={{ margin: '0 0 6px' }}>3. Mode de livraison et créneau</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--color-divider)', marginTop: 18 }}>
                {SHIPPING_OPTIONS.map((o) => (
                  <label key={o.id} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--color-neutral-100)', padding: 16, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="liv"
                      checked={shippingOptionId === o.id}
                      onChange={() => setShippingOption(o.id)}
                      style={{ accentColor: 'var(--color-accent)' }}
                    />
                    <span>
                      <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 14, display: 'block' }}>{o.nom}</strong>
                      <span style={{ fontSize: 12, opacity: 0.6 }}>{o.note}</span>
                    </span>
                    <strong style={{ marginLeft: 'auto' }}>{o.prix ? fmt(o.prix) : 'Gratuit'}</strong>
                  </label>
                ))}
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <h3 style={{ margin: '0 0 6px' }}>4. Paiement</h3>
              <p style={{ opacity: 0.65, fontSize: 14 }}>Choisissez votre moyen de paiement. Transaction chiffrée.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'var(--color-divider)', marginTop: 18 }}>
                {PAIEMENTS.map((m) => (
                  <label key={m.nom} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--color-neutral-100)', padding: 16, cursor: 'pointer' }}>
                    <input type="radio" name="pay" style={{ accentColor: 'var(--color-accent)' }} />
                    <span>
                      <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 14, display: 'block' }}>{m.nom}</strong>
                      <span style={{ fontSize: 12, opacity: 0.6 }}>{m.note}</span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="field" style={{ maxWidth: 320, marginTop: 20 }}>
                <label>Numéro mobile money</label>
                <input className="input" style={{ borderRadius: 4 }} placeholder="+225 07 00 00 00 00" />
              </div>
            </>
          )}
          <div style={{ display: 'flex', gap: 12, marginTop: 28, borderTop: '2px solid var(--color-divider)', paddingTop: 20 }}>
            <button className="btn btn-secondary" style={{ borderRadius: 4, padding: '12px 18px' }} onClick={prevStep}>Retour</button>
            <button className="btn btn-primary" style={{ borderRadius: 4, padding: '12px 22px', fontSize: 15 }} onClick={nextStep}>
              {step === 4 ? `Payer ${totalLabel}` : 'Continuer'}
            </button>
          </div>
        </div>

        <aside style={{ background: 'var(--color-neutral-100)', borderRadius: 4, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
          <h4 style={{ margin: '0 0 16px' }}>Récapitulatif</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderBottom: '1px solid var(--color-divider)', paddingBottom: 16 }}>
            {cart.map((l) => {
              const p = findProduct(l.id);
              return (
                <div key={l.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Placeholder style={{ width: 48, height: 48, flex: 'none' }} />
                  <span style={{ fontSize: 13, lineHeight: 1.25 }}>{p.nom}<span style={{ display: 'block', opacity: 0.55, fontSize: 11 }}>× {l.qty}</span></span>
                  <strong style={{ marginLeft: 'auto', fontSize: 13, whiteSpace: 'nowrap' }}>{fmt(p.prix * l.qty)}</strong>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14, padding: '16px 0', borderBottom: '2px solid var(--color-divider)' }}>
            <div style={{ display: 'flex' }}><span style={{ opacity: 0.65 }}>Sous-total</span><span style={{ marginLeft: 'auto', fontWeight: 600 }}>{subtotalLabel}</span></div>
            <div style={{ display: 'flex' }}><span style={{ opacity: 0.65 }}>Livraison</span><span style={{ marginLeft: 'auto', fontWeight: 600 }}>{shippingLabel}</span></div>
            <div style={{ display: 'flex' }}><span style={{ opacity: 0.65 }}>Remise lot</span><span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--color-accent-700)' }}>{discountLabel}</span></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', paddingTop: 16 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16 }}>Total à payer</span>
            <strong style={{ marginLeft: 'auto', fontFamily: 'var(--font-heading)', fontSize: 26 }}>{totalLabel}</strong>
          </div>
        </aside>
      </section>
    </>
  );
}
