import sharp from "sharp";
import stream from 'stream';
import { firebase_foto } from "./service.js";
import { getStorage } from 'firebase-admin/storage';
import * as fs from "fs";
import e from "express";

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
            .catch(e => { 
                console.log(e);
                throw e;
            });
        return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${kodeFoto}%2F${kodeFoto}_${indexFoto}.webp?alt=media`;
    }catch(e){
        console.log(e)
        throw e;
    }
    
};

export const uploadThumbnail = async (fileObject, kodeFoto) => {
    try{
        const bucket = getStorage(firebase_foto).bucket();
        const url = await sharp(fileObject.buffer)
            .resize({
                width: 600,
                height: 800
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
                .catch(e => { 
                    console.log(e);
                    throw e;
                });
            })
            .catch(e => { 
                console.log(e);
                throw e;
            });
    }catch(e){
        console.log(e)
        throw e;
    }
}

export default uploadFile;