import "regenerator-runtime/runtime.js";
import { SnapshotMakerSettings } from "./SnapshotMaker";
import { uploadPhotoAsFormData } from "./helpers";
declare const startTakingSnapshots: (settings: SnapshotMakerSettings) => void;
export { startTakingSnapshots, uploadPhotoAsFormData };
