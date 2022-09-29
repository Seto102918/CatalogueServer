import express from "express"
import gownCtrl from "../controllers/gown.controller.js"

const routerApi = express.Router();

routerApi.route("/v1/gown").get(gownCtrl.apiGetGown)
routerApi.route("/v1/gown/id/:id").get(gownCtrl.apiGetGownById)
routerApi.route("/v1/gown/kode/:kode").get(gownCtrl.apiGetGownKode)

export default routerApi