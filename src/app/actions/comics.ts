import {createAction} from 'redux-actions';
import {ComicModel} from 'app/models';

export namespace ComicsActions {
  export enum Type {
    FETCH_COMICS = 'FETCH_COMICS',
    SET_SELECTED_COMICS = 'SET_SELECTED_COMICS'
  }

  export const fetchComics = createAction(ComicsActions.Type.FETCH_COMICS);
  export const setSelectedComics = createAction<ComicModel[]>(ComicsActions.Type.SET_SELECTED_COMICS);

}

export type ComicsActions = Omit<typeof ComicsActions, 'Type'>;
