import React from 'react';
import './style.css';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import { AppLayout } from 'app/components';
import { SeriesActions } from 'app/actions';


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
