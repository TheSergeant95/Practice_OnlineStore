import { Item, Rating } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class RatingController {
	async getRating(req, res, next) {
			const {itemId} = req.params
			const rating = await Rating.findOne({where: {itemId, userId: req.user.id}});
			
			res.json(rating);
	};

	async create(req, res, next) {
        try {
            const {itemId, rate} = req.params;
			const existingRating = await Rating.findOne({where: {userId: req.user.id, itemId}})
			let rating;
			if(existingRating){
				await existingRating.update({rate})
				rating = existingRating;
			}else{
				rating = await Rating.create({userId: req.user.id, itemId, rate});
			}
			const itemRates = await Rating.findAndCountAll({where: {itemId}});
			let ratingSum = 0;
			itemRates.rows.forEach(row => {
				ratingSum += row.rate;
			})
			const avgRating = +(ratingSum/itemRates.count).toFixed(2);
			await Item.update({rating: avgRating}, {where: {id: itemId}})
            res.json(rating)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

export default new RatingController();