"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { buildDeck, shuffle, draw } from "@/lib/deck";
import { total, isBust, dealerPlay } from "@/lib/scoring";
import type { Card, Hand } from "@/app/types";

export default function Page() {
  // fresh shuffled deck on first render
  const initialDeck = useMemo(() => shuffle(buildDeck()), []);
  const [deck, setDeck] = useState(initialDeck);
  const [player, setPlayer] = useState<Hand>([]);
  const [dealer, setDealer] = useState<Hand>([]);
  const [phase, setPhase] = useState<"idle" | "player" | "dealer" | "done">(
    "idle"
  );
  const [msg, setMsg] = useState("");

  const drawOne = () => {
    let d = deck;
    if (d.length === 0) d = shuffle(buildDeck()); // auto-reshuffle if empty
    const [[c], rest] = draw(d, 1);
    setDeck(rest);
    return c;
  };

  const deal = () => {
    // get 2 each
    const c1 = drawOne(),
      c2 = drawOne(),
      d1 = drawOne(),
      d2 = drawOne();
    const ph: Hand = [c1, c2];
    const dh: Hand = [d1, d2];
    setPlayer(ph);
    setDealer(dh);
    setMsg("");
    setPhase("player");
  };

  const hit = () => {
    const next = [...player, drawOne()];
    setPlayer(next);
    if (isBust(next)) {
      setMsg("💥 Bust! Dealer wins.");
      setPhase("done");
    }
  };

  const stand = () => {
    setPhase("dealer");
    const finalDealer = dealerPlay(dealer, drawOne);
    setDealer(finalDealer);

    const p = total(player),
      d = total(finalDealer);
    const result =
      d > 21 || p > d ? "You win!" : p < d ? "Dealer wins." : "Push.";
    setMsg(result);
    setPhase("done");
  };

  const renderHand = (h: Hand) =>
    h.map((c, i) => (
      <span key={i} className="inline-block px-2 py-1 border rounded mx-1">
        {c.rank}
        {c.suit}
      </span>
    ));

  return (
    <main className="p-8 max-w-3xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">♠️ Blackjack</h1>

      <section>
        <h2 className="font-semibold">Dealer — {total(dealer)}</h2>
        <div className="mt-2">
          {dealer.length ? renderHand(dealer) : <em>—</em>}
        </div>
      </section>

      <section>
        <h2 className="font-semibold">Player — {total(player)}</h2>
        <div className="mt-2">
          {player.length ? renderHand(player) : <em>—</em>}
        </div>
      </section>

      <div className="flex gap-3 justify-center">
        <Button onClick={deal} disabled={phase === "player"}>
          Bet & Deal
        </Button>
        <Button onClick={hit} disabled={phase !== "player"} variant="secondary">
          Hit
        </Button>
        <Button
          onClick={stand}
          disabled={phase !== "player"}
          variant="destructive"
        >
          Stand
        </Button>
      </div>

      {msg && <p className="text-lg font-semibold">{msg}</p>}
    </main>
  );
}
