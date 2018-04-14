import * as React from 'react';
// import  {RouteComponentProps} from 'react-router';
import {Image as KonvaImage, Stage, Layer, Line} from "react-konva";
// import { ComicView } from 'app/containers';
// import {SeriesList, ComicView, ComicsList} from 'app/containers';

import * as style from './style.css';
import {TileClass, TileModel} from 'app/models/TileModel';
// import {Layout} from 'antd';

export namespace AppLayout {
  export interface Props {
    collapsed: boolean;
  }
}

export class AppLayout extends React.Component<AppLayout.Props, any> {

  tile1: Array<number> = [70, 100, 300, 100, 300, 580, 70, 580];
  tile2: Array<number> = [300, 100, 500, 100, 500, 580, 300, 580];
  tile3: Array<number> = [70, 580, 300, 580, 300, 1050, 70, 1050];

  // tile1: Array<number> = [70, 100, 600, 100, 600, 580, 70, 580];

  constructor(props: AppLayout.Props, context?: any) {
    super(props, context);
    this.state = {
      stage: null,
      layer: null,
      image: null,
      tiles: [this.tile1, this.tile2, this.tile3],
      scaleRatio: 1,
      selectedTile: null,
      selectedTileIndex: null,
      zoomedIn: false
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
      this.setState({
        image: image
      });
      this.updateStageSize();
      this.selectLayer(1);
    };
  };


  fitToViewer() {
    const {stage, image} = this.state;
    let zoomOutRatio: number = 1;
    if (image.width > stage.width()) {
      zoomOutRatio = stage.width() / image.width;
    }

    if (image.height > stage.height()) {
      zoomOutRatio = stage.height() / image.height;
    }
    this.selectLayer(zoomOutRatio)
  }

  navigateSlides(nextSlide?: boolean) {
    const {selectedTileIndex, tiles} = this.state;

    let selectedTile = selectedTileIndex != null ? selectedTileIndex : nextSlide ? -1 : tiles.length;
    if (nextSlide) {
      selectedTile++;
    } else {
      selectedTile--
    }
    if (selectedTile < 0 || selectedTile >= tiles.length) {
      this.zoomOut();
    } else {
      this.zoomToTile(selectedTile)
    }
  }

  updateStageSize() {
    let {stage, image} = this.state;
    if (!stage) {
      stage = this.refs.mainStage.getStage();
    }
    const canvasWidth = window.innerWidth > image.width ? image.width : window.innerWidth;
    const canvasHeight = window.innerHeight > image.height ? image.height : window.innerHeight;
    stage.width(canvasWidth);
    stage.height(canvasHeight - 100);
  }

  selectLayer(zoomRatio: number) {
    const {layer, image} = this.state;
    this.setState({
      selectedTile: [0, 0, layer.width(), 0, 0, image.height, layer.width(), image.height],
      selectedTileIndex: null,
      zoomedIn: false
    }, () => this.setZoomRatio(zoomRatio));
  }

  setDraggingFrame(position) {
    const {layer, selectedTile, scaleRatio} = this.state;
    const tileArea: TileModel = new TileClass(selectedTile);
    position.x = Math.ceil(position.x);
    position.y = Math.ceil(position.y);
    const minHorizontalScroll = -Math.ceil(tileArea.startingPointX * scaleRatio);
    const horizontalEndPoint = -Math.ceil(tileArea.startingPointX + tileArea.horizontalPixels) * scaleRatio;
    const maxHorizontalScroll = horizontalEndPoint + layer.width();
    if (Math.abs(horizontalEndPoint) <= layer.width() || position.x > 0) {
      position.x = minHorizontalScroll;
    } else if (Math.abs(position.x) < Math.abs(minHorizontalScroll)) {
      position.x = minHorizontalScroll
    } else if (Math.abs(maxHorizontalScroll) < Math.abs(position.x)) {
      position.x = maxHorizontalScroll;
    }
    const minVerticalScroll = -Math.ceil(tileArea.startingPointY * scaleRatio);
    const verticalEndPoint = -Math.ceil(tileArea.startingPointY + tileArea.verticalPixels) * scaleRatio;
    const maxVerticalScroll = verticalEndPoint + layer.height();

    if (position.y > 0) {

      position.y = minVerticalScroll;
    } else if (Math.abs(position.y) < Math.abs(minVerticalScroll)) {
      position.y = minVerticalScroll
    } else if (Math.abs(maxVerticalScroll) < Math.abs(position.y)) {
      position.y = maxVerticalScroll;
    }
    return position
  }

  setZoomPosition() {
    const {selectedTile, scaleRatio, layer} = this.state;
    const imgArea: TileModel = new TileClass(selectedTile);

    const freeSpace = (layer.width() - imgArea.horizontalPixels * scaleRatio) / 2;
    const horizontalOffset = (imgArea.startingPointX * scaleRatio) - freeSpace;
    return horizontalOffset < 0 ? 0 : horizontalOffset
  }

  setZoomRatio(ratio: number) {
    const {layer, selectedTile, zoomedIn} = this.state;

    this.setState({
      scaleRatio: ratio
    }, () => {
      const imgArea: TileModel = new TileClass(selectedTile);
      const positionX = zoomedIn ? this.setZoomPosition() : 1;
      const positionY = zoomedIn ? imgArea.startingPointY * ratio : 1;

      layer.to({
        x: -positionX,
        y: -positionY,
        scaleX: ratio,
        scaleY: ratio,
        duration: .2
      });
      layer.draw();
    });
  }

  private zoomOut() {
    this.selectLayer(1)
  }

  zoomToTile(index: number) {
    const {tiles} = this.state;
    this.setState({
      selectedTile: tiles[index],
      selectedTileIndex: index,
      zoomedIn: true
    }, () => {
      const {layer, selectedTile, image} = this.state;
      const imgArea: any = new TileClass(selectedTile);
      const layerRatio = layer.width() / layer.height();

      imgArea.horizontalPixels = imgArea.verticalPixels * layerRatio;
      const zoomRatio = image.width / imgArea.horizontalPixels;
      this.setZoomRatio(zoomRatio);
    });
  }

  render() {
    const {tiles} = this.state;
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
              (pos) => this.setDraggingFrame(pos)
            }
            ref={'imgLayer'}
          >
            <KonvaImage ref="img" image={this.state.image}/>
            {tiles.map((tile, index) =>
              <Line points={tile}
                    key={index}
                    onClick={() => this.zoomToTile(index)}
                    stroke={'#ff0000'}
                    strokeWidth={5}
                    closed={true}/>
            )}
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
        <button
          onClick={() => this.navigateSlides()}
        > {'<'} Previous tile
        </button>
        <button
          onClick={() => this.navigateSlides(true)}
        > Next tile >
        </button>
      </div>
    )
  }
}
