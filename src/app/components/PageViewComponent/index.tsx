import * as React from 'react';
import * as style from "./style.css";
import {Image as KonvaImage, Line, Stage, Layer} from "react-konva";
import {TileClass, TileModel} from 'app/models/TileModel';
import {PositionOnLayer} from 'app/models/konva.models';

export namespace PageViewComponent {
  export interface Props {}
  export interface State {
    stage: any,
    layer: any,
    image: any,
    tiles: any,
    scaleRatio: any,
    containRatio: any,
    selectedTile: any,
    selectedTileClass: any,
    selectedTileIndex: any,
    zoomedIn: any
  }
}

export class PageViewComponent extends React.Component<PageViewComponent.Props, PageViewComponent.State> {


  tile1: Array<number> = [70, 100, 300, 100, 300, 580, 70, 580];
  tile2: Array<number> = [300, 100, 500, 100, 500, 580, 300, 580];
  tile3: Array<number> = [500, 100, 700, 100, 700, 580, 500, 580];
  tile4: Array<number> = [70, 580, 300, 580, 300, 1050, 70, 1050];

  constructor(props: PageViewComponent.Props, context?: any) {
    super(props, context);

    this.state = {
      stage: null,
      layer: null,
      image: null,
      tiles: [this.tile1, this.tile2, this.tile3, this.tile4],
      scaleRatio: 1,
      containRatio: null,
      selectedTile: null,
      selectedTileClass: null,
      selectedTileIndex: null,
      zoomedIn: false
    };

    this.updateStageSize = this.updateStageSize.bind(this);
    this.scrollToZoom = this.scrollToZoom.bind(this);
  }

  componentDidMount() {

    const stageRef: any =  this.refs['mainStage'];
    this.setState({
        stage: stageRef.getStage(),
        layer: this.refs.imgLayer,
      }
    );
    window.addEventListener('resize', this.updateStageSize);
    window.addEventListener('wheel', this.scrollToZoom);
    const image = new Image();
    image.src = "assets/pages/Page1.jpg";
    image.onload = () => {
      this.setState({
        image: image
      });
      this.updateStageSize();
      this.fitToViewer();
      this.selectLayer(1);
    };
  };

  fitToViewer() {
    const {stage, image, containRatio} = this.state;

    let zoomOutRatio: number = 1;

    if (image.width > stage.width()) {
      zoomOutRatio = stage.width() / image.width;
    }

    if (image.height > stage.height()) {
      zoomOutRatio = stage.height() / image.height;
    }
    if (!containRatio || containRatio != zoomOutRatio) {
      this.setState({
        zoomedIn: false,
        containRatio: zoomOutRatio
      }, () => {
        this.selectLayer(zoomOutRatio)
      });
    }
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
    const stageRef: any = this.refs['mainStage'];
    if (!stage) {
      stage = stageRef.getStage();
    }
    const canvasWidth = window.innerWidth > image.width ? image.width : window.innerWidth;
    const canvasHeight = window.innerHeight > image.height ? image.height : window.innerHeight;
    stage.width(canvasWidth);
    stage.height(canvasHeight - 100);
  }

  scrollToZoom(e: MouseWheelEvent) {

    const {stage, containRatio} = this.state;

    e.preventDefault();
    let scaleBy = 1.03;
    let oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };


