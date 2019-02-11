export default class Card {
  constructor(name, value, points) {
    this.name = name;
    this.value = value;
    this.points = points;
  }
}

export class Jersey extends Card {
  constructor() {
    this.name = "Jersey";
    this.value = 1;
    this.points = 0;
  }
}

export class Guernsey extends Card {
  constructor() {
    this.name = "Guernsey";
    this.value = 2;
    this.points = 0;
  }
}

export class DutchBelt extends Card {
  constructor() {
    this.name = "Dutch Belt";
    this.value = 2;
    this.points = 0;
  }
}

export class BlackAngus extends Card {
  constructor() {
    this.name = "Black Angus";
    this.value = 2;
    this.points = 0;
  }
}

export class Holstein extends Card {
  constructor() {
    this.name = "Holstein";
    this.value = 3;
    this.points = 1;
  }
}

export class BrownSwiss extends Card {
  constructor() {
    this.name = "Brown Swiss";
    this.value = 3;
    this.points = 2;
  }
}

export class Aryshire extends Card {
  constructor() {
    this.name = "Aryshire";
    this.value = 3;
    this.points = 3;
  }
}

export class WestHighland extends Card {
  constructor(points) {
    this.name = "West Highland";
    this.value = 4;
    this.points = points;
  }
}

export class TexasLonghorn extends Card {
  constructor(points) {
    this.name = "Texas Longhorn";
    this.value = 5;
    this.points = points;
  }
}
