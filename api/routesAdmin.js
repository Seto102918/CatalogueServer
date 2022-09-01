import deleteFromDrive from "./delete.js";

import express from "express"
import multer from 'multer';

import gownCtrl from "./gown.controller.js"
import uploadFile from "./upload.js";

const upload = multer();
const routerAdmin = express.Router();

/* Edit From Admin Site */
routerAdmin.post('/edit', upload.any(), (req, res) => {
    gownCtrl.apiEditGaun(req, res);
});

routerAdmin.post('/upload', upload.any(), async (req, res) => {
    try {
        console.log(req)
        const { body, files } = req;
        console.log(files)
        const IdArray = [];
        for (let i = 0; i < files.length; i++) {
            const Id = await uploadFile(files[i], body.kode, i);
            IdArray.push(Id);
        }
        gownCtrl.apiAddGaun(req, res, IdArray);
    } catch (err) { res.send(err.message); }
});

routerAdmin.post('/delete', async (req, res) => {
    try {
        console.log(req)
        //get id foto di drive + delete
        let returned = await gownCtrl.apiCheckId(req, res)
        let drive = returned.gown[0].drive;
        for (let i = 0; i < drive.length; i++) {
            await deleteFromDrive(drive[i]); //delete
        }
        await gownCtrl.apiDelete(req, res); //delete data di mongodb
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.send(err.message);
    }
})

export default routerAdmin;