const shipFactory = require("../ship.js");

test("Ship sinks when all spots hit", () => {
  const newShip = shipFactory(3);
  newShip.hit(0);
  newShip.hit(2);
  newShip.hit(1);
  expect(newShip.isSunk()).toBe(true);
});

test("Ship doesnt sink until fully hit", () => {
  const newShip = shipFactory(3);
  expect(newShip.isSunk()).toBe(false);
  newShip.hit(0);
  expect(newShip.isSunk()).toBe(false);
  newShip.hit(2);
  expect(newShip.isSunk()).toBe(false);
  newShip.hit(1);
  expect(newShip.isSunk()).toBe(true);
});

test("hit returns true when legal move, false otherwise", () => {
  const newShip = shipFactory(3);
  expect(newShip.hit(-1)).toBe(false);
  expect(newShip.hit(0)).toBe(true);
  expect(newShip.hit(3)).toBe(false);
});
