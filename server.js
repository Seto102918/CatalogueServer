import * as fs from 'fs'
import mongodb from "mongodb"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import path from 'path'
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars'
dotenv.config()

const app = express();
const port = process.env.PORT || 5000;
const MongoClient = mongodb.MongoClient;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import gownDAO from './dao/gownDAO.js'

app.use(cors());
app.use(express.json());
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

app.use(express.urlencoded({ extended: true }))

import Routes from "./api/routes.js"
app.use("/", Routes)

// app.use("*", (req, res) => res.status(404).json({ error: "not found"}))//

MongoClient.connect(
	process.env.DB_URI,
	{
		maxPoolSize: 50,
		wtimeoutMS: 2500,
		useNewUrlParser: true
	}
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {

	await gownDAO.injectDB(client)

	app.listen(port, () => {
		console.log(`listening on port ${port}`)
	})
})

