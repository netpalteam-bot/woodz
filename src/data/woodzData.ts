export type MenuCategory = 'sandwichs' | 'menus' | 'assiettes' | 'box' | 'desserts';

export interface MenuItem {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  category: MenuCategory;
  priceSeul: number;
  priceMenu?: number;
  description: string;
  ingredients: string[];
  tag?: string;
  image: string;
  imageObjectPosition?: string;
  imageScale?: string;
  driveMatchKeys: string[];
}

export interface BranchInfo {
  id: string;
  name: string;
  city: string;
  postalCode: string;
  zone: string;
  address: string;
  landmark: string;
  phone: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  isOpenSunday: boolean;
  flagshipTag: string;
  image: string;
  coordinates: string;
}

export const SAUCES_LIST = [
  'Blanche Artisanale (Herbes & Ail doux)',
  'Algérienne',
  'Samouraï',
  'Andalouse',
  'Harissa Tradition',
  'Mayonnaise',
  'Ketchup',
  'Barbecue Fumé',
];

export const MENU_CATEGORIES: Array<{ id: 'all' | MenuCategory; label: string; count: number }> = [
  { id: 'all', label: 'Toute la Carte', count: 16 },
  { id: 'sandwichs', label: 'Sandwichs Artisans', count: 4 },
  { id: 'menus', label: 'Formules Menus', count: 4 },
  { id: 'assiettes', label: 'Assiettes sur Ardoise', count: 3 },
  { id: 'box', label: 'Box Gourmet', count: 2 },
  { id: 'desserts', label: 'Tiramisus & Frites', count: 3 },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // SANDWICHS
  {
    id: 'sandwich-alaturka',
    code: '01. SANDWICH XXL',
    name: 'Sandwich Alaturka',
    subtitle: 'Édition Gourmande · Double Viande XXL',
    category: 'sandwichs',
    priceSeul: 12.90,
    priceMenu: 17.50,
    description:
      'Double ration de bœuf entrecôte 100% grillée à la broche, poivrons rouges et courgettes grillés au four, oignons caramélisés et fromage feta émietté dans notre pain rond boulanger aux graines.',
    ingredients: [
      'Double viande 100% bœuf entrecôte',
      'Poivrons, courgettes & oignons grillés',
      'Fromage Feta AOP',
      'Pain rond artisanal du matin',
    ],
    tag: 'Signature XXL',
    image: '/assets/aistudio/WOODZ_02_Sandwich_Alaturka_178c2dae.jpg',
    imageObjectPosition: 'center 78%',
    driveMatchKeys: ['WOODZ_02', 'Sandwich_Alaturka', '02_Sandwich'],
  },
  {
    id: 'sandwich-woodz',
    code: '02. CRÉATION MAISON',
    name: "Sandwich Le Wood'Z",
    subtitle: "L'Original de la Maison · Recette Complète",
    category: 'sandwichs',
    priceSeul: 11.00,
    priceMenu: 15.50,
    description:
      'Notre recette emblématique : fines lamelles de bœuf entrecôte 100%, légumes méditerranéens grillés, crudités croquantes du matin, roquette sauvage, feta et frites au paprika.',
    ingredients: [
      'Viande d’entrecôte 100% pur bœuf',
      'Légumes grillés & Roquette fraîche',
      'Feta & Crudités du matin',
      'Pain boulanger pétri chaque jour',
    ],
    tag: 'Incontournable',
    image: '/assets/aistudio/WOODZ_02_Sandwich_Alaturka_178c2dae.jpg',
    imageObjectPosition: 'center 72%',
    driveMatchKeys: ['WOODZ_01', 'Sandwich_Woodz', 'Le_Woodz'],
  },
  {
    id: 'sandwich-doner-simple',
    code: '03. L’ESSENTIEL ARTISANAL',
    name: 'Döner Simple',
    subtitle: 'Authenticité Pure · Préparé à la Minute',
    category: 'sandwichs',
    priceSeul: 9.50,
    priceMenu: 13.50,
    description:
      'L’essentiel du véritable döner berlinois et alsacien : pain rond artisanal doré aux graines de sésame, viande 100% bœuf entrecôte finement tranchée, salade croquante, tomates fraîches et oignons rouges.',
    ingredients: [
      'Pain rond artisanal aux graines',
      'Viande 100% bœuf entrecôte grillée',
      'Salade croquante, tomates & oignons',
      'Sauce maison au choix',
    ],
    tag: 'Tradition',
    image: '/assets/aistudio/WOODZ_03_Doner_Simple_84246f27.jpg',
    imageObjectPosition: '70% 78%',
    driveMatchKeys: ['WOODZ_03', 'Doner_Simple'],
  },
  {
    id: 'sandwich-americain',
    code: '04. BISTRO GOURMAND',
    name: "L'Américain Entrecôte",
    subtitle: 'Généreux & Croustillant · Frites Intégrées',
    category: 'sandwichs',
    priceSeul: 11.50,
    priceMenu: 15.00,
    description:
      'Pain frais toasté garni de notre viande d’entrecôte 100% bœuf, d’une généreuse portion de frites maison dorées au paprika, crudités fraîches et double sauce au choix.',
    ingredients: [
      'Viande 100% bœuf entrecôte',
      'Frites maison au paprika intégrées',
      'Crudités fraîches du jour',
      'Pain artisanal chaud',
    ],
    image: '/assets/aistudio/WOODZ_08_Menu_Doner_Simple_b869b040.jpg',
    imageObjectPosition: '35% 78%',
    driveMatchKeys: ['WOODZ_04', 'Americain'],
  },

  // FORMULES MENUS
  {
    id: 'menu-alaturka',
    code: '05. FORMULE DOUBLE VIANDE',
    name: 'Menu Alaturka XXL',
    subtitle: 'Sandwich Alaturka + Frites Paprika + Boisson 33cl',
    category: 'menus',
    priceSeul: 17.50,
    description:
      'La formule complète pour les amateurs de caractère : notre Sandwich Alaturka double viande entrecôte aux légumes grillés et feta, servi sur plateau avec frites maison au paprika et boisson fraîche 33cl.',
    ingredients: [
      'Sandwich Alaturka Double Viande XXL',
      'Portion de frites maison au paprika',
      'Boisson fraîche 33cl au choix',
      '2 Sauces artisanales incluses',
    ],
    tag: 'Best-Seller',
    image: '/assets/aistudio/WOODZ_07_Menu_Alaturka_8579b22a.jpg',
    imageObjectPosition: 'center 75%',
    driveMatchKeys: ['WOODZ_07', 'Menu_Alaturka'],
  },
  {
    id: 'menu-doner',
    code: '06. FORMULE BISTRO AUTHENTIQUE',
    name: 'Menu Döner Classique',
    subtitle: 'Sandwich Döner Simple + Frites Maison + Boisson 33cl',
    category: 'menus',
    priceSeul: 13.50,
    description:
      'Simple, généreux et préparé à la minute : le sandwich Döner Simple en pain rond boulanger accompagné de son cornet de frites épicées au paprika doux, deux ramequins de sauce et une boisson 33cl.',
    ingredients: [
      'Sandwich Döner Simple 100% Bœuf',
      'Frites maison dorées au paprika',
      'Boisson 33cl au choix',
      'Duo de sauces maison',
    ],
    tag: 'Formule Midi & Soir',
    image: '/assets/aistudio/WOODZ_08_Menu_Doner_Simple_b869b040.jpg',
    imageObjectPosition: 'center 76%',
    driveMatchKeys: ['WOODZ_08', 'Menu_Doner_Simple'],
  },
  {
    id: 'menu-woodz-signature',
    code: '07. FORMULE SIGNATURE',
    name: "Menu Le Wood'Z",
    subtitle: "Sandwich Le Wood'Z + Frites Paprika + Boisson 33cl",
    category: 'menus',
    priceSeul: 15.50,
    description:
      'Tout le savoir-faire Wood’Z en une formule : le sandwich signature (entrecôte, légumes grillés, feta, roquette) servi avec nos frites croustillantes au paprika et votre boisson préférée.',
    ingredients: [
      "Sandwich Le Wood'Z complet",
      'Frites croustillantes au paprika',
      'Boisson fraîche 33cl',
      'Sauce blanche aux herbes & harissa',
    ],
    image: '/assets/aistudio/WOODZ_07_Menu_Alaturka_8579b22a.jpg',
    imageObjectPosition: '60% 72%',
    driveMatchKeys: ['WOODZ_06', 'Menu_Woodz'],
  },
  {
    id: 'menu-kids',
    code: '08. FORMULE ENFANT',
    name: 'Menu Bambino Wood’Z',
    subtitle: 'Mini Döner ou Nuggets + Frites + Capri-Sun',
    category: 'menus',
    priceSeul: 9.50,
    description:
      'Pensé pour les plus jeunes gourmets : portion adaptée de notre viande 100% bœuf entrecôte (ou filets croustillants), petites frites dorées sans épices fortes et boisson Capri-Sun.',
    ingredients: [
      'Mini pain artisanal & bœuf entrecôte',
      'Frites maison dorées nature',
      'Capri-Sun ou Eau Carola',
      'Surprise gourmande',
    ],
    image: '/assets/aistudio/WOODZ_03_Doner_Simple_84246f27.jpg',
    imageObjectPosition: '65% 75%',
    driveMatchKeys: ['WOODZ_09', 'Menu_Kids', 'Enfant'],
  },

  // ASSIETTES
  {
    id: 'assiette-classique',
    code: '09. SUR ARDOISE',
    name: 'Assiette Classique',
    subtitle: 'Viande Döner 100% Bœuf · Frites au Paprika · Crudités · Pain Chaud',
    category: 'assiettes',
    priceSeul: 15.90,
    description:
      'Servie sur assiette noire rectangulaire : généreuse découpe de viande döner 100% bœuf entrecôte, frites dorées au paprika, salade fraîche du matin aux tomates et oignons rouges, duo de sauces et quartier de pain chaud aux graines.',
    ingredients: [
      'Viande Döner 100% Bœuf Entrecôte',
      'Crudités fraîches du matin',
      'Frites au paprika croustillantes',
      'Pain artisanal chaud aux graines de sésame',
    ],
    tag: 'Qualité Artisanale',
    image: '/assets/aistudio/WOODZ_12_Assiette_Classique_91ba70ff.jpg',
    imageObjectPosition: 'center 75%',
    driveMatchKeys: ['WOODZ_12', 'Assiette_Classique'],
  },
  {
    id: 'assiette-woodz',
    code: '10. ASSIETTE SIGNATURE',
    name: "Assiette Wood'Z Kebab House",
    subtitle: 'Entrecôte 100% Bœuf · Légumes Grillés · Feta & Roquette',
    category: 'assiettes',
    priceSeul: 17.90,
    description:
      'L’expérience bistronomique complète : viande d’entrecôte 100% pur bœuf taillée à la main, poivrons et courgettes grillés, fromage feta, roquette fraîche, crudités, frites au paprika et pain boulanger chaud.',
    ingredients: [
      'Grande portion bœuf entrecôte 100%',
      'Légumes méditerranéens grillés & Feta',
      'Roquette sauvage & Crudités fraîches',
      'Frites maison & Pain chaud du jour',
    ],
    tag: 'Création du Chef',
    image: '/assets/aistudio/WOODZ_12_Assiette_Classique_91ba70ff.jpg',
    imageObjectPosition: 'center 70%',
    driveMatchKeys: ['WOODZ_13', 'WOODZ_11', 'Assiette_Woodz'],
  },
  {
    id: 'assiette-alaturka',
    code: '11. ASSIETTE GRAND APPÉTIT',
    name: 'Assiette Alaturka XXL',
    subtitle: 'Double Ration Entrecôte · Poivrons Grillés · Feta · Frites',
    category: 'assiettes',
    priceSeul: 18.90,
    description:
      'Pour les amateurs de viande d’exception : double ration de bœuf entrecôte grillée, poivrons et oignons caramélisés à la plancha, feta émiettée, frites au paprika et pain chaud.',
    ingredients: [
      'Double ration bœuf entrecôte 100%',
      'Poivrons, courgettes & oignons grillés',
      'Feta AOP & Sauces maison',
      'Frites au paprika & Pain boulanger',
    ],
    image: '/assets/aistudio/WOODZ_12_Assiette_Classique_91ba70ff.jpg',
    imageObjectPosition: 'center 80%',
    driveMatchKeys: ['WOODZ_14', 'Assiette_Alaturka'],
  },

  // BOX
  {
    id: 'box-viande-frites',
    code: '12. FORMAT NOMADE GOURMET',
    name: 'Menu Box Frites & Viande',
    subtitle: 'Box Entrecôte & Frites + Boisson 33cl + Tiramisu Maison',
    category: 'box',
    priceSeul: 14.50,
    description:
      'Une box généreuse garnie de frites croustillantes au paprika et de lamelles de bœuf entrecôte 100% grillées, servie en formule complète avec boisson 33cl et un tiramisu artisanal au choix.',
    ingredients: [
      'Viande d’entrecôte 100% bœuf chaude',
      'Base de frites maison au paprika',
      'Boisson 33cl incluse',
      'Tiramisu maison au choix inclus',
    ],
    tag: 'Formule Tout-en-Un',
    image: '/assets/aistudio/WOODZ_08_Menu_Doner_Simple_b869b040.jpg',
    imageObjectPosition: '42% 76%',
    driveMatchKeys: ['WOODZ_10', 'WOODZ_15', 'Box_Frites', 'Box'],
  },
  {
    id: 'box-legumes-viande',
    code: '13. FORMAT MÉDITERRANÉEN',
    name: 'Menu Box Légumes Grillés & Viande',
    subtitle: 'Box Entrecôte, Légumes Grillés & Feta + Boisson + Tiramisu',
    category: 'box',
    priceSeul: 14.90,
    description:
      'Alternative savoureuse mêlant notre viande 100% bœuf entrecôte, nos légumes grillés (poivrons, courgettes, oignons), feta et frites dorées, accompagnée d’une boisson et d’un tiramisu.',
    ingredients: [
      'Viande 100% bœuf entrecôte & Feta',
      'Légumes grillés & Frites paprika',
      'Boisson 33cl au choix',
      'Tiramisu artisanal inclus',
    ],
    image: '/assets/aistudio/WOODZ_07_Menu_Alaturka_8579b22a.jpg',
    imageObjectPosition: '48% 76%',
    driveMatchKeys: ['WOODZ_16', 'Box_Legumes'],
  },

  // DESSERTS & EXTRAS
  {
    id: 'tiramisu-pistache',
    code: '14. PÂTISSERIE MAISON',
    name: 'Tiramisu Pistache & Spéculoos',
    subtitle: 'Crème Mascarpone Onctueuse · Éclats de Pistaches Torréfiées',
    category: 'desserts',
    priceSeul: 5.10,
    description:
      'Préparé sur place : biscuit spéculoos délicatement imbibé, crème mascarpone aérienne au praliné de pistache véritable et éclats de pistaches vertes croquantes.',
    ingredients: [
      'Crème mascarpone artisanale',
      'Praliné de pistache pure',
      'Biscuit Spéculoos croustillant',
      'Préparé chaque jour en cuisine',
    ],
    tag: 'Fait Maison',
    image: '/assets/aistudio/WOODZ_02_Sandwich_Alaturka_178c2dae.jpg',
    imageObjectPosition: 'center 68%',
    driveMatchKeys: ['WOODZ_20', 'Tiramisu_Pistache', 'Tiramisu'],
  },
  {
    id: 'tiramisu-kinder-caramel',
    code: '15. DOUCEUR GOURMANDE',
    name: 'Tiramisu Kinder Bueno ou Caramel',
    subtitle: 'Cœur Fondant Noisette-Chocolat ou Caramel Beurre Salé',
    category: 'desserts',
    priceSeul: 5.10,
    description:
      'Notre tiramisu signature décliné en version Kinder Bueno fondant aux noisettes ou Caramel au beurre salé sur lit de spéculoos.',
    ingredients: [
      'Mascarpone fouetté minute',
      'Éclats de Kinder Bueno & Noisettes',
      'Base biscuit Spéculoos',
      'Coulis cacao & caramel',
    ],
    image: '/assets/aistudio/WOODZ_08_Menu_Doner_Simple_b869b040.jpg',
    imageObjectPosition: '60% 75%',
    driveMatchKeys: ['WOODZ_21', 'Tiramisu_Kinder'],
  },
  {
    id: 'frites-paprika-grande',
    code: '16. ACCOMPAGNEMENT SIGNATURE',
    name: 'Grande Portion Frites au Paprika',
    subtitle: 'Dorées Minute · Épices Douces Maison & 2 Sauces',
    category: 'desserts',
    priceSeul: 5.10,
    description:
      'Nos fameuses frites croustillantes à l’extérieur et fondantes à cœur, relevées de notre mélange secret au paprika doux et servies avec deux sauces au choix.',
    ingredients: [
      'Pommes de terre sélectionnées',
      'Assaisonnement paprika doux signature',
      'Double cuisson croustillante',
      '2 Ramequins de sauce inclus',
    ],
    image: '/assets/aistudio/WOODZ_12_Assiette_Classique_91ba70ff.jpg',
    imageObjectPosition: '75% 60%',
    driveMatchKeys: ['WOODZ_18', 'Frites_Paprika', 'Frites'],
  },
];

