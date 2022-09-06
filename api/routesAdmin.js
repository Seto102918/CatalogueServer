import express from "express"
import multer from 'multer';
import gownController from "./gown.controller.js";

const upload = multer();
const routerAdmin = express.Router();

/* Edit From Admin Site */
routerAdmin.post('/edit', upload.any(), async (req, res) => gownController.apiEditGaun(req, res));

routerAdmin.post('/upload', upload.any(), async (req, res) => gownController.apiAddGaun(req, res));

routerAdmin.post('/delete', async (req, res) => gownController.apiDelete(req, res));

export default routerAdmin;