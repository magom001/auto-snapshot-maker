export enum OutputFormat {
  Blob = "blob",
  DataURL = "dataURL",
}

export interface SnapshotMakerSettings {
  width?: number;
  height?: number;
  outputFormat?: OutputFormat;
  snapInterval: number;
  onSnapshot: (blob: Blob | string) => Promise<any>;
  onError?: (error: Error) => void;
}

class SnapshotMaker {
  private _width: number;
  private _height: number;
  private _canvasElement: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;
  private _videoElement: HTMLVideoElement | undefined;
  private _snapInterval: number;
  private readonly _outputFormat!: OutputFormat;
  private readonly _onSnapshot: SnapshotMakerSettings["onSnapshot"];
  private readonly _onError: SnapshotMakerSettings["onError"];
  private _intervalId = 0;
  private _stopped = false;
  private _stream?: MediaStream;

  constructor({
    width = 640,
    height = 480,
    snapInterval,
    onSnapshot,
    onError,
    outputFormat = OutputFormat.Blob,
  }: SnapshotMakerSettings) {
    this.takeSnapshot = this.takeSnapshot.bind(this);
    this._width = width;
    this._height = height;
    this._snapInterval = snapInterval;
    this._onSnapshot = onSnapshot;
    this._onError = onError;
    this._outputFormat = outputFormat;

    this._canvasElement = document.createElement("canvas");
    this._canvasElement.width = this._width;
    this._canvasElement.height = this._height;
    this._ctx = this._canvasElement.getContext("2d");

    this.init();
  }

  public stop() {
    this._stopped = true;
    clearInterval(this._intervalId);
    if (this._stream) {
      for (const track of this._stream.getTracks()) {
        track.stop();
      }
    }
  }

  private async init(): Promise<void> {
    const constraints: MediaStreamConstraints = {
      audio: false,
      video: {
        width: 640,
        height: 480,
        frameRate: 24,
      },
    };

    try {
      this._stream = await window.navigator.mediaDevices.getUserMedia(
        constraints
      );

      this._videoElement = document.createElement("video");
      this._videoElement.srcObject = this._stream;

      this._videoElement.onloadedmetadata = () => {
        this._videoElement?.play();

        if (this._stopped) {
          return;
        }

        // Start taking snapshots every `snapInterval` ms
        this._intervalId = setInterval(
          this.takeSnapshot,
          this._snapInterval || 10000
        );
      };

      this._videoElement.onplaying = () => {
        setTimeout(this.takeSnapshot, 500);
      };
    } catch (error) {
      this.stop();
      if (this._onError) {
        this._onError(error);
      }
    }
  }

  private takeSnapshot() {
    this._videoElement &&
      this._canvasElement &&
      this._ctx?.drawImage(
        this._videoElement,
        0,
        0,
        this._canvasElement?.width,
        this._canvasElement?.height
      );

    if (this._outputFormat === OutputFormat.DataURL) {
      const data = this._canvasElement.toDataURL("image/jpeg", 0.5);
      this._onSnapshot(data);
    } else {
      this._canvasElement.toBlob((blob) => {
        if (blob) {
          this._onSnapshot(blob);
        } else {
          console.error("Image data not available");
        }
      });
    }
  }
}

export default SnapshotMaker;