export const ALSACE_BRANCHES: BranchInfo[] = [
  {
    id: 'selestat',
    name: "Wood'Z Sélestat",
    city: 'Sélestat',
    postalCode: '67600',
    zone: 'Zone Industrielle Nord',
    address: '2 Rue du Foulon / 16 Rue de la Maison Rouge, 67600 Sélestat',
    landmark: 'ZI Nord · À deux pas du E.Leclerc et Norauto',
    phone: '06 89 04 12 87',
    hours: {
      weekdays: 'Lun – Ven : 11h00 – 14h00 & 18h00 – 21h00',
      saturday: 'Samedi : 11h00 – 21h00 (Service continu)',
      sunday: 'Dimanche : Fermé',
    },
    isOpenSunday: false,
    flagshipTag: 'Maison Historique · Chalet Bois',
    image: '/assets/aistudio/WOODZ_27_Facade_Selestat_2f6cfc2e.jpg',
    coordinates: '48.2735° N, 7.4612° E',
  },
  {
    id: 'illkirch',
    name: "Wood'Z Illkirch-Graffenstaden",
    city: 'Illkirch · Strasbourg Sud',
    postalCode: '67400',
    zone: 'Zone Commerciale Sud',
    address: "40 Rue de l'Industrie, 67400 Illkirch-Graffenstaden",
    landmark: 'Près de Sport 2000 · Accès direct Parking gratuit',
    phone: '07 82 72 29 02',
    hours: {
      weekdays: 'Lun – Ven : 11h00 – 14h00 & 18h00 – 21h00',
      saturday: 'Samedi : 11h00 – 21h00 (Service continu)',
      sunday: 'Dimanche : 17h00 – 21h00',
    },
    isOpenSunday: true,
    flagshipTag: 'Ouvert 7j/7 · Terrasse & Sur Place',
    image: '/assets/aistudio/WOODZ_27_Facade_Selestat_2f6cfc2e.jpg',
    coordinates: '48.5194° N, 7.7145° E',
  },
  {
    id: 'houssen',
    name: "Wood'Z Colmar / Houssen",
    city: 'Houssen · Colmar Nord',
    postalCode: '68125',
    zone: 'Zone Commerciale Rosenkranz',
    address: '1 Rue de Ribeaupierre, 68125 Houssen',
    landmark: 'Secteur Commercial Cora Houssen · Accès A35 rapide',
    phone: '03 89 30 21 54',
    hours: {
      weekdays: 'Lun – Ven : 11h00 – 14h00 & 18h00 – 21h30',
      saturday: 'Samedi : 11h00 – 21h30 (Service continu)',
      sunday: 'Dimanche : 17h00 – 21h00',
    },
    isOpenSunday: true,
    flagshipTag: 'Ouvert 7j/7 · Haut-Rhin (68)',
    image: '/assets/aistudio/WOODZ_27_Facade_Selestat_2f6cfc2e.jpg',
    coordinates: '48.1286° N, 7.3768° E',
  },
];

