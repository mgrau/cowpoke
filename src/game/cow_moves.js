export function cowDraw(G, ctx) {
  console.log(G.availableCowboys);
  if (G.availableCowboys >= 1) {
    G.availableCowboys--;
    if (G.cowDeck.length > 0) {
      //   G.cowMarket.push(G.cowDeck.pop());
      G.cowMarket = [G.cowMarket, G.cowDeck.slice(0, -1)];
      console.log(G.cowMarket);
      //   console.log("looks good");
    }
    // if (G.cowDeck.length > 0) {
    //   G.cowMarket.push(G.cowDeck.pop());
    // }
  } else {
    console.log("no more cowboys left");
  }
}

export function cowBuy(G, ctx, value, price, cow) {}
