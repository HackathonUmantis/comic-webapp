import * as React from 'react';
import * as style from "./style.css";
import {Image as KonvaImage, Stage, Layer, Line} from "react-konva";

export namespace PageViewComponent {
  export interface Props {
    // page: PageModel;
    tiles: Array<number[]>;
    setDraggingFrame: any;
    zoomedIn: any;
    zoomToTile: any;
    zoomOut: any;
    fitToViewer: any;
    navigateSlides: any;
  }
}

export class PageViewComponent extends React.Component<PageViewComponent.Props> {

  constructor(props: PageViewComponent.Props, context?: any) {
    super(props, context);
  }

  render() {
    const {
      tiles,
      setDraggingFrame,
      zoomedIn,
      zoomToTile,
      zoomOut,
      fitToViewer,
      navigateSlides,
    } = this.props;
    return (
      <div
        className={style.viewHolder}
      >
        <Stage
          className={style.viewHolder__stage}
          ref={'mainStage'}>
          <Layer
            draggable={true}
            dragBoundFunc={
              (pos) => setDraggingFrame(pos)
            }
            ref={'imgLayer'}
          >
            <KonvaImage ref="img" image={this.state.image}/>
            {tiles.map((tile: Array<number>, index: number) =>
              <Line points={tile}
                    key={index}
                    onClick={() => !zoomedIn ? zoomToTile(index) : null}
                    stroke={'#ff0000'}
                    strokeWidth={5}
                    closed={true}/>
            )}
          </Layer>
        </Stage>
        <button
          onClick={() => zoomOut()}
        >Original Size
        </button>
        <button
          onClick={() => fitToViewer()}
        >Fit image to viewer
        </button>
        <button
          onClick={() => navigateSlides()}
        > {'<'} Previous tile
        </button>
        <button
          onClick={() => navigateSlides(true)}
        > Next tile >
        </button>
      </div>
    );
  }
}