export const BRAND_POSTERS = [
  {
    id: 'poster-alaturka',
    title: 'Sandwich Alaturka · Double Viande XXL',
    subtitle: 'Édition Gourmande · Bœuf Entrecôte & Feta',
    category: 'Sandwich Signature',
    src: '/assets/aistudio/WOODZ_02_Sandwich_Alaturka_178c2dae.jpg',
  },
  {
    id: 'poster-assiette',
    title: 'Assiette Classique sur Ardoise',
    subtitle: '100% Bœuf · Frites au Paprika · Pain du Jour',
    category: 'Assiette Artisanale',
    src: '/assets/aistudio/WOODZ_12_Assiette_Classique_91ba70ff.jpg',
  },
  {
    id: 'poster-menu-alaturka',
    title: 'Menu Alaturka Complet',
    subtitle: 'Plateau Bois · Frites Paprika & Boisson Fraîche',
    category: 'Formule Menu',
    src: '/assets/aistudio/WOODZ_07_Menu_Alaturka_8579b22a.jpg',
  },
  {
    id: 'poster-menu-doner',
    title: 'Menu Döner · La Formule Bistro',
    subtitle: 'Simple, généreux & préparé à la minute',
    category: 'Esprit Bistro',
    src: '/assets/aistudio/WOODZ_08_Menu_Doner_Simple_b869b040.jpg',
  },
  {
    id: 'poster-doner-simple',
    title: 'Döner Simple · L’Essentiel Artisanal',
    subtitle: 'Pain rond aux graines & Entrecôte grillée',
    category: 'Savoir-Faire',
    src: '/assets/aistudio/WOODZ_03_Doner_Simple_84246f27.jpg',
  },
  {
    id: 'poster-facade-selestat',
    title: 'Chalet Wood’Z Sélestat (67600)',
    subtitle: 'Votre Escale Gourmande en Alsace',
    category: 'Architecture & Branches',
    src: '/assets/aistudio/WOODZ_27_Facade_Selestat_2f6cfc2e.jpg',
  },
];
