import sharp from "sharp";
import stream from 'stream';
import { firebase_foto } from "./service.js";
import { getStorage } from 'firebase-admin/storage';
import * as fs from "fs";

const uploadFile = async (fileObject, kodeFoto, indexFoto, res) => {
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
                .then(() => {
                    console.log('Uploaded photo' + indexFoto);
                    
                })
                .catch(e => { 
                    console.log(e);
                    throw e;
                });
            })
            .catch(err => { 
                console.log(err);
                return res.status(500).send(e);
            });
        return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${kodeFoto}%2F${kodeFoto}_${indexFoto}.webp?alt=media`;
    }catch(e){
        console.log(e)
        throw e;
    }
    
};

export default uploadFile;