import "regenerator-runtime/runtime.js";
import SnapshotMaker, {
  SnapshotMakerSettings,
  OutputFormat,
} from "./SnapshotMaker";

export { uploadPhotoAsFormData } from "./helpers";

const getSnapshotMaker = (settings: SnapshotMakerSettings): SnapshotMaker => {
  return new SnapshotMaker(settings);
};

export { getSnapshotMaker, SnapshotMaker, OutputFormat };
