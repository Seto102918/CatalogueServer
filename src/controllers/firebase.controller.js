import sharp from "sharp";
import { firebase_foto } from "./service.js";
import { getStorage } from 'firebase-admin/storage';
import { logger } from "../logger.js";

export default class FirebaseOperations {
    static async uploadFile(fileObject, kodeFoto, indexFoto, res){
        try{
            const bucket = getStorage(firebase_foto).bucket();
            const url = await sharp(fileObject.buffer)
                .webp()
                .toBuffer()
                .then(async(data) => {
                    console.log("start Uploading");
                    console.log(data)
                    const url = await bucket.file(`${kodeFoto}/${kodeFoto}_${indexFoto}.webp`).save(data, { 
                        metadata: { 
                          contentType: 'image/webp' 
                        } 
                    })
                        console.log('Uploaded photo' + indexFoto);
                })
            return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${kodeFoto}%2F${kodeFoto}_${indexFoto}.webp?alt=media`;
        }catch(e){
            logger.error(e);
        }
        
    };

    static async uploadThumbnail(fileObject, kodeFoto){
        try{
            const bucket = getStorage(firebase_foto).bucket();
            const url = await sharp(fileObject.buffer)
                .resize({
                    width: 300,
                    height: 400
                })
                .webp()
                .toBuffer()
                .then(async(data) => {
                    console.log("start Uploading preview");
                    console.log(data)
                    const url = await bucket.file(`${kodeFoto}/${kodeFoto}_preview.webp`).save(data, { 
                        metadata: { 
                          contentType: 'image/webp' 
                        } 
                    })
                    .then(() => {
                        console.log('Uploaded photo preview');
                    })
                })
        }catch(e){
            logger.error(e);
        }
    }

    static async deleteFile(fileLocation){
        try{  
            const bucket = getStorage(firebase_foto).bucket();
            await bucket.file(fileLocation).delete();
        }catch(e){
            logger.error(e);
        }
    }

}