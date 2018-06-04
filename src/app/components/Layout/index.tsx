import * as React from 'react';
import {PageView} from 'app/containers/PageView';

export namespace Layout {
  export interface Props {
  }
}

export class Layout extends React.Component<Layout.Props, any> {


  constructor(props: Layout.Props, context?: any) {
    super(props, context);
  }


  render() {
    return (
      <PageView />
    )
  }
}
