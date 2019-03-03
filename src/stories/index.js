import React from "react";
import { storiesOf } from "@storybook/react";

import {
  Money,
  Points,
  Card,
  Worker,
  Train,
  Certificate
} from "../board/symbols";
import NeutralBuilding from "../board/neutral-building";
import Action from "../board/action";

storiesOf("Money", module)
  .add("2", () => <Money $="2" />)
  .add("4", () => <Money $="4" />)
  .add("0", () => <Money $="0" />)
  .add("-3", () => <Money $="-3" />);

storiesOf("Points", module)
  .add("2", () => <Points vp="2" />)
  .add("12", () => <Points vp="12" />)
  .add("0", () => <Points vp="0" />)
  .add("-3", () => <Points vp="-3" />);

storiesOf("Card", module)
  .add("Jersey", () => <Card cow="Jersey" />)
  .add("Guernsey", () => <Card cow="Guernsey" />)
  .add("Dutch Belt", () => <Card cow="DutchBelt" />)
  .add("Black Angus", () => <Card cow="BlackAngus" />)
  .add("Holstein", () => <Card cow="Holstein" />)
  .add("Brown Swiss", () => <Card cow="BrownSwiss" />)
  .add("Aryshire", () => <Card cow="Aryshire" />)
  .add("West Highland", () => <Card cow="WestHighland" />)
  .add("Texas Longhorn", () => <Card cow="TexasLonghorn" />);

storiesOf("Worker", module)
  .add("Worker", () => <Worker />)
  .add("Cowboy", () => <Worker type={"cowboy"} />)
  .add("Craftsman", () => <Worker type={"craftsman"} />)
  .add("Engineer", () => <Worker type={"engineer"} />);

storiesOf("Action", module)
  .add("neutralA1", () => <Action action="neutralA1" />)
  .add("neutralA2", () => <Action action="neutralA2" />)
  .add("neutralA3", () => <Action action="neutralA3" />);

storiesOf("NeutralBuilding", module).add("neutralA", () => (
  <NeutralBuilding
    name="neutralA"
    actions={["neutralA1", "neutralA2", "neutralA3"]}
  />
));

storiesOf("Train", module)
  .add("1", () => <Train spaces={1} />)
  .add("2", () => <Train spaces={2} />)
  .add("-2", () => <Train spaces={-2} />);

storiesOf("Certificate", module)
  .add("1", () => <Certificate spaces={1} />)
  .add("2", () => <Certificate spaces={2} />);
