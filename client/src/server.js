import express from "express";
import path from 'path'
import {fileURLToPath} from 'url';


const app = express();
const PORT = process.env.PORT || 8080
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.listen(PORT)