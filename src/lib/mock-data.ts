import { Product, Category, BlogPost, Order } from './types';

// ===========================
// DONNÉES MOCK - CATÉGORIES
// ===========================
export const mockCategories: Category[] = [
  {
    _id: 'cat-1',
    name: 'Ceintures',
    slug: 'ceintures',
    description: 'Ceintures en cuir tunisien, tannées à la main avec des techniques ancestrales.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  },
  {
    _id: 'cat-2',
    name: 'Portefeuilles',
    slug: 'portefeuilles',
    description: 'Portefeuilles artisanaux en cuir pleine fleur, élégants et durables.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  },
  {
    _id: 'cat-3',
    name: 'Sacs',
    slug: 'sacs',
    description: 'Sacs à main et besaces en cuir fait main, alliant tradition et modernité.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  },
];

// ===========================
// DONNÉES MOCK - PRODUITS
// ===========================
export const mockProducts: Product[] = [
  {
    _id: 'prod-1',
    name: 'Ceinture Carthage',
    slug: 'ceinture-carthage',
    price: 89,
    comparePrice: 120,
    description: 'La ceinture Carthage est un hommage à l\'artisanat tunisien séculaire. Fabriquée à partir de cuir pleine fleur tanné végétalement dans les ateliers traditionnels de Tunis, cette ceinture allie robustesse et élégance. Chaque pièce est unique, portant les marques subtiles du travail manuel de nos artisans. La boucle en laiton vieilli complète le look authentique.',
    shortDescription: 'Ceinture en cuir pleine fleur, tannage végétal traditionnel.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', alt: 'Ceinture Carthage vue de face' },
      { _key: 'img-2', url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', alt: 'Ceinture Carthage détail boucle' },
    ],
    category: mockCategories[0],
    inStock: true,
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    _id: 'prod-2',
    name: 'Ceinture Médina',
    slug: 'ceinture-medina',
    price: 75,
    description: 'Inspirée par les ruelles colorées de la médina de Tunis, la ceinture Médina présente un design épuré avec des coutures apparentes en fil de lin. Le cuir est sélectionné avec soin pour sa souplesse et sa patine naturelle qui se bonifie avec le temps.',
    shortDescription: 'Ceinture artisanale avec coutures en fil de lin naturel.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1585856331426-2ed78cdb39e1?w=800&q=80', alt: 'Ceinture Médina' },
    ],
    category: mockCategories[0],
    inStock: true,
    featured: false,
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    _id: 'prod-3',
    name: 'Portefeuille Djerba',
    slug: 'portefeuille-djerba',
    price: 65,
    comparePrice: 85,
    description: 'Le portefeuille Djerba incarne l\'élégance méditerranéenne. Conçu en cuir de vachette tanné naturellement, il offre un compartiment billets, 6 emplacements pour cartes et une poche zippée pour la monnaie. Sa teinte caramel profonde et ses finitions soignées en font un accessoire incontournable.',
    shortDescription: 'Portefeuille en cuir de vachette, 6 emplacements cartes.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80', alt: 'Portefeuille Djerba' },
      { _key: 'img-2', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', alt: 'Portefeuille Djerba ouvert' },
    ],
    category: mockCategories[1],
    inStock: true,
    featured: true,
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    _id: 'prod-4',
    name: 'Portefeuille Sidi Bou',
    slug: 'portefeuille-sidi-bou',
    price: 55,
    description: 'Le portefeuille Sidi Bou, nommé d\'après le pittoresque village de Sidi Bou Saïd, arbore un cuir d\'une teinte miel chaleureuse. Compact mais fonctionnel, il s\'adapte parfaitement à un usage quotidien tout en apportant une touche d\'authenticité tunisienne.',
    shortDescription: 'Portefeuille compact en cuir miel, design minimaliste.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80', alt: 'Portefeuille Sidi Bou' },
    ],
    category: mockCategories[1],
    inStock: true,
    featured: false,
    createdAt: '2024-03-05T10:00:00Z',
  },
  {
    _id: 'prod-5',
    name: 'Sac Yasmine',
    slug: 'sac-yasmine',
    price: 195,
    comparePrice: 250,
    description: 'Le sac Yasmine est notre pièce maîtresse. Ce sac à main en cuir pleine fleur est entièrement cousu à la main par nos artisans les plus expérimentés. Avec sa bandoulière réglable, ses compartiments intérieurs et sa fermeture magnétique artisanale, il allie fonctionnalité et beauté. Le cuir développe une patine unique avec le temps.',
    shortDescription: 'Sac à main premium en cuir pleine fleur, cousu main.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', alt: 'Sac Yasmine' },
      { _key: 'img-2', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', alt: 'Sac Yasmine porté' },
    ],
    category: mockCategories[2],
    inStock: true,
    featured: true,
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    _id: 'prod-6',
    name: 'Besace Hammamet',
    slug: 'besace-hammamet',
    price: 155,
    description: 'La besace Hammamet évoque les voyages méditerranéens et l\'esprit bohème. Fabriquée en cuir souple tanné végétalement, elle se porte en bandoulière et peut accueillir un ordinateur portable 13 pouces. Idéale pour le quotidien comme pour les escapades.',
    shortDescription: 'Besace en cuir souple, compartiment laptop 13 pouces.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80', alt: 'Besace Hammamet' },
    ],
    category: mockCategories[2],
    inStock: true,
    featured: true,
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    _id: 'prod-7',
    name: 'Ceinture Kairouan',
    slug: 'ceinture-kairouan',
    price: 95,
    description: 'La ceinture Kairouan rend hommage à la ville sainte de Tunisie. Décorée de motifs géométriques discrets inspirés de l\'architecture islamique, cette ceinture en cuir épais est une véritable œuvre d\'art à porter. Boucle en acier inoxydable brossé.',
    shortDescription: 'Ceinture ornée de motifs géométriques traditionnels.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', alt: 'Ceinture Kairouan' },
    ],
    category: mockCategories[0],
    inStock: false,
    featured: false,
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    _id: 'prod-8',
    name: 'Porte-cartes Tabarka',
    slug: 'porte-cartes-tabarka',
    price: 35,
    description: 'Le porte-cartes Tabarka est l\'accessoire minimaliste par excellence. Ultra-fin et léger, il accueille jusqu\'à 8 cartes et quelques billets. Le cuir tanné naturellement lui confère un caractère unique qui évolue avec le temps.',
    shortDescription: 'Porte-cartes ultra-fin en cuir naturel, 8 emplacements.',
    images: [
      { _key: 'img-1', url: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80', alt: 'Porte-cartes Tabarka' },
    ],
    category: mockCategories[1],
    inStock: true,
    featured: false,
    createdAt: '2024-04-01T10:00:00Z',
  },
];

