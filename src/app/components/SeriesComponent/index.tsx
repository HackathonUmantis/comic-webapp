import * as React from 'react';
import {Link} from 'react-router-dom'
import {ComicModel} from 'app/models';
import {ComicsActions} from 'app/actions'

export namespace SeriesComponent {
  export interface Props {
    setSelectedSeries: typeof ComicsActions.setSelectedComics;
    id: number;
    key: number;
    name: string;
    cover: string;
    comics: ComicModel[];
  }
}

export class SeriesComponent extends React.Component<SeriesComponent.Props> {

  constructor(props: SeriesComponent.Props, context?: any) {
    super(props, context);
    // this.setSelectedComic = this.setSelectedComic.bind(this);

  }

  getSlug(name: string) {
    name = name.replace(' ', '-').toLowerCase();
    return name;
  }

  setSelectedSeries(comics: Array<ComicModel>) {
    this.props.setSelectedSeries(comics);
  }

  render() {
    const {name, id, comics} = this.props;
    return (
      <Link
        onClick={() => this.setSelectedSeries(comics)}
        to={{
          pathname: this.getSlug(name),
          state: {uuid: id}
        }}>
        <div>{name}</div>
      </Link>
    );
  }
}
