import {ComicModel} from 'app/models/ComicModel';

export interface SeriesModel {
  id: number;
  name: string;
  cover: string;
  comics: Array<ComicModel>
}
