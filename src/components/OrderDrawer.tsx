import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { BranchInfo } from '../data/woodzData';
import {
  CartItem,
  calculateCartTotals,
  formatEuroPrice,
  validateOrderForm,
} from '../utils/menuLogic';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  branches: BranchInfo[];
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  branches,
  selectedBranchId,
  onSelectBranch,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('12:30');
  const [orderType, setOrderType] = useState<'emporter' | 'sur-place'>('emporter');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    customerName: string;
    branchName: string;
    pickupTime: string;
    totalFormatted: string;
    orderType: string;
  } | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(cart);
  const currentBranch =
    branches.find((b) => b.id === selectedBranchId) || branches[0];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validation = validateOrderForm({
      customerName,
      customerPhone,
      pickupTime,
      branchId: selectedBranchId,
    });

    if (!validation.valid) {
      setFormError(validation.error || 'Veuillez vérifier vos informations.');
      return;
    }

    const orderNum = `WZ-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      customerName: customerName.trim(),
      branchName: currentBranch.name,
      pickupTime,
      totalFormatted: totals.formattedSubtotal,
      orderType: orderType === 'emporter' ? 'À Emporter' : 'Sur Place',
    });
    onClearCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Votre commande Wood'Z Kebab House"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg bg-[#141210] text-[#F5F2EB] border-l border-[#292524] h-full flex flex-col justify-between overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#292524] flex items-center justify-between sticky top-0 bg-[#141210] z-10">
          <div>
            <div className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#C5A059]">
              Click &amp; Collect · Alsace
            </div>
            <h2 className="font-display text-2xl font-bold text-[#F5F2EB]">
              Votre Commande Wood&apos;Z
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panier"
            className="p-2 text-[#A8A29E] hover:text-[#F5F2EB] border border-[#292524] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 flex-1 space-y-6">
          {confirmedOrder ? (
            <div className="p-6 bg-[#1C1917] border border-[#C5A059] space-y-4">
              <div className="flex items-center gap-3 text-[#C5A059]">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-widest">
                    Commande Confirmée #{confirmedOrder.orderNumber}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#F5F2EB]">
                    Merci {confirmedOrder.customerName} !
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#A8A29E] leading-relaxed">
                Votre commande est transmise en cuisine chez{' '}
                <strong className="text-[#F5F2EB]">
                  {confirmedOrder.branchName}
                </strong>
                . Notre équipe prépare votre viande 100% bœuf entrecôte et votre pain chaud à la minute.
              </p>

              <div className="p-4 bg-[#0D0C0B] border border-[#292524] text-xs font-mono-tabular space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#A8A29E]">Restaurant :</span>
                  <span className="text-[#F5F2EB]">{confirmedOrder.branchName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8A29E]">Mode :</span>
                  <span className="text-[#F5F2EB]">{confirmedOrder.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8A29E]">Heure de retrait :</span>
                  <span className="text-[#C5A059]">{confirmedOrder.pickupTime}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#292524] text-sm font-bold">
                  <span className="text-[#F5F2EB]">Total à régler sur place :</span>
                  <span className="text-[#C5A059]">
                    {confirmedOrder.totalFormatted}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="w-full py-3 bg-[#D92323] hover:bg-[#B91C1C] text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Retourner au site
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#C5A059] mx-auto opacity-75" />
              <div className="font-display text-xl text-[#F5F2EB]">
                Votre sélection est vide
              </div>
              <p className="text-sm text-[#A8A29E] max-w-xs mx-auto">
                Parcourez notre carte pour ajouter un Sandwich Alaturka, un Döner Simple ou une Assiette Classique.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-[#D92323] text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Découvrir la Carte
              </button>
            </div>
          ) : (
            <>
              {/* Itemized Cart List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#A8A29E]">
                  <span>Articles sélectionnés ({totals.totalItems})</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-[#D92323] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vider</span>
                  </button>
                </div>

                {cart.map((entry) => (
                  <div
                    key={entry.cartKey}
                    className="p-4 bg-[#1C1917] border border-[#292524] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-display font-bold text-[#F5F2EB]">
                        {entry.item.name}
                      </div>
                      <div className="text-xs text-[#C5A059] mt-0.5">
                        {entry.isMenuFormula
                          ? 'Formule Menu (Frites Paprika + Boisson)'
                          : 'Seul'}
                        {' · '}Sauce {entry.selectedSauce}
                      </div>
                      <div className="text-xs font-mono-tabular text-[#A8A29E] mt-1">
                        {formatEuroPrice(entry.unitPrice)} / unité
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        aria-label={`Diminuer la quantité de ${entry.item.name}`}
                        onClick={() => onUpdateQuantity(entry.cartKey, -1)}
                        className="p-1.5 bg-[#0D0C0B] border border-[#292524] text-[#F5F2EB] hover:border-[#C5A059] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono-tabular text-sm font-bold w-6 text-center">
                        {entry.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Augmenter la quantité de ${entry.item.name}`}
                        onClick={() => onUpdateQuantity(entry.cartKey, 1)}
                        className="p-1.5 bg-[#0D0C0B] border border-[#292524] text-[#F5F2EB] hover:border-[#C5A059] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Configuration Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-4 pt-4 border-t border-[#292524]">
                <div className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                  Informations de Retrait (Click &amp; Collect)
                </div>

                <div>
                  <label
                    htmlFor="order-branch"
                    className="block text-xs text-[#A8A29E] mb-1"
                  >
                    Restaurant Wood&apos;Z de retrait
                  </label>
                  <select
                    id="order-branch"
                    value={selectedBranchId}
                    onChange={(e) => onSelectBranch(e.target.value)}
                    className="w-full bg-[#0D0C0B] border border-[#292524] px-3 py-2.5 text-sm text-[#F5F2EB]"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.address}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('emporter')}
                    className={`py-2 text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                      orderType === 'emporter'
                        ? 'bg-[#C5A059] text-[#0D0C0B] border-[#C5A059]'
                        : 'bg-[#0D0C0B] text-[#A8A29E] border-[#292524]'
                    }`}
                  >
                    À Emporter
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('sur-place')}
                    className={`py-2 text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                      orderType === 'sur-place'
                        ? 'bg-[#C5A059] text-[#0D0C0B] border-[#C5A059]'
                        : 'bg-[#0D0C0B] text-[#A8A29E] border-[#292524]'
                    }`}
                  >
                    Sur Place
                  </button>
                </div>

                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-xs text-[#A8A29E] mb-1"
                  >
                    Votre Nom &amp; Prénom
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Karim Mansour"
                    className="w-full bg-[#0D0C0B] border border-[#292524] px-3 py-2.5 text-sm text-[#F5F2EB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="customer-phone"
                      className="block text-xs text-[#A8A29E] mb-1"
                    >
                      Téléphone
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full bg-[#0D0C0B] border border-[#292524] px-3 py-2.5 text-sm text-[#F5F2EB]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pickup-time"
                      className="block text-xs text-[#A8A29E] mb-1"
                    >
                      Créneau souhaité
                    </label>
                    <select
                      id="pickup-time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-[#0D0C0B] border border-[#292524] px-3 py-2.5 text-sm text-[#F5F2EB]"
                    >
                      <option value="Dès que possible (15-20 min)">
                        Dès que possible (15–20 min)
                      </option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:15">19:15</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <div className="p-3 bg-[#D92323]/20 border border-[#D92323] text-xs text-[#F5F2EB]">
                    {formError}
                  </div>
                )}

                <div className="pt-4 border-t border-[#292524] space-y-3">
                  <div className="flex items-center justify-between text-base font-bold">
                    <span>Total Commande (TTC)</span>
                    <span className="font-mono-tabular text-xl text-[#C5A059]">
                      {totals.formattedSubtotal}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#D92323] hover:bg-[#B91C1C] text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Confirmer la Commande ({totals.formattedSubtotal})
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
