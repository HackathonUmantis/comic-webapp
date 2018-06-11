import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {ComicsActions, SeriesActions} from 'app/actions';
import {RootState} from 'app/reducers';
import {connect, Dispatch} from 'react-redux';
import {SeriesModel} from 'app/models';
import {SeriesComponent} from 'app/components';
import {omit} from 'app/utils';
import {bindActionCreators} from 'redux';
import * as fetch from 'isomorphic-fetch';


export namespace SeriesList {
  export interface Props extends RouteComponentProps<void> {
    series: RootState.SeriesState;
    seriesActions: SeriesActions;
    comicsActions: ComicsActions;
  }
}

@connect(
  (state: RootState): Pick<SeriesList.Props, 'series'> => {
    return {series: state.series};
  },
  (dispatch: Dispatch<any>): Pick<SeriesList.Props, 'comicsActions' | 'seriesActions'> => ({
    seriesActions: bindActionCreators(omit(SeriesActions, 'Type'), dispatch),
    comicsActions: bindActionCreators(omit(ComicsActions, 'Type'), dispatch)
  })
)


export class SeriesList extends React.Component<SeriesList.Props> {
  static defaultProps: Partial<SeriesList.Props> = {};

  constructor(props: SeriesList.Props, context?: any) {
    super(props, context);
  }

  componentWillMount() {
    fetch('testurl')
      .then((r) => r.json())
      .then((series) => {
        this.setState({
          series
        })
      })
  }

  render() {
    const {series, comicsActions} = this.props;
    return (
      series.map((series: SeriesModel) => (
        <SeriesComponent
          name={series.name}
          cover={series.cover}
          id={series.id}
          key={series.id}
          comics={series.comics}
          setSelectedSeries={comicsActions.setSelectedComics}
        />
      ))
    )
  }
}
