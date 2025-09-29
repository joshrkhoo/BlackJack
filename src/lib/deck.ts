import type { Card, Rank, Suit } from "@/app/types";

const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
const RANKS: Rank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const buildDeck = (): Card[] =>
  SUITS.flatMap((suit) => RANKS.map((rank) => ({ rank, suit })));

export const shuffle = (deck: Card[]) => {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
};

/** Draw n cards from the *front* of the deck. Returns [drawn, remaining]. */
export const draw = (deck: Card[], n = 1): [Card[], Card[]] => {
  const drawn = deck.slice(0, n);
  const remaining = deck.slice(n);
  return [drawn, remaining];
};
