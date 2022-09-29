import express, { response } from "express";
import cors from "cors";
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import * as bcrypt from 'bcrypt';
import RoutesApi from "./routes/routesApi.js";
import RoutesAdmin from "./routes/routesAdmin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'build'), {
	etag: true,
	lastModified: true,
	setHeaders: (res, path) => {
		const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');
		if (path.endsWith('.html')) {
			res.setHeader('Cache-Control', 'no-cache');
		} else if (hashRegExp.test(path)) {
			res.setHeader('Cache-Control', 'max-age=31536000');
		}
	},
}));

app.use("/api/", RoutesApi);
app.use("/admin/", RoutesAdmin);

app.get('/*', function (req, res) {
	fs.readFile(path.join(__dirname, 'build', 'index.html'), "utf8", (err, data) => {
		if (err) {
		  logger.error(err);
		  return res.status(500).send("An error occurred");
		}
		return res.send(data)
	});
});

app.post('/login', function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	const wrongInput = {
		auth: false,
		message: 'Wrong Username / Password'
	};

	console.log(username === process.env.ADMIN_USERNAME)

	if(username === process.env.ADMIN_USERNAME){
		bcrypt.compare(password, process.env.ADMIN_PASSWORD, (error, response) => {
			console.log(response)
			if(response) {
				const id = 1;
				const token = sign({id}, process.env.ACCESS_TOKEN_SECRET, {
					expiresIn: 3000,
				})

				res.json({
					auth: true,
					token: token,
					result: username
				})
			} else res.json(wrongInput);
		})
	} else res.json(wrongInput);
});
  
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export { app };