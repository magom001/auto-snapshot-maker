import "regenerator-runtime/runtime.js";
import SnapshotMaker, { SnapshotMakerSettings, OutputFormat } from "./SnapshotMaker";
import { uploadPhotoAsFormData } from "./helpers";
declare const startTakingSnapshots: (settings: SnapshotMakerSettings) => void;
export { startTakingSnapshots, uploadPhotoAsFormData, SnapshotMaker, OutputFormat, };
