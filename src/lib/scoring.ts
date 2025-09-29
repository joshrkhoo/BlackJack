import type { Card, Hand } from "@/app/types";

const cardValue = (c: Card) =>
  c.rank === "A" ? 11 : ["K", "Q", "J"].includes(c.rank) ? 10 : Number(c.rank);

export const total = (hand: Hand) => {
  let sum = hand.reduce((a, c) => a + cardValue(c), 0);
  let aces = hand.filter((c) => c.rank === "A").length;
  // Make Aces 1 as needed
  while (sum > 21 && aces > 0) {
    sum -= 10;
    aces--;
  }
  return sum;
};

export const isBust = (h: Hand) => total(h) > 21;
export const isBlackjack = (h: Hand) => h.length === 2 && total(h) === 21;

/** Dealer draws until total >= 17 (classic rules; simple soft-17 handling via total()). */
export const dealerPlay = (start: Hand, drawOne: () => Card): Hand => {
  const hand = [...start];
  while (total(hand) < 17) hand.push(drawOne());
  return hand;
};
