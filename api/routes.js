import express from "express"
import { createRequire } from "module";
const require = createRequire(import.meta.url); 
import multer from 'multer';

import gownCtrl from "./gown.controller.js"
import uploadFile from "./upload.js";
import deleteFromDrive from "./delete.js";

const upload = multer();
const router = express.Router();

/* Edit From Admin Site */
router.post('/admin/edit', upload.any(), (req, res) => {
    gownCtrl.apiEditGaun(req, res);
});

router.post('/admin/upload', upload.any(), async (req, res) => {
    try {
        console.log(req)
        const { body, files } = req;
        const IdArray = [];
        for (let i = 0; i < files.length; i++) {
            const Id = await uploadFile(files[i], body.kode, i);
            IdArray.push(Id);
        }
        gownCtrl.apiAddGaun(req,res,IdArray);
    } catch (err) { res.send(err.message); }
});

router.post('/admin/delete', async (req, res) => {
    try {
        console.log(req)
        //get id foto di drive + delete
        let returned = await gownCtrl.apiCheckId(req, res)
        let drive = returned.gown[0].drive;
        for (let i = 0; i < drive.length; i++){
            await deleteFromDrive(drive[i]); //delete
        }
        await gownCtrl.apiDelete(req,res); //delete data di mongodb
        res.sendStatus(200);
    } catch (err) { 
        console.log(err)
        res.send(err.message); 
    }
})

router.route("/api/v1/gown").get(gownCtrl.apiGetGown)
router.route("/api/v1/gown/id/:id").get(gownCtrl.apiGetGownById)
router.route("/api/v1/gown/kode/:kode").get(gownCtrl.apiGetGownKode)
router.route("/api/v1/gown/list_warna").get(gownCtrl.apiGetGownListColor)

export default router