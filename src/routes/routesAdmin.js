import express from "express"
import multer from 'multer';
import gownController from "../controllers/gown.controller.js";
import { indexPath } from "../server.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;
const upload = multer();
const routerAdmin = express.Router();

const verifyJWT = (req, res, next) => {
	const token = req.headers["x-access-token"]
	if (!token) {
		console.log("No Token")
		res.status(401).json('No Token!')
	} else {
		verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if(err){
				console.log("Unable to verify Token")
				res.status(401).json({
					auth: false,
					message: 'Failed to verify token'
				})
			} else {
                console.log("Authorized")
                next();
            }
		})
	}
}

/* Edit From Admin Site */
routerAdmin.post('/edit',  upload.any(), verifyJWT , async (req, res) => gownController.apiEditGaun(req, res));
routerAdmin.post('/upload',  upload.any(), verifyJWT , async (req, res) => gownController.apiAddGaun(req, res));
routerAdmin.post('/delete', verifyJWT , async (req, res) => gownController.apiDelete(req, res));

export default routerAdmin;