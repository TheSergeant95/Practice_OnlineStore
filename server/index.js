import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { env } from "process";

const PORT = env.PORT || 3001;

const app = express();

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));