import stream from 'stream';
import getDriveService from './service.js';

const uploadFile = async (fileObject, kodeFoto , indexFoto ) => {
    const driveService = await getDriveService();

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

    const { data } = await driveService.files.create({
        media: {
            mimeType: 'image/jpeg',
            body: bufferStream,
        },
        resource: {
            name: `${kodeFoto}_${indexFoto}`,
            parents: ['1d_yh1rxVfSGdHLO8pGbSyl6dLuhelQ5h'],
        },
        fields: 'id,name',
    });
    return data.id;
};

export default uploadFile;