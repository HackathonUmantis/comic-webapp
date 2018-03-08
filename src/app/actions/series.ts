import {createAction} from 'redux-actions';

export namespace SeriesActions {
  export enum Type {
    FETCH_SERIES = 'FETCH_SERIES'
  }
}

export const fetchSeries = createAction(Type.FETCH_SERIES);


export type SeriesActions = Omit<typeof SeriesActions, 'Type'>;
