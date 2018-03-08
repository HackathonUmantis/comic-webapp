import * as React from 'react';

export namespace SeriesComponent {
  export interface Props {
    key: number;
    name: string;
    cover: string;
  }
}

export class SeriesComponent extends React.Component<SeriesComponent.Props> {

  constructor(props: SeriesComponent.Props, context?: any) {
    super(props, context);
  }

  render() {
    const { name } = this.props;
    console.log(this.props.name)
    return (
      <div>{name}</div>
    );
  }
}
