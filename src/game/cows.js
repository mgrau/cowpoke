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

export function StartingDeck(ctx) {
  const deck = ctx.random.Shuffle([
    Jersey(),
    Jersey(),
    Jersey(),
    Jersey(),
    Jersey(),
    Guernsey(),
    Guernsey(),
    Guernsey(),
    DutchBelt(),
    DutchBelt(),
    DutchBelt(),
    BlackAngus(),
    BlackAngus(),
    BlackAngus()
  ]);
  const hand = [deck.pop(), deck.pop(), deck.pop(), deck.pop()];
  return {
    deck: deck,
    discard: [],
    hand: hand
  };
}

export default function MarketCattle(ctx) {
  return ctx.random.Shuffle([
    Holstein(),
    Holstein(),
    Holstein(),
    Holstein(),
    Holstein(),
    Holstein(),
    Holstein(),

    BrownSwiss(),
    BrownSwiss(),
    BrownSwiss(),
    BrownSwiss(),
    BrownSwiss(),
    BrownSwiss(),
    BrownSwiss(),

    Aryshire(),
    Aryshire(),
    Aryshire(),
    Aryshire(),
    Aryshire(),
    Aryshire(),
    Aryshire(),

    WestHighland(3),
    WestHighland(3),
    WestHighland(3),
    WestHighland(4),
    WestHighland(4),
    WestHighland(4),
    WestHighland(5),
    WestHighland(5),
    WestHighland(5),

    TexasLonghorn(5),
    TexasLonghorn(5),
    TexasLonghorn(6),
    TexasLonghorn(6),
    TexasLonghorn(7),
    TexasLonghorn(7)
  ]);
}
