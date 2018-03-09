import {createAction} from 'redux-actions';
import {PageModel} from 'app/models';

export namespace PagesActions {
  export enum Type {
    FETCH_PAGES = 'FETCH_PAGES',
    SET_SELECTED_PAGES = 'SET_SELECTED_PAGES'
  }

  export const fetchComics = createAction(PagesActions.Type.FETCH_PAGES);
  export const setSelectedComic = createAction<PageModel[]>(PagesActions.Type.SET_SELECTED_PAGES);

}

export type PagesActions = Omit<typeof PagesActions, 'Type'>;
