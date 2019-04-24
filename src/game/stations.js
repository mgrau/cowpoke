export default function Stations() {
  return [
    Station(4.5, 2, 1, false, true),
    Station(7.5, 2, 1, false, true),
    Station(10.5, 4, 2, false, true),
    Station(13.5, 4, 2, false, true),
    Station(16.5, 6, 3, true, true),
    Station(21.5, 8, 5, true),
    Station(25.5, 7, 6, true),
    Station(29.5, 6, 7, true),
    Station(33.5, 5, 8, true),
    Station(39.5, 3, 9, true)
  ];
}

function Station(distance, cost, points, black = false, stationMaster = false) {
  return {
    distance: distance,
    cost: cost,
    points: points,
    black: black,
    stationMaster: stationMaster ? [] : null,
    players: []
  };
}
