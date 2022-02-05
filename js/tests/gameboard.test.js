const gameboard = require("../gameboard.js");

test("Makes a game board of size x size", () => {
  const newBoard = gameboard(10);
  expect(newBoard.getBoard().length).toBe(10);
  expect(newBoard.getBoard()[0].length).toBe(10);
});

test("places a ship normally", () => {
  const newBoard = gameboard(10);
  newBoard.placeShip(3, [2, 3], "E");
  expect(newBoard.getBoard()).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, [0, 0], [0, 1], [0, 2], null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("places multiple ships normally", () => {
  const newBoard = gameboard(10);
  newBoard.placeShip(3, [2, 3], "E");
  newBoard.placeShip(2, [3, 4], "W");
  expect(newBoard.getBoard()).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, [0, 0], [0, 1], [0, 2], null, null, null, null, null],
    [null, null, [1, 1], [1, 0], null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("doesnt overlap ships", () => {
  const newBoard = gameboard(10);
  newBoard.placeShip(3, [2, 3], "E");
  expect(newBoard.placeShip(4, [3, 3], "S")).toBe(false);
  expect(newBoard.getBoard()).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, [0, 0], [0, 1], [0, 2], null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("Doesnt insert ships that overflow borders", () => {
  const newBoard = gameboard(10);
  newBoard.placeShip(3, [2, 3], "E");
  expect(newBoard.placeShip(3, [0, 0], "N")).toBe(false);
  expect(newBoard.placeShip(3, [0, 0], "W")).toBe(false);
  expect(newBoard.placeShip(3, [9, 9], "E")).toBe(false);
  expect(newBoard.placeShip(3, [9, 9], "S")).toBe(false);
  expect(newBoard.getBoard()).toEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, [0, 0], [0, 1], [0, 2], null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

test("reports when all ships sunk", () => {
  const newBoard = gameboard(10);
  newBoard.placeShip(3, [2, 3], "E");
  newBoard.placeShip(2, [5, 6], "S");
  newBoard.placeShip(4, [0, 0], "S");
  expect(newBoard.allSunk()).toBe(false);
  newBoard.receiveAttack([2, 3]);
  newBoard.receiveAttack([3, 3]);
  expect(newBoard.allSunk()).toBe(false);
  newBoard.receiveAttack([4, 3]);
  newBoard.receiveAttack([5, 6]);
  newBoard.receiveAttack([5, 7]);
  expect(newBoard.allSunk()).toBe(false);
  newBoard.receiveAttack([0, 0]);
  newBoard.receiveAttack([0, 1]);
  newBoard.receiveAttack([0, 2]);
  expect(newBoard.allSunk()).toBe(false);
  newBoard.receiveAttack([0, 3]);
  expect(newBoard.allSunk()).toBe(true);
});

test("returns false on our of range attacks", () => {
  const newBoard = gameboard(10);
  expect(newBoard.receiveAttack([-1, -1])).toBe(false);
  expect(newBoard.receiveAttack([10, 10])).toBe(false);
  expect(newBoard.receiveAttack([-1, 10])).toBe(false);
  expect(newBoard.receiveAttack([10, -1])).toBe(false);
});

test("marks a missed attack as 'x' on the gaemboard", () => {
  const newBoard = gameboard(10);
  newBoard.receiveAttack([5, 5]);
  expect(newBoard.getBoard()[5][5]).toEqual("x");
});
