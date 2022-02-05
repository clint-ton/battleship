const shipFactory = require("./ship.js");

const gameboard = (size) => {
  const board = Array(size);
  for (let i = 0; i < size; i++) {
    board[i] = Array(size).fill(null);
  }
  const shipList = [];
  const getBoard = () => {
    return board;
  };

  const placeShip = (len, coords, direction) => {
    const newShip = shipFactory(len);
    const shipId = shipList.length;
    shipList[shipId] = newShip;
    let h_delta = 0;
    let vert_delta = 0;

    switch (direction) {
      case "N":
        vert_delta = -1;
        break;

      case "S":
        vert_delta = 1;
        break;

      case "E":
        h_delta = 1;
        break;

      case "W":
        h_delta = -1;
        break;

      default:
        console.log("invalid direction");
        return false;
    }
    // check for overlap with otherships / overflow with board
    const max_x_index = coords[0] + len * h_delta;
    const max_y_index = coords[1] + len * vert_delta;

    if (
      max_x_index < 0 ||
      max_x_index > size ||
      max_y_index < 0 ||
      max_y_index > size
    ) {
      console.log("Ship overflows board");
      return false;
    }
    for (let i = 0; i < len; i++) {
      const x_index = coords[0] + i * h_delta;
      const y_index = coords[1] + i * vert_delta;
      if (board[y_index][x_index] != null) {
        console.log("already another ship here");
        return false;
      }
    }
    // update board
    for (let i = 0; i < len; i++) {
      const x_index = coords[0] + i * h_delta;
      const y_index = coords[1] + i * vert_delta;

      board[y_index][x_index] = [shipId, i];
    }
  };

  return { getBoard, placeShip };
};

module.exports = gameboard;
