import { Cart, CartItem, Item } from "../models/models.js";
import ApiError from "../error/ApiError.js";

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

class CartController {
	async getCart (req, res, next) {
		try{
			const {id} = req.user
			const cart = await Cart.findOne({where: {userId: id}});
			return res.json(cart)
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getCartItems (req, res, next) {
		const {id} = req.user
		const cart = await Cart.findOne({where: {userId: id}});
		const cartItems = await CartItem.findAndCountAll({where: {cartId: cart.id}});
		// entry = {...entry, name: item.name, price: item.price, rating: item.rating, img: item.img, typeId: item.typeId, manufacturerId: item.manufacturerId}
		return res.json(cartItems)
	}

	async append (req, res, next) {
		try {
			const {itemId, quantity} = req.params;
			const {id} = req.user;
			const cart = await Cart.findOne({where: {userId: id}});
			const cartItem = await CartItem.findOne({where: {cartId: cart.id, itemId: itemId}});
			if(!cartItem){
				const newCartItem = await CartItem.create({cartId: cart.id, itemId: itemId, quantity: quantity});
				return res.json(newCartItem)
			}
			await cartItem.increment('quantity', {by: quantity})
			return res.json(cartItem);
		} catch (e) {
				next(ApiError.badRequest(e.message));
		}
	}

	async increment (req, res, next) {
		const {itemId, quantity} = req.params;
		const {id} = req.user;
		const cart = await Cart.findOne({where: {userId: id}});
		const cartItem = await CartItem.findOne({where: {cartId: cart.id, itemId: itemId}});
		if(!cartItem){
			const newCartItem = await CartItem.create({cartId: cart.id, itemId: itemId, quantity: quantity});
			return res.json(newCartItem)
		}
		await cartItem.increment('quantity', {by: quantity})
		return res.json(cartItem);
	}

	async decrement (req, res, next) {
		const {itemId, quantity} = req.params;
		const {id} = req.user;
		const cart = await Cart.findOne({where: {userId: id}});
		const cartItem = await CartItem.findOne({where: {cartId: cart.id, itemId: itemId}});
		if(!cartItem){
			return next(ApiError.badRequest('Item was not found in the cart'))
		}
		await cartItem.decrement('quantity', {by: quantity})
		return res.json(cartItem);
	}

	async remove (req, res, next) {
		const {itemId} = req.params;
		const {id} = req.user;
		const cart = await Cart.findOne({where: {userId: id}});
		const cartItem = await CartItem.findOne({where: {cartId: cart.id, itemId}});
		if(!cartItem){
			return next(ApiError.badRequest('Item was not found in the cart'))
		}
		await cartItem.destroy()
		res.json({message: 'Item was removed'});
	}

	async clear (req, res, next) {
		const {id} = req.user;
		const cart = await Cart.findOne({where: {userId: id}});
		await CartItem.destroy({where: {cartId: cart.id}})
		
		res.json({message: 'Cart is cleared'})
	}
}

export default new CartController();