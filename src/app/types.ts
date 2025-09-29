export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type Card = { rank: Rank; suit: Suit };
export type Hand = Card[];

export type Outcome = "win" | "lose" | "push" | "blackjack" | "bust" | null;

export type HistoryEntry = {
  id: string;
  timestamp: number;
  bet: number;
  player: Hand;
  dealer: Hand;
  outcome: Exclude<Outcome, null>;
  deltaChips: number;
};
