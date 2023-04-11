import { Item, ItemInfo } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

class ItemController {
	
	async create (req, res, next) {
		try{
			let {name, price, manufacturerId, typeId, info} = req.body;
			const {img} = req.files;
			const fileName = uuidv4() + ".jpg";
			img.mv(path.resolve(__dirname, '..', 'static', fileName)); 
			//Заставляем сервер отдавать файл как static, чтобы получать файлы через браузер.
			const item = await Item.create({name, price, manufacturerId, typeId, img: fileName});
			
			if(info){
				//когда мы передаем данные через formData, они приходят в виде строки. Передаваемый массив будем парсить.
				info = JSON.parse(info);
				info.forEach(i => {
					ItemInfo.create({
						prop: i.prop,
						description: i.description,
						itemId: item.id
					})
				})
			}

			return res.json(item);
		} catch(e){
			next(ApiError.badRequest(e.message));
		}
	}

	async deleteItem (req, res, next) {
		const {id} = req.body;
		const item = await Item.findOne({
			where: {id},
			include: [{model: ItemInfo, as: 'info'}]
		});
		if(!item){
			return next(ApiError.badRequest('Item was not found!'));
		}
		if(item.info !== undefined || item.info.length > 0){
			await ItemInfo.destroy({where: {itemId: id}})
		}

		await item.destroy();

		res.json({message: "Item deleted"});
	}

	async getAll (req, res) {
		let {manufacturerId, typeId, limit, page} = req.query;
		page = page || 1;
		limit = limit || 9;
		const offset = page * limit - limit;
		let items;
		if(!manufacturerId && !typeId){
			items = await Item.findAndCountAll({limit, offset});
		}
		if(manufacturerId && !typeId){
			items = await Item.findAndCountAll({where: {manufacturerId}, limit, offset});
		}
		if(!manufacturerId && typeId){
			items = await Item.findAndCountAll({where: {typeId}, limit, offset});
		}
		if(manufacturerId && typeId){
			items = await Item.findAndCountAll({where: {manufacturerId, typeId}, limit, offset});
		}
		return res.json(items);
	}

	async getItem (req, res) {
		const {id} = req.params;
		const item = await Item.findOne( //получить предмет и массив характеристик
			{
				where: {id},
				include: [{model: ItemInfo, as: 'info'}]
			}
		)
		return res.json(item);
	}
}

export default new ItemController();