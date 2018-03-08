import {ComicModel, PageModel, SeriesModel} from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
  series: RootState.SeriesState;
  episodes: RootState.ComicsState;
  pages: RootState.PageState;
  router: RouterState
}

export namespace RootState {
  export type SeriesState = SeriesModel[];
  export type ComicsState = ComicModel[];
  export type PageState = PageModel[];
}
