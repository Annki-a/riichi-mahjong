import { isHonor, sortTiles } from "./tiles";

const HAND_SIZE = 14;

export function isWinningHand(tiles){
    if(tiles.length !== HAND_SIZE) return false;
    const sorted = sortTiles(tiles);
    const counts = tilesToCounts(sorted);
    for(const tile in counts){
        if(counts[tiles] == 2){
            
        }
    }
    return canFormSets(counts);
}
function tilesToCounts(tiles) {
  const counts = {};
  for (const tile of tiles) {
    if (counts[tile] === undefined) {
      counts[tile] = 0; // first time seeing this tile, start it at 0
    }
    counts[tile] += 1; // then increment
  }
  return counts;
}
function canFormSets(counts){

}