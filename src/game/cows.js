function Jersey() {
  return {
    name: "Jersey",
    value: 1,
    points: 0
  };
}

function Guernsey() {
  return {
    name: "Guernsey",
    value: 2,
    points: 0
  };
}

function DutchBelt() {
  return {
    name: "Dutch Belt",
    value: 2,
    points: 0
  };
}

function BlackAngus() {
  return {
    name: "Black Angus",
    value: 2,
    points: 0
  };
}

function Holstein() {
  return {
    name: "Holstein",
    value: 3,
    points: 1
  };
}

function BrownSwiss() {
  return {
    name: "Brown Swiss",
    value: 3,
    points: 2
  };
}

function Aryshire() {
  return {
    name: "Aryshire",
    value: 3,
    points: 3
  };
}

function WestHighland(points) {
  return {
    name: "West Highland",
    value: 4,
    points: points
  };
}

function TexasLonghorn(points) {
  return {
    name: "Texas Longhorn",
    value: 5,
    points: points
  };
}

export function StartingDeck() {
  let deck = [];
  deck.push(Jersey());
  deck.push(Jersey());
  deck.push(Jersey());
  deck.push(Jersey());
  deck.push(Jersey());
  deck.push(Guernsey());
  deck.push(Guernsey());
  deck.push(Guernsey());
  deck.push(DutchBelt());
  deck.push(DutchBelt());
  deck.push(DutchBelt());
  deck.push(BlackAngus());
  deck.push(BlackAngus());
  deck.push(BlackAngus());
  return {
    deck: deck,
    discard: [],
    hand: []
  };
}

export default function MarketCattle() {
  let market_cattle = [];
  market_cattle.push(Holstein());
  market_cattle.push(Holstein());
  market_cattle.push(Holstein());
  market_cattle.push(Holstein());
  market_cattle.push(Holstein());
  market_cattle.push(Holstein());
  market_cattle.push(Holstein());

  market_cattle.push(BrownSwiss());
  market_cattle.push(BrownSwiss());
  market_cattle.push(BrownSwiss());
  market_cattle.push(BrownSwiss());
  market_cattle.push(BrownSwiss());
  market_cattle.push(BrownSwiss());
  market_cattle.push(BrownSwiss());

  market_cattle.push(Aryshire());
  market_cattle.push(Aryshire());
  market_cattle.push(Aryshire());
  market_cattle.push(Aryshire());
  market_cattle.push(Aryshire());
  market_cattle.push(Aryshire());
  market_cattle.push(Aryshire());

  market_cattle.push(WestHighland(3));
  market_cattle.push(WestHighland(3));
  market_cattle.push(WestHighland(3));
  market_cattle.push(WestHighland(4));
  market_cattle.push(WestHighland(4));
  market_cattle.push(WestHighland(4));
  market_cattle.push(WestHighland(5));
  market_cattle.push(WestHighland(5));
  market_cattle.push(WestHighland(5));

  market_cattle.push(TexasLonghorn(5));
  market_cattle.push(TexasLonghorn(5));
  market_cattle.push(TexasLonghorn(6));
  market_cattle.push(TexasLonghorn(6));
  market_cattle.push(TexasLonghorn(7));
  market_cattle.push(TexasLonghorn(7));

  return market_cattle;
}