    const newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale < containRatio || newScale > 4) {
      return;
    } else {

      this.setState({
        scaleRatio: newScale
      }, () => {

        stage.scale({x: newScale, y: newScale});

        let newPos = {
          x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
          y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        };
        newPos.x = newPos.x > 0 ? 0 : newPos.x;
        newPos.y = newPos.y > 0 ? 0 : newPos.y;
        console.log(newScale)
        stage.position(newPos);
        stage.batchDraw();
      })
    }
  }

  selectLayer(zoomRatio: number) {
    const {layer, image} = this.state;
    const newSelectedTile = [0, 0, layer.width(), 0, 0, image.height, layer.width(), image.height]
    this.setState({
      selectedTile: newSelectedTile,
      selectedTileClass: new TileClass(newSelectedTile),
      selectedTileIndex: null,
      zoomedIn: false
    }, () => this.setZoomRatio(zoomRatio));
  }

  setDraggingFrame(position: PositionOnLayer) {
    const {stage, selectedTile, scaleRatio} = this.state;
    const tileArea: TileModel = new TileClass(selectedTile);
    position.x = Math.ceil(position.x);
    position.y = Math.ceil(position.y);

    const tileSmallerInX: boolean = (tileArea.horizontalPixels * scaleRatio) < stage.width();
    const tileSmallerInY: boolean = (tileArea.verticalPixels * scaleRatio) < stage.height();
    const minHorizontalScroll = tileSmallerInX ? - this.setZoomPosition() : -Math.ceil(tileArea.startingPointX * scaleRatio);
    const horizontalEndPoint = -Math.ceil(tileArea.startingPointX + tileArea.horizontalPixels) * scaleRatio;
    const maxHorizontalScroll = horizontalEndPoint + stage.width();

    if (Math.abs(horizontalEndPoint) <= stage.width() || position.x > 0 || tileSmallerInX) {
      position.x = minHorizontalScroll;
    } else if (Math.abs(position.x) < Math.abs(minHorizontalScroll)) {
      position.x = minHorizontalScroll
    } else if (Math.abs(maxHorizontalScroll) < Math.abs(position.x)) {
      position.x = maxHorizontalScroll;
    }

    const minVerticalScroll = tileSmallerInY ? - this.setZoomPosition(true) : -Math.ceil(tileArea.startingPointY * scaleRatio);
    const verticalEndPoint = -Math.ceil(tileArea.startingPointY + tileArea.verticalPixels) * scaleRatio;
    const maxVerticalScroll = verticalEndPoint + stage.height();

    if (position.y > 0 || tileSmallerInY) {
      position.y = minVerticalScroll;
    } else if (Math.abs(position.y) < Math.abs(minVerticalScroll)) {
      position.y = minVerticalScroll
    } else if (Math.abs(maxVerticalScroll) < Math.abs(position.y)) {
      position.y = maxVerticalScroll;
    }

    return position
  }

  setZoomPosition(vertical?: boolean) {
    const {selectedTile, scaleRatio, stage} = this.state;
    const imgArea: TileModel = new TileClass(selectedTile);

    const tileSize = vertical ? imgArea.verticalPixels * scaleRatio : imgArea.horizontalPixels * scaleRatio;
    const layerSize = vertical ? stage.height() : stage.width();
    const startingPosition = vertical ? imgArea.startingPointY : imgArea.startingPointX;

    const freeSpace = (layerSize - tileSize) / 2;
    const offset = (startingPosition * scaleRatio) - freeSpace;
    return offset < 0 ? 0 : offset
  }

  setZoomRatio(ratio: number) {
    const {stage, zoomedIn} = this.state;

    this.setState({
      scaleRatio: ratio
    }, () => {
      const positionX = zoomedIn ? this.setZoomPosition() : 1;
      const positionY = zoomedIn ? this.setZoomPosition(true) : 1;

      stage.to({
        x: -positionX,
        y: -positionY,
        scaleX: ratio,
        scaleY: ratio,
        duration: .2
      });
      stage.draw();
    });
  }

  private zoomOut() {
    this.selectLayer(1)
  }

  zoomToTile(index: number) {
    const {tiles} = this.state;
    this.setState({
      selectedTile: tiles[index],
      selectedTileClass: new TileClass(tiles[index]),
      selectedTileIndex: index,
      zoomedIn: true
    }, () => {
      const {stage, selectedTile, image} = this.state;
      const imgArea: any = new TileClass(selectedTile);
      const layerRatio = stage.width() / stage.height();

      imgArea.horizontalPixels = imgArea.verticalPixels * layerRatio;
      const zoomRatio = image.width / imgArea.horizontalPixels;
      this.setZoomRatio(zoomRatio > 2 ? 2 : zoomRatio);
    });
  }

  render() {
    const {tiles, zoomedIn, image} = this.state;

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
            <KonvaImage ref="img" image={image}/>
            {tiles.map((tile: Array<number>, index: number) =>
              <Line points={tile}
                    key={index}
                    onClick={() => !zoomedIn ? this.zoomToTile(index) : null}
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
    );
  }
}
