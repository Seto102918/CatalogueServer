
import sharp from "sharp";
import stream from 'stream';

export default async function convert2webp(fileObject) {
    await sharp(fileObject.buffer)
        .webp()
        .toBuffer()
        .then(newBuffer => {
            fileObject.buffer = newBuffer;
        })
        .catch(err => { console.log(err) });
}