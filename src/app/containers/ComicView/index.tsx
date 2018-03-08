import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {PageModel} from 'app/models';
import {PageComponent} from 'app/components';
import {RootState} from 'app/reducers';
import {connect} from 'react-redux';

export namespace ComicView {
  export interface Props extends RouteComponentProps<void> {
    pages: PageModel[];
  }
}

@connect(
  (state: RootState): Pick<ComicView.Props, 'pages'> => {
    return {
      pages: state.pages,
    };
  },
)

export class ComicView extends React.Component<ComicView.Props> {
  static defaultProps: Partial<ComicView.Props> = {};

  constructor(props: ComicView.Props, context?: any) {
    super(props, context);
  }

  render() {
    const {pages} = this.props;
    console.log(pages);
    return (
        <PageComponent
          page = {pages[0]}
        />
    )
  }
}
