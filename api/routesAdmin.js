import deleteFromDrive from "./delete.js";

import express from "express"
import multer from 'multer';

import uploadFile from "./upload.js";
import gownController from "./gown.controller.js";

const upload = multer();
const routerAdmin = express.Router();

/* Edit From Admin Site */
routerAdmin.post('/edit', upload.any(), (req, res) => {
    console.log("editing Data...");
    gownController.apiEditGaun(req, res);
});

routerAdmin.post('/upload', upload.any(), async (req, res) => {
    try {
        console.log("add to Data...");
        const { body, files } = req;
        console.log(files)
        //Check Udh ada ato kgk
        const returned = gownController.apiCheckId(req, res);

        if (!isNaN(returned.gown[0])) {
            console.log("Data Exists");
            return res.send("Data Exists");
        }

        const IdArray = [];
        for (let i = 0; i < files.length; i++) {
            console.log("uploading Photo " + i + "...");
            const Id = await uploadFile(files[i], body.kode, i, res);
            IdArray.push(Id);
        }
        gownController.apiAddGaun(req, res, IdArray);
    } catch (err) { res.send(err.message); }
});

routerAdmin.post('/delete', async (req, res) => {
    try {
        console.log("deleting Data...");
        console.log(req.body)
        //get id foto di drive + delete
        let returned = await gownController.apiCheckId(req, res);

        console.log("returned: " + JSON.stringify(returned));

        if (isNaN(returned.gown[0])) {
            console.log("Cant Find Data");
            return res.status(404).send("Cant Find Data");
        }

        let drive = returned.gown[0].drive;
        for (let i = 0; i < drive.length; i++) {
            await deleteFromDrive(drive[i]); //delete
        }
        await gownController.apiDelete(req, res); //delete data di mongodb
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.send(err.message);
    }
})

export default routerAdmin;