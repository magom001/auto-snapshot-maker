export interface SnapshotMakerSettings {
  width?: number;
  height?: number;
  snapInterval: number;
  onSnapshot: (blob: Blob) => Promise<any>;
}

class SnapshotMaker {
  private _width: number;
  private _height: number;
  private _canvasElement: HTMLCanvasElement;
  private _videoElement: HTMLVideoElement | undefined;
  private _snapInterval: number;
  private _onSnapshot: (blob: Blob) => Promise<any>;

  constructor({
    width = 640,
    height = 480,
    snapInterval,
    onSnapshot,
  }: SnapshotMakerSettings) {
    this.startTakingShots = this.startTakingShots.bind(this);
    this._width = width;
    this._height = height;
    this._snapInterval = snapInterval;
    this._onSnapshot = onSnapshot;

    this._canvasElement = document.createElement("canvas");
    this._canvasElement.width = this._width;
    this._canvasElement.height = this._height;

    this.init();
  }

  private async init(): Promise<void> {
    const constraints: MediaStreamConstraints = {
      audio: false,
      video: {
        width: 640,
        height: 480,
      },
    };
    const mediaStream = await window.navigator.mediaDevices.getUserMedia(
      constraints
    );
    this._videoElement = document.createElement("video");
    this._videoElement.srcObject = mediaStream;

    this._videoElement.onloadedmetadata = () => {
      this._videoElement?.play();

      // Take a snapshot immediately
      setTimeout(this.startTakingShots, 500);

      // Start taking snapshots every `snapInterval` ms
      setInterval(this.startTakingShots, this._snapInterval || 10000);
    };
  }

  private startTakingShots() {
    const ctx = this._canvasElement?.getContext("2d");

    this._videoElement &&
      this._canvasElement &&
      ctx?.drawImage(
        this._videoElement,
        0,
        0,
        this._canvasElement?.width,
        this._canvasElement?.height
      );

    this._canvasElement.toBlob((blob) => {
      if (blob) {
        this._onSnapshot(blob);
      } else {
        console.error("Image data not available");
      }
    });
  }
}

export default SnapshotMaker;
