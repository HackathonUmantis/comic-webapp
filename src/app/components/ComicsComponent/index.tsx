import * as React from 'react';
import {Link} from 'react-router-dom'
import {PagesActions} from 'app/actions';
import {PageModel} from 'app/models';

export namespace ComicsComponent {
  export interface Props {
    setSelectedComic: typeof PagesActions.setSelectedComic;
    path: string;
    id: number;
    key: number;
    name: string;
    cover: string;
    pages: PageModel[];
  }
}

export class ComicsComponent extends React.Component<ComicsComponent.Props> {

  constructor(props: ComicsComponent.Props, context?: any) {
    super(props, context);
  }

  getSlug(name: string) {
    return name.replace(' ', '-').toLowerCase();
  }

  render() {
    const { name, id , path, pages} = this.props;
    return (
      <Link
        onClick={() => this.props.setSelectedComic(pages)}
        to={{
        pathname: path + '/' + this.getSlug(name) + '/' + pages[0]['id'],
        state: { uuid: id }
      }}>
        <div>{name}</div>
      </Link>
    );
  }
}
