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
