function discard_cow(cow) {
  return function discard_cow(G, ctx) {};
}

function hire(cost = 0) {
  return function hire(G, ctx, worker) {};
}

function build(cost = 2) {
  return function build(G, ctx, building, location) {};
}

function get_certificate(G, ctx) {}

function get_objective(G, ctx, objective) {}

function drive_engine(G, ctx, destination) {}

function move_engine(spaces, cost) {
  return function move_engine(G, ctx, destination) {};
}

function trade(G, ctx, teepee) {}

function buy_cattle(G, ctx) {}

function discard_pair(value) {
  return function discard_pair(G, ctx) {};
}

function remove_hazard(cost) {
  return function remove_hazard(G, ctx, hazard) {};
}

function double_auxiliary(G, ctx) {}
