// Mock catalog, ported verbatim from templates/boutique/Boutique.dc.html
// (the design prototype's embedded <script>). No backend — this is the
// prototype's own data, kept as the app's single source of truth for now.

export interface Category {
  nom: string;
  icone: string;
  compte: number;
}

export interface Product {
  id: string;
  nom: string;
  cat: string;
  prix: number;
  barre: number;
  note: number;
  avis: number;
  ref: string;
  badge: string;
  stock: string;
}

export interface Avis {
  etoiles: string;
  texte: string;
  auteur: string;
  lieu: string;
}

export interface PaymentMethod {
  nom: string;
  note: string;
}

export const CATS: Category[] = [
  { nom: 'Papeterie', icone: '✎', compte: 148 },
  { nom: 'Livres et manuels scolaires', icone: '▤', compte: 92 },
  { nom: 'Mobilier de bureau', icone: '▭', compte: 64 },
  { nom: 'Fournitures scolaires', icone: '✚', compte: 121 },
  { nom: "Consommables d'impression", icone: '◧', compte: 76 },
  { nom: 'Rangement et classement', icone: '▦', compte: 58 },
  { nom: 'Informatique', icone: '⌨', compte: 83 },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', nom: 'Cahier 200 pages grands carreaux', cat: 'Papeterie', prix: 1500, barre: 1800, note: 4.5, avis: 132, ref: 'CAH-200-GC', badge: 'PROMO', stock: 'En stock — 240 unités' },
  { id: 'p2', nom: 'Ramette papier A4 80 g (500 f.)', cat: 'Papeterie', prix: 3500, barre: 4200, note: 4.7, avis: 214, ref: 'RAM-A4-80', badge: '−17 %', stock: 'En stock — 96 cartons' },
  { id: 'p3', nom: 'Lot de 50 stylos bille bleus', cat: 'Papeterie', prix: 12000, barre: 0, note: 4.3, avis: 87, ref: 'STY-B50', badge: 'LOT', stock: 'En stock' },
  { id: 'p4', nom: 'Pack scolaire CP complet', cat: 'Fournitures scolaires', prix: 15900, barre: 19500, note: 4.8, avis: 341, ref: 'PACK-CP', badge: 'RENTRÉE', stock: 'En stock — 58 packs' },
  { id: 'p5', nom: 'Chaise de bureau ergonomique', cat: 'Mobilier de bureau', prix: 65000, barre: 78000, note: 4.4, avis: 46, ref: 'MOB-CH-ERG', badge: '−17 %', stock: 'En stock — 12 unités' },
  { id: 'p6', nom: 'Toner HP 85A compatible', cat: "Consommables d'impression", prix: 42000, barre: 0, note: 4.2, avis: 63, ref: 'TON-85A', badge: 'NOUVEAU', stock: 'Stock limité — 6 unités' },
  { id: 'p7', nom: 'Bureau droit 120 cm chêne', cat: 'Mobilier de bureau', prix: 145000, barre: 165000, note: 4.6, avis: 28, ref: 'MOB-BUR-120', badge: 'PROMO', stock: 'Sur commande — 5 jours' },
  { id: 'p8', nom: 'Armoire métallique 2 portes', cat: 'Rangement et classement', prix: 185000, barre: 0, note: 4.5, avis: 19, ref: 'RAN-ARM-2P', badge: 'NOUVEAU', stock: 'En stock — 8 unités' },
  { id: 'p9', nom: 'Boîte à archives dos 10 cm (lot 10)', cat: 'Rangement et classement', prix: 9500, barre: 11000, note: 4.1, avis: 54, ref: 'RAN-ARC-10', badge: 'LOT', stock: 'En stock' },
  { id: 'p10', nom: 'Calculatrice scientifique 240 fonctions', cat: 'Informatique', prix: 9500, barre: 0, note: 4.6, avis: 118, ref: 'INF-CAL-240', badge: 'NOUVEAU', stock: 'En stock — 74 unités' },
  { id: 'p11', nom: 'Clé USB 32 Go', cat: 'Informatique', prix: 8000, barre: 9500, note: 4.4, avis: 205, ref: 'INF-USB-32', badge: '−16 %', stock: 'En stock' },
  { id: 'p12', nom: 'Manuel de mathématiques 3e', cat: 'Livres et manuels scolaires', prix: 6500, barre: 0, note: 4.7, avis: 76, ref: 'LIV-MAT-3E', badge: 'NOUVEAU', stock: 'En stock — 130 unités' },
];

export const PAIEMENTS: PaymentMethod[] = [
  { nom: 'Orange Money', note: 'Validation par code USSD' },
  { nom: 'MTN MoMo', note: 'Validation sur votre téléphone' },
  { nom: 'Wave', note: 'Sans frais pour le client' },
  { nom: 'Moov Money', note: 'Validation par code USSD' },
  { nom: 'Carte bancaire', note: 'Visa, Mastercard — 3-D Secure' },
  { nom: 'Paiement à la livraison', note: 'Espèces, Abidjan uniquement' },
];

export const AVIS: Avis[] = [
  { etoiles: '★★★★★', texte: "Commande de 40 cartons de ramettes livrée le lendemain à Marcory. Facture conforme, rien à redire.", auteur: 'Cabinet Diomandé & Associés', lieu: 'Marcory' },
  { etoiles: '★★★★★', texte: "Les packs scolaires m'ont fait gagner un temps fou pour mes trois enfants. Paiement Wave en deux clics.", auteur: 'Aya K.', lieu: 'Cocody' },
  { etoiles: '★★★★☆', texte: "Bon rapport qualité-prix sur le mobilier. Le montage de l'armoire a demandé un peu de patience.", auteur: 'Groupe scolaire Les Palmiers', lieu: 'Yopougon' },
];

export const PRODUCT_DETAIL = {
  description: "Format 17 × 22 cm, couverture polypropylène résistante à l'humidité, papier 70 g grands carreaux Seyès. Conçu pour l'année scolaire complète, conforme aux programmes du primaire et du collège en Côte d'Ivoire.",
  contenu: ['1 cahier 200 pages', '1 protège-cahier transparent', "2 étiquettes d'identification", 'Livré à plat, sans pliure'],
  specs: [
    { k: 'Format', v: '17 × 22 cm' },
    { k: 'Pages', v: '200' },
    { k: 'Grammage', v: '70 g/m²' },
    { k: 'Réglure', v: 'Grands carreaux Seyès' },
    { k: 'Couverture', v: 'Polypropylène 300 µ' },
    { k: 'Origine', v: 'Importé — normes UE' },
  ],
};

export function fmt(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
}

export function etoiles(n: number): string {
  const f = Math.round(n);
  return '★★★★★'.slice(0, f) + '☆☆☆☆☆'.slice(0, 5 - f);
}

export function findProduct(id: string): Product {
  return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
}

export function prixLabel(p: Product): string {
  return fmt(p.prix);
}

export function prixBarreLabel(p: Product): string {
  return p.barre ? fmt(p.barre) : '';
}

export function remiseLabel(p: Product): string {
  return p.barre ? '−' + Math.round((1 - p.prix / p.barre) * 100) + ' %' : 'Prix direct';
}
