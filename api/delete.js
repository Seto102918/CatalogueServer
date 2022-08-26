import getDriveService from './service.js'

const deleteFromDrive = async(fileId) => {
    const drive = await getDriveService();

    drive.files.delete({
      fileId: fileId,
    }).then(
      async function (){
        return { status: 'success' }
      },
      function (err) {
        return { errors: [{ msg: err }] };
      }
    );
}

export default deleteFromDrive;
