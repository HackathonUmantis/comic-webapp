import * as React from 'react';
import * as style from './style.css';
import {RouteComponentProps} from 'react-router';
import { SeriesActions } from 'app/actions';
import {RootState} from 'app/reducers';
import {AppLayout} from 'app/components';


export namespace App {
  export interface Props extends RouteComponentProps<void> {
    series: RootState.SeriesState;
    actions: SeriesActions;
  }
}

export class App extends React.Component<App.Props> {
  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className={style.normal}>
        <AppLayout collapsed={true}/>
      </div>
    );
  }
}
