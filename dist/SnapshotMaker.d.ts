declare enum OutputFormat {
    Blob = "blob",
    DataURL = "dataURL"
}
export interface SnapshotMakerSettings {
    width?: number;
    height?: number;
    outputFormat?: OutputFormat;
    snapInterval: number;
    onSnapshot: (blob: Blob | string) => Promise<any>;
    onError?: (error: Error) => void;
}
declare class SnapshotMaker {
    private _width;
    private _height;
    private _canvasElement;
    private _ctx;
    private _videoElement;
    private _snapInterval;
    private readonly _outputFormat;
    private readonly _onSnapshot;
    private readonly _onError;
    private _intervalId;
    constructor({ width, height, snapInterval, onSnapshot, onError, outputFormat, }: SnapshotMakerSettings);
    stop(): void;
    private init;
    private takeSnapshot;
}
export default SnapshotMaker;
