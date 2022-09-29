import * as fs from 'fs';
import mongodb from "mongodb";
import dotenv from "dotenv";
import { app } from './app.js';
import gownDAO from './dao/gownDAO.js';
import { logger } from './logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

export const indexPath = path.join(__dirname, 'build', 'index.html');

const port = process.env.PORT || 5000;
const MongoClient = mongodb.MongoClient;

MongoClient.connect(
	process.env.DB_URI,
	{
		maxPoolSize: 50,
		wtimeoutMS: 2500,
		useNewUrlParser: true
	}
).catch(err => {
	logger.error(`${err.stack} \n ${JSON.stringify(err)}`);
}).then(async client => {

	await gownDAO.injectDB(client)

	app.listen(port, () => {
		console.log(`listening on port ${port}`)
	})
})

