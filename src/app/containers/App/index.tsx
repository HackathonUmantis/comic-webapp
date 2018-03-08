import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { omit } from 'app/utils';
import { AppLayout } from 'app/components';


export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: RootState.TodoState;
    actions: TodoActions;
    filter: TodoModel.Filter;
  }
}

@connect(

  (dispatch: Dispatch<RootState>): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    filter: TodoModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleClearCompleted(): void {
    const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      this.props.actions.clearCompleted();
    }
  }

  handleFilterChange(filter: TodoModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {

    return (
      <div className={style.normal}>
        <AppLayout collapsed={true}/>
      </div>
    );
  }
}
