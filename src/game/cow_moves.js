export function cowDraw(G, ctx) {
  if (G.availableCowboys >= 1) {
    G.availableCowboys--;
    for (var i = 0; i < 2; i++) {
      if (G.cowDeck.length > 0) {
        G.cowMarket = [...G.cowMarket, G.cowDeck.pop()];
      }
    }
  } else {
    console.log("no more cowboys left");
  }
}

export function cowBuy(G, ctx, value, price, cows) {
  if (!Array.isArray(cows)) {
    cows = [cows];
  }
  if (
    !cows
      .map(index => G.cowMarket[index].value)
      .every(cowValue => cowValue == value)
  ) {
    console.log("wrong value cow");
  } else {
    if (price > G.player.money) {
      console.log("not enough money");
    } else {
      if (value == 3 && price == 6 && cows.length == 1) {
        wrangleCows(G, 1, cows);
      } else if (value == 3 && price == 3 && cows.length == 1) {
        wrangleCows(G, 2, cows);
      } else if (value == 3 && price == 5 && cows.length == 2) {
        wrangleCows(G, 3, cows);
      } else if (value == 4 && price == 12 && cows.length == 1) {
        wrangleCows(G, 1, cows);
      } else if (value == 4 && price == 6 && cows.length == 1) {
        wrangleCows(G, 3, cows);
      } else if (value == 4 && price == 8 && cows.length == 2) {
        wrangleCows(G, 5, cows);
      } else if (value == 5 && price == 12 && cows.length == 1) {
        wrangleCows(G, 2, cows);
      } else if (value == 5 && price == 6 && cows.length == 1) {
        wrangleCows(G, 4, cows);
      }
      G.player.money -= price;
    }
  }
}

export function cowPass(G, ctx) {
  ctx.events.endPhase();
}

function wrangleCows(G, cowboys, cows) {
  if (G.availableCowboys >= cowboys) {
    G.availableCowboys -= cowboys;
    const cow = cows
      .sort()
      .reverse()
      .map(cowIndex => G.cowMarket.splice(cowIndex, 1)[0]);
    G.player.cards.discard = [...cow, ...G.player.cards.discard];
  }
}
