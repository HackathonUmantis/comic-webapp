import {handleActions} from 'redux-actions';
import {RootState} from './state';
import {SeriesModel} from 'app/models';

const sampleComics = [
  {
    id: 1,
    cover: 'Some Cover',
    name: 'Rogue Trooper issue 1',
    author: {
      id: 1,
      name: 'Some author'
    },
    date: new Date(),
    illustrator: {
      id: 1,
      name: 'some illustrator'
    },
    publisher: {
      id: 1,
      name: 'Some Publisher'
    },
    tags: [{
      id: 1,
      name: 'Some Tag'
    }],
    pages: [{
      id: 1,
      image: 'some string',
      tiles: [{
        id: 1,
        coords: [{
          id: 1,
          x: 30,
          y: 30
        }]
      }]
    }]
  }
];

const initialState: RootState.SeriesState = [
  {
    id: 1,
    name: 'Rogue Trooper',
    cover: 'Some cover',
    comics: sampleComics
  }
];

export const seriesReducer = handleActions<RootState.SeriesState, SeriesModel>(
  {
  },
  initialState
);
