import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {RootState} from 'app/reducers';
import {connect, Dispatch} from 'react-redux';
import { RouterState } from 'react-router-redux';
import {ComicModel} from 'app/models';
import {ComicsComponent} from 'app/components';
import {PagesActions} from 'app/actions';
import {bindActionCreators} from 'redux';
import {omit} from 'app/utils';


export namespace ComicsList {
  export interface Props extends RouteComponentProps<void> {
    router: RouterState;
    pagesActions: PagesActions;
    series: RootState.SeriesState;
    comics: RootState.ComicsState;
  }
  export interface State {
    uuid: number;
  }
}

@connect(
  (state: RootState): Pick<ComicsList.Props, 'comics' | 'series' | 'router' > => {
    return {
      router: state.router,
      series: state.series,
      comics: state.comics,
    };
  },
  (dispatch: Dispatch<RootState>): Pick<ComicsList.Props, 'pagesActions'> => ({
    pagesActions: bindActionCreators(omit(PagesActions, 'Type'), dispatch)
  })
)


export class ComicsList extends React.Component<ComicsList.Props, ComicsList.State> {
  static defaultProps: Partial<ComicsList.Props> = {};

  constructor(props: ComicsList.Props, context?: any) {
    super(props, context);
    const comicId = this.props.router.location ? this.props.router.location.state.uuid : '';
    this.state = {
      uuid: comicId
    };
  }

  render() {
    const {comics, router, pagesActions} = this.props;
    const currentPath = router.location ? router.location.pathname : '';
    return (
      comics.map((comic: ComicModel) => (
        <ComicsComponent
          name={comic.name}
          cover={comic.cover}
          key={comic.id}
          id={comic.id}
          path={currentPath}
          setSelectedComic = {pagesActions.setSelectedComic}
          pages = {comic.pages}
        />
      ))
    )
  }
}
