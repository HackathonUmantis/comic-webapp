export interface TileModel {
  startingPointX: number;
  startingPointY: number;
  horizontalPixels: number;
  verticalPixels: number;
}

export class TileClass implements TileModel {
  startingPointX: number;
  startingPointY: number;
  horizontalPixels: number;
  verticalPixels: number;

  constructor(points: Array<number>) {
    let xMin: number = points[0], xMax: number = 0, yMin: number = points[1], yMax: number = 0;
    points.map((point, index) => {
      if (index % 2 === 0) { //horizontal points
        xMin = point <= xMin ? point : xMin;
        xMax = point >= xMax ? point : xMax;
      } else { //vertical points
        yMin = point <= yMin ? point : yMin;
        yMax = point >= yMax ? point : yMax;
      }
    });
    this.startingPointX = xMin;
    this.startingPointY = yMin;
    this.horizontalPixels = (xMax - xMin);
    this.verticalPixels = (yMax - yMin);
  }
}
