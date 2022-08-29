import * as fs from 'fs';
import mongodb from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import compression from 'compression';
dotenv.config()

const app = express();
const port = process.env.PORT || 5000;
const MongoClient = mongodb.MongoClient;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import gownDAO from './dao/gownDAO.js'

app.use(cors());
app.use(express.json());
app.use(compression());
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

import RoutesApi from "./api/routesApi.js"
import RoutesAdmin from "./api/routesAdmin.js"

const indexPath = path.join(__dirname, 'build', 'index.html');

app.use("/api/", RoutesApi)
app.use("/admin/", RoutesAdmin)

app.get('/*', function (req, res) {
	const arrayHomePath = [
		'/wedding_gown',
		'/maternity_gown',
		'/family_gown',
		'/prewedding_gown',
		'/cheongsam',
		'/holy_matrimony_gown',
		'/wedding_suits',
		'/kebaya'
	]

	console.log(req.url.slice(0, 3))

	try {
		fs.readFile(indexPath, 'utf8', (err, htmlData) => {
			if (err) {
				console.error('Error during file reading', err);
				return res.status(404).end()
			}

			const urlPath = req.url;
			// if (!arrayHomePath.includes(urlPath)) return res.status(404).send("Post not found");

			console.log(htmlData)
			// htmlData = htmlData.replace(
			// 	"<title>React App</title>",
			// 	`<title>test</title>`
			// )
			// 	// .replace('__META_OG_TITLE__', 'test')
			// 	.replace('__META_OG_DESCRIPTION__', 'test')
			// 	.replace('__META_DESCRIPTION__', "This is the first post")
			// // .replace('__META_OG_IMAGE__', 'test')

			console.log(htmlData)
			return res.send(htmlData);
		});
	}
	catch (err) {
		console.log(err)
	}



});

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

