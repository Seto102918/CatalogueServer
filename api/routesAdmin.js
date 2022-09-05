import deleteFile from "./delete.js";

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
        const returned = await gownController.apiCheckId(req, res);

        if(returned.gown.length >= 0){
            console.log('Data already Exists');
            return res.status(400).send("Data already Exists");
        }

        const urlArray = [];
        for (let i = 0; i < files.length; i++) {
            console.log("uploading Photo " + i + "...");
            const url = await uploadFile(files[i], body.kode, i, res);
            urlArray.push(url);
        }
        gownController.apiAddGaun(req, res, urlArray);
    } catch (err) { 
        console.log(err);
        res.status(500).send(err.message); 
    }
});

routerAdmin.post('/delete', async (req, res) => {
    try {
        console.log("deleting Data...");
        console.log(req.body)
        //get id foto di urlArray + delete
        let returned = await gownController.apiCheckId(req, res);

        console.log("returned: " + JSON.stringify(returned));

        if (!returned.gown[0]) {
            console.log("Cant Find Data");
            return res.status(404).send("Cant Find Data");
        }

        let urlArray = returned.gown[0].urlArray;
        for (let i = 0; i < urlArray.length; i++) {
            await deleteFile(`${req.body.kode}/${req.body.kode}_${i}.webp`); //delete
        }
        await gownController.apiDelete(req, res); //delete data di mongodb
        res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
})

export default routerAdmin;