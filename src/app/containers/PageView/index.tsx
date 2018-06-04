import * as React from 'react';
import {PageViewComponent} from 'app/components';

export namespace PageView {
  export interface Props {
  }
}

export class PageView extends React.Component<PageView.Props, any> {

  // tile1: Array<number> = [70, 100, 600, 100, 600, 580, 70, 580];

  constructor(props: PageView.Props, context?: any) {
    super(props, context);

  }

  render() {
    return (
      <PageViewComponent />
    )
  }
}
