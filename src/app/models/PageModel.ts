
export interface PageModel {
  id: number;
  image: string;
  // image: File;
  tiles: Array<Tile>
}
export interface Tile {
  id: number;
  coords: Array<Coords>
}
export interface Coords {
  id: number;
  x: number;
  y: number
}

