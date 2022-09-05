import sharp from "sharp";
import stream from 'stream';
import { firebase_foto } from "./service.js";
import { getStorage } from 'firebase-admin/storage';
import * as fs from "fs";

const uploadFile = async (fileObject, kodeFoto, indexFoto, res) => {
    try{
        const bucket = getStorage(firebase_foto).bucket();
        await sharp(fileObject.buffer)
            .webp()
            .toFile(`${kodeFoto}_${indexFoto}.webp`)
            .then(() => {
                console.log("start Uploading");
                bucket.upload(`${kodeFoto}_${indexFoto}.webp`,{
                    destination: `${kodeFoto}/${kodeFoto}_${indexFoto}.webp`,
                })
                    .then(() => {
                        console.log('removing instance in server');
                        fs.unlinkSync(`${kodeFoto}_${indexFoto}.webp`)
                    })
                    .catch((e) => console.log(e))
            })
            .catch(err => { console.log(err) });
        return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${kodeFoto}%2F${kodeFoto}_${indexFoto}.webp?alt=media`;
    }catch(e){
        console.log(e)
        res.send(e)
    }
    
};

export default uploadFile;