import * as React from 'react';
// import  {RouteComponentProps} from 'react-router';
import {Image as KonvaImage, Stage, Layer, Line} from "react-konva";
// import { ComicView } from 'app/containers';
// import {SeriesList, ComicView, ComicsList} from 'app/containers';

import './style.css';
// import {Layout} from 'antd';

export namespace AppLayout {
  export interface Props {
    collapsed: boolean;
  }
}

export class AppLayout extends React.Component<AppLayout.Props, any> {

  constructor(props: AppLayout.Props, context?: any) {
    super(props, context);
    this.state = {
      stage: null,
      layer: null,
      image: null,
      tilePoints: [70, 100, 300, 100, 300, 580, 70, 580],
      tileObject: null
    }
  }

  componentDidMount() {
    this.setState({
        stage: this.refs.mainStage.getStage(),
        layer: this.refs.imgLayer,
        tileObject: this.refs.firstTile
      }
    );
    this.updateStageSize = this.updateStageSize.bind(this);
    this.updateStageSize();
    window.addEventListener('resize', this.updateStageSize);
    const image = new Image();
    image.src = "assets/pages/Page1.jpg";
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  };

  handleClick() {
    const {layer, tileObject, tilePoints} = this.state;
    console.log(layer)
    console.log(tileObject)
    console.log(tilePoints)
    const imgArea: any = this.calculateArea(tilePoints);
    const xRatio = layer.canvas.width / imgArea.horizontalPixels
    const yRatio = layer.canvas.height / imgArea.verticalPixels
    layer.to({
      x:-(imgArea.startingPoint[0] * xRatio),
      y:-(imgArea.startingPoint[1] * yRatio),
      scaleX: xRatio,
      scaleY: yRatio,
      duration: .2
    });
    layer.draw();
  }

  private updateStageSize() {
    let {stage} = this.state;
    if (!stage) {
      stage = this.refs.mainStage.getStage();
    }
    stage.width(window.innerWidth);
    stage.height(window.innerHeight - 100);
  }

  private calculateArea(tilePoints: Array<number>) {
    let xMin: number = tilePoints[0], xMax: number = 0, yMin: number = tilePoints[1], yMax: number = 0;
    tilePoints.map((point, index) => {
      if (index % 2 === 0) { //horizontal points
        xMin = point <= xMin ? point : xMin;
        xMax = point >= xMax ? point : xMax;
      } else { //vertical points
        yMin = point <= yMin ? point : yMin;
        yMax = point >= yMax ? point : yMax;
      }
    });
    return {
      startingPoint: [xMin, yMin],
      horizontalPixels: (xMax - xMin),
      verticalPixels: (yMax - yMin),
      area: (xMax - xMin) * (yMax - yMin)
    };
  }

  private zoomOut() {
    const {layer} = this.state;
    layer.to({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: .2
    })
  }

  render() {
    const {tilePoints} = this.state;
    return (
      <div>
        <Stage
          ref={'mainStage'}>
          <Layer
            draggable={true}
            ref={'imgLayer'}
          >
            <KonvaImage ref="img" image={this.state.image}/>
            <Line points={tilePoints}
                  onClick={() => this.handleClick()}
                  ref={'firstTile'}
                  stroke={'#000000'}
                  strokeWidth={5}
                  closed={true}/>
          </Layer>
        </Stage>
        <button
          onClick={() => this.zoomOut()}
        >Zoom out
        </button>
      </div>
    )
  }
}
