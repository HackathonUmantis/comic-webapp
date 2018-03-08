import * as React from 'react';

export namespace HomePage {
  export interface Props {
  }
}

export class HomePage extends React.Component<HomePage.Props> {

  constructor(props: HomePage.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div>Test home page</div>
    );
  }
}
