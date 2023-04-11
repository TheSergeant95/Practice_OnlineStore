import { Type } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class TypeController {
	async create (req, res) {
		const {name} = req.body;
		const type = await Type.create({name});
		return res.json(type);
	}

	async delete (req, res, next) {
			const {id} = req.body;
			const type = await Type.findOne({
				where: {id}
			});
			if(!type){
				return next(ApiError.badRequest('Type was not found!'));
			}
			await type.destroy();
			res.json({message: "Type deleted"});
	}

	async getAll (req, res) {
		const types = await Type.findAll();
		return res.json(types);
	}
}

export default new TypeController();