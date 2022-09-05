import { getStorage } from "firebase-admin/storage";
import { firebase_foto } from "./service.js";

const deleteFile = async(fileLocation) => {
	try{  
		const bucket = getStorage(firebase_foto).bucket();
		await bucket.file(fileLocation).delete();
	}catch(e){
		console.log(e);
		throw e;
	}
}

export default deleteFile;