// ===========================
// DONNÉES MOCK - ARTICLES BLOG
// ===========================
export const mockBlogPosts: BlogPost[] = [
  {
    _id: 'blog-1',
    title: 'L\'Art du Tannage Végétal en Tunisie',
    slug: 'art-tannage-vegetal-tunisie',
    excerpt: 'Découvrez les secrets millénaires du tannage végétal pratiqué dans les tanneries traditionnelles de Tunisie, un savoir-faire transmis de génération en génération.',
    content: [],
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    author: 'Amira Ben Ali',
    publishedAt: '2024-03-01T10:00:00Z',
    tags: ['artisanat', 'tannage', 'tradition'],
  },
  {
    _id: 'blog-2',
    title: 'Comment Entretenir Votre Cuir Artisanal',
    slug: 'entretenir-cuir-artisanal',
    excerpt: 'Conseils pratiques pour préserver la beauté et la longévité de vos articles en cuir CURA. Du nettoyage à l\'hydratation, tout ce qu\'il faut savoir.',
    content: [],
    coverImage: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800&q=80',
    author: 'Karim Trabelsi',
    publishedAt: '2024-02-15T10:00:00Z',
    tags: ['entretien', 'conseils', 'cuir'],
  },
  {
    _id: 'blog-3',
    title: 'Les Artisans de CURA : Rencontre avec Maître Hassan',
    slug: 'artisans-cura-maitre-hassan',
    excerpt: 'Portrait de Maître Hassan, artisan maroquinier depuis 40 ans, qui perpétue l\'excellence du travail du cuir dans son atelier de la médina de Tunis.',
    content: [],
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    author: 'Amira Ben Ali',
    publishedAt: '2024-01-20T10:00:00Z',
    tags: ['artisans', 'portrait', 'tradition'],
  },
];

// ===========================
// DONNÉES MOCK - COMMANDES
// ===========================
export const mockOrders: Order[] = [
  {
    _id: 'order-1',
    orderNumber: 'CURA-2024-001',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.martin@email.com',
    items: [
      { productId: 'prod-5', name: 'Sac Yasmine', price: 195, quantity: 1, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80' },
      { productId: 'prod-3', name: 'Portefeuille Djerba', price: 65, quantity: 1, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80' },
    ],
    totalAmount: 260,
    status: 'delivered',
    stripeSessionId: 'cs_test_001',
    shippingAddress: '12 Rue de la Liberté, 1000 Tunis',
    createdAt: '2024-03-10T14:30:00Z',
  },
  {
    _id: 'order-2',
    orderNumber: 'CURA-2024-002',
    customerName: 'Ahmed Bouazizi',
    customerEmail: 'ahmed.b@email.com',
    items: [
      { productId: 'prod-1', name: 'Ceinture Carthage', price: 89, quantity: 2, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80' },
    ],
    totalAmount: 178,
    status: 'shipped',
    stripeSessionId: 'cs_test_002',
    shippingAddress: '45 Avenue Habib Bourguiba, 3000 Sfax',
    createdAt: '2024-03-15T09:15:00Z',
  },
  {
    _id: 'order-3',
    orderNumber: 'CURA-2024-003',
    customerName: 'Marie Dupont',
    customerEmail: 'marie.dupont@email.com',
    items: [
      { productId: 'prod-6', name: 'Besace Hammamet', price: 155, quantity: 1, image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=200&q=80' },
    ],
    totalAmount: 155,
    status: 'pending',
    stripeSessionId: 'cs_test_003',
    shippingAddress: '8 Rue de la Kasbah, 4000 Sousse',
    createdAt: '2024-03-18T16:45:00Z',
  },
  {
    _id: 'order-4',
    orderNumber: 'CURA-2024-004',
    customerName: 'Fatma Khelifi',
    customerEmail: 'fatma.k@email.com',
    items: [
      { productId: 'prod-8', name: 'Porte-cartes Tabarka', price: 35, quantity: 3, image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=200&q=80' },
      { productId: 'prod-4', name: 'Portefeuille Sidi Bou', price: 55, quantity: 1, image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=200&q=80' },
    ],
    totalAmount: 160,
    status: 'confirmed',
    stripeSessionId: 'cs_test_004',
    shippingAddress: '22 Avenue de France, 1001 Tunis',
    createdAt: '2024-03-19T11:00:00Z',
  },
];
