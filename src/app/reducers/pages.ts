import {handleActions} from 'redux-actions';
import {RootState} from './state';
import {PageModel} from 'app/models';
import {PagesActions} from 'app/actions';

const initialState: RootState.PageState = [
  {
    id: 1,
    image: '',
    tiles: [{
      id: 1,
      coords: [
        {
          id: 1,
          x: 0,
          y: 20
        }
      ]
    }]
  }
];

export const pagesReducer = handleActions<RootState.PageState, PageModel[]>(
  {
    [PagesActions.Type.SET_SELECTED_PAGES]: (state, action) => {
      if (action.payload) {
        return action.payload;
      } else {
        return state;
      }
    },
  },
  initialState
);
