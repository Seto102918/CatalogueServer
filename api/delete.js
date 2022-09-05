import { getStorage } from "firebase-admin/storage";
import { firebase_foto } from "./service.js";

const deleteFile = async(fileLocation) => {
  const bucket = getStorage(firebase_foto).bucket();
  await bucket.file(fileLocation).delete();
}

export default deleteFile;
