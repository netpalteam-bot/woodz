import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_MENU_ITEMS } from '../data/woodzData';
import {
  filterMenuItems,
  addOrIncrementCartItem,
  updateCartItemQuantity,
  calculateCartTotals,
  formatEuroPrice,
  matchDriveFilesToMenu,
  validateOrderForm,
} from './menuLogic';

test('filterMenuItems returns all 16 items when category is all and query is empty', () => {
  const result = filterMenuItems(INITIAL_MENU_ITEMS, 'all', '');
  assert.equal(result.length, 16);
});

test('filterMenuItems filters by category accurately', () => {
  const sandwichs = filterMenuItems(INITIAL_MENU_ITEMS, 'sandwichs', '');
  assert.equal(sandwichs.length, 4);

  const assiettes = filterMenuItems(INITIAL_MENU_ITEMS, 'assiettes', '');
  assert.equal(assiettes.length, 3);
});

test('filterMenuItems searches across ingredients and titles', () => {
  const fetaItems = filterMenuItems(INITIAL_MENU_ITEMS, 'all', 'feta');
  assert.ok(fetaItems.length >= 4);
  assert.ok(fetaItems.some((i) => i.id === 'sandwich-alaturka'));
});

test('cart calculations increment quantities and format Euro prices accurately', () => {
  const alaturka = INITIAL_MENU_ITEMS[0];
  let cart = addOrIncrementCartItem([], {
    item: alaturka,
    isMenuFormula: false,
    unitPrice: alaturka.priceSeul,
    quantity: 1,
    selectedSauce: 'Blanche Artisanale (Herbes & Ail doux)',
    selectedBranchId: 'selestat',
  });

  assert.equal(cart.length, 1);
  assert.equal(calculateCartTotals(cart).formattedSubtotal, '12,90 €');

  // Add same item again -> increments quantity
  cart = addOrIncrementCartItem(cart, {
    item: alaturka,
    isMenuFormula: false,
    unitPrice: alaturka.priceSeul,
    quantity: 2,
    selectedSauce: 'Blanche Artisanale (Herbes & Ail doux)',
    selectedBranchId: 'selestat',
  });

  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 3);
  assert.equal(calculateCartTotals(cart).subtotal, 38.7);
  assert.equal(calculateCartTotals(cart).formattedSubtotal, '38,70 €');

  // Decrement quantity
  cart = updateCartItemQuantity(cart, cart[0].cartKey, -2);
  assert.equal(cart[0].quantity, 1);
});

test('matchDriveFilesToMenu maps Drive files from WOODZ-Gemini to matching dishes', () => {
  const mockDriveFiles = [
    {
      id: 'drive-1',
      name: 'WOODZ_12_Assiette_Classique_HD.jpg',
      blobUrl: 'blob:woodz-12-hd',
    },
  ];
  const updated = matchDriveFilesToMenu(INITIAL_MENU_ITEMS, mockDriveFiles);
  const assiette = updated.find((i) => i.id === 'assiette-classique');
  assert.equal(assiette?.image, 'blob:woodz-12-hd');
});

test('validateOrderForm validates required customer fields', () => {
  assert.equal(
    validateOrderForm({
      customerName: '',
      customerPhone: '0612345678',
      pickupTime: '12:30',
      branchId: 'selestat',
    }).valid,
    false
  );

  assert.equal(
    validateOrderForm({
      customerName: 'Karim Mansour',
      customerPhone: '06 89 04 12 87',
      pickupTime: '19:15',
      branchId: 'selestat',
    }).valid,
    true
  );
});

test('formatEuroPrice uses European comma formatting', () => {
  assert.equal(formatEuroPrice(17.5), '17,50 €');
  assert.equal(formatEuroPrice(9.5), '9,50 €');
});
