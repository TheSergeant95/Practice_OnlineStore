import * as dotenv from 'dotenv';
import { Sequelize } from "sequelize";
dotenv.config()

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: 'postgres',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	}
)

// const sequelize = new Sequelize(
// 	'online_store',
// 	'postgres',
// 	'root',
// 	{
// 		dialect: 'postgres',
// 		host: 'localhost',
// 		port: 5432
// 	}
// )

export default sequelize;