const ShipFactory = (length) => {
  const hitMarkers = Array(length).fill(false);

  const isSunk = () => {
    return hitMarkers.every((v) => v === true);
  };

  const hit = (pos) => {
    if (pos < hitMarkers.length && pos > -1) {
      hitMarkers[pos] = true;
      return true;
    } else {
      return false;
    }
  };

  return { hit, isSunk };
};

module.exports = ShipFactory;
