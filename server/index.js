import * as dotenv from 'dotenv';
import { env } from "process";
import path from 'path';
import {fileURLToPath} from 'url';

import express from "express";
import fileUpload from "express-fileupload"
/*Sequelize - ORM-библиотека для приложений на Node.js, которая осуществляет сопоставление таблиц в БД и отношений между ними с классами. 
При использовании. Sequelize мы можем не писать SQL-запросы, а работать с данными как с обычными объектами. */
import sequelize from "./db.js";

import * as Models from "./models/models.js";
import Cors from 'cors'; //для отправки запросов с браузера

import router from './routes/index.js';

import errorHandler from './middleware/errorHandlingMiddleware.js';
dotenv.config()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const PORT = env.PORT || 3001;

const app = express();
app.use(Cors());
app.use(express.json()); //чтобы приложение могло парсить json-формат
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);
// app.use(cookieParser(process.env.SECRET_KEY))

app.use(errorHandler); //middleware, работающий с ошибками, идёт в конце

const start = async () => {
	try{
		await sequelize.authenticate(); //Устанавливаем подключение к БД
		await sequelize.sync(); //Сверяем БД со схемой данных
		app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
	}catch (e) {
		console.log(e);
	}
}

start();