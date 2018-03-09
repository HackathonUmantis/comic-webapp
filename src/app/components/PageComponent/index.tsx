import * as React from 'react';
import {PageModel} from 'app/models';

export namespace PageComponent {
  export interface Props {
    page: PageModel;
  }
}

export class PageComponent extends React.Component<PageComponent.Props> {

  constructor(props: PageComponent.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { page } = this.props;
    return (
      <div>{page.image}</div>
    );
  }
}
