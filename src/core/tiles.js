// Core tile logic — pure functions, no DOM/UI dependencies.
// Tile notation follows the common mahjong convention:
//   1m-9m = characters (man)
//   1p-9p = circles (pin)
//   1s-9s = bamboo (sou)
//   1z-7z = honors (1z-4z winds: E,S,W,N | 5z-7z dragons: white,green,red)

const SUITS = ["m", "p", "s"];
const HONOR_LABELS = ["East", "South", "West", "North", "White", "Green", "Red"];

/** Build one full 136-tile set (4 copies of each of 34 tile types). */
export function buildFullTileSet() {
  const tiles = [];
  for (const suit of SUITS) {
    for (let rank = 1; rank <= 9; rank++) {
      for (let copy = 0; copy < 4; copy++) {
        tiles.push(`${rank}${suit}`);
      }
    }
  }
  for (let honor = 1; honor <= 7; honor++) {
    for (let copy = 0; copy < 4; copy++) {
      tiles.push(`${honor}z`);
    }
  }
  return tiles;
}

/** Shuffle a copy of the array (Fisher-Yates). */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Draw n tiles from a wall (does not mutate the input array). */
export function drawTiles(wall, n) {
  return wall.slice(0, n);
}

/** Is this tile string an honor tile (wind/dragon)? */
export function isHonor(tile) {
  return tile.endsWith("z");
}

/** Human-readable label for a tile, e.g. "5p" -> "5 Circles", "3z" -> "West". */
export function describeTile(tile) {
  const rank = parseInt(tile.slice(0, -1), 10);
  const suit = tile.slice(-1);
  if (suit === "z") return HONOR_LABELS[rank - 1];
  const suitName = { m: "Characters", p: "Circles", s: "Bamboo" }[suit];
  return `${rank} ${suitName}`;
}

/** Sort tiles in standard display order (m, p, s, z; ascending rank). */
export function sortTiles(tiles) {
  const order = { m: 0, p: 1, s: 2, z: 3 };
  return [...tiles].sort((a, b) => {
    const suitA = a.slice(-1), suitB = b.slice(-1);
    if (order[suitA] !== order[suitB]) return order[suitA] - order[suitB];
    return parseInt(a) - parseInt(b);
  });
}
