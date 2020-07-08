import "regenerator-runtime/runtime.js";
import SnapshotMaker, { SnapshotMakerSettings } from "./SnapshotMaker";
import { uploadPhotoAsFormData } from "./helpers";

const startTakingSnapshots = (settings: SnapshotMakerSettings) => {
  new SnapshotMaker(settings);
};

export { startTakingSnapshots, uploadPhotoAsFormData };
