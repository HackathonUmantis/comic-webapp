import * as React from 'react';
import './style.css';

import { RouteComponentProps } from 'react-router';
import { PageViewer } from 'app/components';


export namespace App {
  export interface Props extends RouteComponentProps<void> {
  }
}

export class App extends React.Component<App.Props> {
  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <PageViewer collapsed={true}/>
      </div>
    );
  }
}
