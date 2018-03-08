import {handleActions} from 'redux-actions';
import {RootState} from './state';
import {ComicModel} from 'app/models';
import {ComicsActions} from 'app/actions';

const initialState: RootState.ComicsState = [
  {
    id: 0,
    name: '',
    cover: '',
    author: {id: 0, name: ''},
    date: new Date(),
    illustrator: {id: 0, name: ''},
    publisher: {id: 0, name: ''},
    tags: [],
    pages: []
  }
];

export const comicsReducer = handleActions<RootState.ComicsState, ComicModel[]>(
  {
    [ComicsActions.Type.SET_SELECTED_COMICS]: (state, action) => {
      if (action.payload) {
        state = action.payload;
        return state;
      } else {
        return state;
      }
    },
  },
  initialState
);
