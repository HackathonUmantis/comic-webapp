import { combineReducers, Reducer } from 'redux';
import { RootState } from './state';
import { routerReducer, RouterState } from 'react-router-redux';
import {seriesReducer} from 'app/reducers/series';
import {comicsReducer} from 'app/reducers/comics';
import {pagesReducer} from 'app/reducers/pages';

export { RootState, RouterState };

export const rootReducer: Reducer<any> = combineReducers<any>({
  series: seriesReducer,
  comics: comicsReducer,
  pages: pagesReducer,
  router: routerReducer
});
