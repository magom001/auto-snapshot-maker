import "regenerator-runtime/runtime.js";
import SnapshotMaker, { SnapshotMakerSettings, OutputFormat } from "./SnapshotMaker";
export { uploadPhotoAsFormData } from "./helpers";
declare const getSnapshotMaker: (settings: SnapshotMakerSettings) => SnapshotMaker;
export { getSnapshotMaker, SnapshotMaker, OutputFormat };
