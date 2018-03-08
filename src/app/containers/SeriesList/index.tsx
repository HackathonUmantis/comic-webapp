import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {SeriesActions} from 'app/actions';
import {RootState} from 'app/reducers';
import {connect} from 'react-redux';
import {SeriesModel} from 'app/models';
import {SeriesComponent} from 'app/components';


export namespace SeriesList {
  export interface Props extends RouteComponentProps<void> {
    series: RootState.SeriesState;
    actions: SeriesActions;
  }
}

@connect(
  (state: RootState): Pick<SeriesList.Props, 'series'> => {
    return {series: state.series};
  },
)


export class SeriesList extends React.Component<SeriesList.Props> {
  static defaultProps: Partial<SeriesList.Props> = {};

  constructor(props: SeriesList.Props, context?: any) {
    super(props, context);
  }

  render() {
    const {series} = this.props;
    return (
      series.map((series: SeriesModel) => (
        <SeriesComponent
          name={series.name}
          cover={series.cover}
          key={series.id}
        />
      ))
    )
  }
}
