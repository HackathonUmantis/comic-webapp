import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {PageModel} from 'app/models';
import {PageComponent} from 'app/components';
import {RootState} from 'app/reducers';
import {connect} from 'react-redux';
import * as style from './style.css';

export namespace ComicView {
  export interface Props extends RouteComponentProps<void> {
    pages: PageModel[];
  }

  export interface State {
    selectedPageId: number;
    selectedPageIndex: number;
  }
}

@connect(
  (state: RootState): Pick<ComicView.Props, 'pages'> => {
    return {
      pages: state.pages,
    };
  },
)

export class ComicView extends React.Component<ComicView.Props, ComicView.State> {
  static defaultProps: Partial<ComicView.Props> = {};

  constructor(props: ComicView.Props, context?: any) {
    super(props, context);
    console.log(this.props.pages)
    this.state = {
      selectedPageId: this.props.pages[0].id,
      selectedPageIndex: 0
    }
  }

  changePage(previousPage?: boolean) {
    const newSelectedPageIndex = previousPage ? this.state.selectedPageIndex - 1
      : this.state.selectedPageIndex + 1;
    console.log(newSelectedPageIndex)
    const newSelectedPageId = this.props.pages[newSelectedPageIndex].id;
    this.setState({
      selectedPageIndex: newSelectedPageIndex,
      selectedPageId: newSelectedPageId
    })
  }

  render() {
    const {pages} = this.props;
    return (
      <div>
        <div
          className={this.state.selectedPageId === this.props.pages[0].id ? style.disabled : ''}
          onClick={() => this.changePage(true)}
        > {'<<<'} Previous
        </div>
        <PageComponent
          page={pages[this.state.selectedPageIndex]}
        />
        <div
          className={this.state.selectedPageIndex + 1 === this.props.pages.length ? style.disabled : ''}
          onClick={() => this.changePage()}
        >Next >>>
        </div>
      </div>
    )
  }
}
