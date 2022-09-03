import sharp from "sharp";
import stream from 'stream';
import getDriveService from './service.js';

const uploadFile = async (fileObject, kodeFoto, indexFoto, res) => {
    try{
        const driveService = await getDriveService();

        await sharp(fileObject.buffer)
            .webp()
            .toBuffer()
            .then(newBuffer => {
                fileObject.buffer = newBuffer;
            })
            .catch(err => { console.log(err) });

        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);

        const { data } = await driveService.files.create({
            media: {
                mimeType: 'image/webp',
                body: bufferStream,
            },
            resource: {
                name: `${kodeFoto}_${indexFoto}`,
                parents: ['1d_yh1rxVfSGdHLO8pGbSyl6dLuhelQ5h'],
            },
            fields: 'id,name',
        });
        return data.id;
    }catch(e){
        res.send(e)
    }
    
};

export default uploadFile;