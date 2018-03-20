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
    };
    this.updateStageSize = this.updateStageSize.bind(this);
  }

  componentDidMount() {
    this.setState({
        stage: this.refs.mainStage.getStage(),
        layer: this.refs.imgLayer,
      }
    );
    window.addEventListener('resize', this.updateStageSize);
    const image = new Image();
    image.src = "assets/pages/Page1.jpg";
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
      this.updateStageSize();
    };
  };

  handleClick() {
    const {layer, tilePoints, image} = this.state;
    const imgArea: any = this.calculateArea(tilePoints);
    const xRatio = image.width / imgArea.horizontalPixels;
    const yRatio = image.height / imgArea.verticalPixels;

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
    let {stage, image} = this.state;
    if (!stage) {
      stage = this.refs.mainStage.getStage();
    }
    const canvasWidth = window.innerWidth > image.width ? image.width : window.innerWidth;
    const canvasHeight = window.innerHeight > image.height ? image.height : window.innerHeight;
    stage.width(canvasWidth);
    stage.height(canvasHeight - 100);
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

  fitToViewer() {
    const {stage, image, layer} = this.state;
    if (image.width > stage.width()) {
      console.log('wider')
    }

    if (image.height > stage.height()) {
      const zoomOutRatio = stage.height() / image.height;
      layer.to({
        x: 0,
        y: 0,
        scaleX: zoomOutRatio,
        scaleY: zoomOutRatio,
        duration: .2
      });
    }

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
                  stroke={'#000000'}
                  strokeWidth={5}
                  closed={true}/>
          </Layer>
        </Stage>
        <button
          onClick={() => this.zoomOut()}
        >Original Size
        </button>
        <button
          onClick={() => this.fitToViewer()}
        >Fit image to viewer
        </button>
      </div>
    )
  }
}
