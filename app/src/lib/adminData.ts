// Mock data for the back-office (espace de gestion) — orders and dashboard
// figures. Separate from lib/data.ts because it's a distinct business
// domain (order/inventory management) with no counterpart in the storefront
// prototype; the original Boutique.dc.html only covered the client screens.

import { PRODUCTS, fmt, findProduct } from './data';

export type OrderStatus = 'En préparation' | 'Expédiée' | 'Livrée';

export interface OrderLine {
  productId: string;
  qty: number;
}

export interface Order {
  id: string;
  client: string;
  telephone: string;
  date: string;
  statut: OrderStatus;
  livraison: string;
  adresse: string;
  paiement: string;
  lignes: OrderLine[];
  note: string;
}

export const ORDERS: Order[] = [
  { id: 'G2Y-2026-04871', client: 'Koffi Aya', telephone: '+225 07 00 00 00 00', date: '31 août 2026, 14:02', statut: 'En préparation', livraison: 'Express Abidjan — sous 24 h', adresse: 'Cocody, Angré 8e tranche, Abidjan', paiement: 'Wave', lignes: [{ productId: 'p4', qty: 1 }, { productId: 'p2', qty: 3 }], note: '' },
  { id: 'G2Y-2026-04870', client: 'Cabinet Diomandé & Associés', telephone: '+225 27 21 00 00 00', date: '31 août 2026, 11:20', statut: 'Expédiée', livraison: 'Standard Abidjan — 48 à 72 h', adresse: 'Marcory Zone 4, Abidjan', paiement: 'Carte bancaire', lignes: [{ productId: 'p2', qty: 40 }], note: 'Facture entreprise à établir au nom du cabinet.' },
  { id: 'G2Y-2026-04869', client: 'Groupe scolaire Les Palmiers', telephone: '+225 05 00 00 00 00', date: '30 août 2026, 16:45', statut: 'Livrée', livraison: 'Intérieur du pays — 72 h', adresse: 'Yopougon, Abidjan', paiement: 'Paiement à la livraison', lignes: [{ productId: 'p8', qty: 4 }, { productId: 'p9', qty: 10 }], note: '' },
  { id: 'G2Y-2026-04868', client: 'Aya K.', telephone: '+225 01 00 00 00 00', date: '30 août 2026, 09:12', statut: 'Livrée', livraison: 'Retrait en boutique', adresse: 'Cocody Angré, Abidjan', paiement: 'Orange Money', lignes: [{ productId: 'p4', qty: 3 }], note: '' },
  { id: 'G2Y-2026-04867', client: 'Konan Yves', telephone: '+225 07 11 22 33 44', date: '29 août 2026, 17:03', statut: 'En préparation', livraison: 'Express Abidjan — sous 24 h', adresse: 'Plateau, Abidjan', paiement: 'MTN MoMo', lignes: [{ productId: 'p7', qty: 1 }], note: '' },
  { id: 'G2Y-2026-04866', client: 'École Notre-Dame', telephone: '+225 27 20 00 00 00', date: '29 août 2026, 10:30', statut: 'Expédiée', livraison: 'Standard Abidjan — 48 à 72 h', adresse: 'Treichville, Abidjan', paiement: 'Paiement à la livraison', lignes: [{ productId: 'p1', qty: 200 }, { productId: 'p12', qty: 50 }], note: 'Livrer avant la rentrée, priorité haute.' },
  { id: 'G2Y-2026-04865', client: 'Bamba Fatou', telephone: '+225 05 55 66 77 88', date: '28 août 2026, 13:15', statut: 'Livrée', livraison: 'Retrait en boutique', adresse: 'Cocody Angré, Abidjan', paiement: 'Moov Money', lignes: [{ productId: 'p10', qty: 1 }, { productId: 'p11', qty: 2 }], note: '' },
  { id: 'G2Y-2026-04864', client: 'Kouadio Serge', telephone: '+225 01 44 55 66 77', date: '27 août 2026, 15:50', statut: 'Livrée', livraison: 'Express Abidjan — sous 24 h', adresse: 'Marcory, Abidjan', paiement: 'Wave', lignes: [{ productId: 'p3', qty: 2 }], note: '' },
];

export function orderTotal(o: Order): number {
  return o.lignes.reduce((t, l) => t + findProduct(l.productId).prix * l.qty, 0);
}

export function orderTotalLabel(o: Order): string {
  return fmt(orderTotal(o));
}

export function findOrder(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}

// Fixed 30-day sales series (FCFA) so the dashboard chart is stable across
// reloads rather than re-randomizing — a deterministic prototype figure,
// same spirit as the rest of the mock catalog.
export const SALES_30D: number[] = [
  420000, 385000, 510000, 460000, 395000, 610000, 705000,
  440000, 470000, 520000, 585000, 630000, 560000, 690000,
  720000, 505000, 480000, 615000, 660000, 590000, 745000,
  810000, 560000, 620000, 700000, 755000, 680000, 790000,
  845000, 812000,
];

export const DASHBOARD_STATS = {
  ventesDuJour: SALES_30D[SALES_30D.length - 1],
  commandesEnAttente: ORDERS.filter((o) => o.statut === 'En préparation').length,
  articlesEnRupture: PRODUCTS.filter((p) => p.statut === 'En rupture').length,
  panierMoyen: Math.round(ORDERS.reduce((t, o) => t + orderTotal(o), 0) / ORDERS.length),
};
