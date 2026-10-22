import { MenuItem, MenuCategory } from '../data/woodzData';

export interface CartItem {
  cartKey: string;
  item: MenuItem;
  isMenuFormula: boolean;
  unitPrice: number;
  quantity: number;
  selectedSauce: string;
  selectedBranchId: string;
}

export function filterMenuItems(
  items: MenuItem[],
  category: 'all' | MenuCategory,
  searchQuery: string
): MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const haystacks = [
      item.name,
      item.subtitle,
      item.description,
      ...item.ingredients,
    ].map((s) => s.toLowerCase());

    return haystacks.some((h) => h.includes(normalizedQuery));
  });
}

export function addOrIncrementCartItem(
  cart: CartItem[],
  newItem: Omit<CartItem, 'cartKey'>
): CartItem[] {
  const cartKey = `${newItem.item.id}__${newItem.isMenuFormula ? 'menu' : 'seul'}__${newItem.selectedSauce}__${newItem.selectedBranchId}`;
  const existingIndex = cart.findIndex((c) => c.cartKey === cartKey);

  if (existingIndex > -1) {
    return cart.map((c, idx) =>
      idx === existingIndex
        ? { ...c, quantity: c.quantity + newItem.quantity }
        : c
    );
  }

  return [
    ...cart,
    {
      ...newItem,
      cartKey,
    },
  ];
}

export function updateCartItemQuantity(
  cart: CartItem[],
  cartKey: string,
  delta: number
): CartItem[] {
  return cart
    .map((c) => {
      if (c.cartKey !== cartKey) return c;
      return { ...c, quantity: c.quantity + delta };
    })
    .filter((c) => c.quantity > 0);
}

export function calculateCartTotals(cart: CartItem[]): {
  totalItems: number;
  subtotal: number;
  formattedSubtotal: string;
} {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  return {
    totalItems,
    subtotal: Number(subtotal.toFixed(2)),
    formattedSubtotal: formatEuroPrice(subtotal),
  };
}

export function formatEuroPrice(price: number): string {
  return `${price.toFixed(2).replace('.', ',')} €`;
}

export function matchDriveFilesToMenu<
  T extends { id: string; name: string; blobUrl?: string; thumbnailLink?: string }
>(menuItems: MenuItem[], driveFiles: T[]): MenuItem[] {
  if (!driveFiles || driveFiles.length === 0) return menuItems;

  return menuItems.map((item) => {
    const matched = driveFiles.find((df) =>
      item.driveMatchKeys.some((key) =>
        df.name.toLowerCase().includes(key.toLowerCase())
      )
    );
    if (matched && (matched.blobUrl || matched.thumbnailLink)) {
      return {
        ...item,
        image: matched.blobUrl || matched.thumbnailLink || item.image,
      };
    }
    return item;
  });
}

export function validateOrderForm(input: {
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  branchId: string;
}): { valid: boolean; error?: string } {
  if (!input.customerName || input.customerName.trim().length < 2) {
    return { valid: false, error: 'Veuillez indiquer votre nom complet.' };
  }
  const cleanPhone = input.customerPhone.replace(/\s+/g, '');
  if (!cleanPhone || cleanPhone.length < 8) {
    return { valid: false, error: 'Veuillez saisir un numéro de téléphone valide.' };
  }
  if (!input.pickupTime) {
    return { valid: false, error: 'Veuillez choisir un créneau de retrait.' };
  }
  if (!input.branchId) {
    return { valid: false, error: 'Veuillez sélectionner un restaurant Wood’Z.' };
  }
  return { valid: true };
}
