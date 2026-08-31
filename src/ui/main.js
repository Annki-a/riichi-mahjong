import { buildFullTileSet, shuffle, drawTiles, sortTiles, isHonor } from "../core/tiles.js";

function tileGlyph(tile) {
  // Simple text glyphs for now — swap in real tile images/SVGs later.
  const rank = tile.slice(0, -1);
  const suit = tile.slice(-1);
  const suitSymbol = { m: "萬", p: "筒", s: "索", z: "" }[suit];
  const honorGlyphs = ["東", "南", "西", "北", "白", "發", "中"];
  if (suit === "z") return honorGlyphs[parseInt(rank, 10) - 1];
  return `${rank}${suitSymbol}`;
}

function renderHand(tiles) {
  const container = document.getElementById("hand");
  container.innerHTML = "";
  for (const tile of tiles) {
    const div = document.createElement("div");
    div.className = "tile" + (isHonor(tile) ? " honor" : "");
    div.textContent = tileGlyph(tile);
    div.title = tile;
    container.appendChild(div);
  }
}

const wall = shuffle(buildFullTileSet());
const startingHand = sortTiles(drawTiles(wall, 13));
renderHand(startingHand);
