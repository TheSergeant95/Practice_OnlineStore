import { Manufacturer } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class ManufacturerController {
	async create (req, res) {
		const {name} = req.body;
		const manufacturer = await Manufacturer.create({name});
		return res.json(manufacturer);
	}

	async delete (req, res, next) {
		const {id} = req.body;
		const manufacturer = await Manufacturer.findOne({
			where: {id}
		});
		if(!manufacturer){
			return next(ApiError.badRequest('Manufacturer was not found!'));
		}
		await manufacturer.destroy();
		res.json({message: "Manufacturer deleted"});
	}

	async getAll (req, res) {
		const manufacturers = await Manufacturer.findAll();
		return res.json(manufacturers);
	}
}

export default new ManufacturerController();