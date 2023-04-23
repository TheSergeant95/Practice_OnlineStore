import { $host, $authHost } from "./index.js";

export const createType = async (type) => {
	const {data} = await $authHost.post('api/type', type)
	return data
}

export const fetchTypes = async () => {
	const {data} = await $host.get('api/type')
	return data
}

export const createManufacturer = async (man) => {
	const {data} = await $authHost.post('api/manufacturer', man)
	return data
}

export const fetchManufacturers = async () => {
	const {data} = await $host.get('api/manufacturer')
	return data
}

export const createItem = async (item) => {
	const {data} = await $authHost.post('api/item', item)
	return data
}

export const fetchItems = async (typeId, manufacturerId, page, limit = 12) => {
	const {data} = await $host.get('api/item', {params: {
		typeId, manufacturerId, page, limit
	}})
	return data
}

export const fetchOneItem = async (id) => {
	const {data} = await $host.get('api/item/' + id)
	return data
}

export const fetchCart = async () => {
	const {data} = await $authHost.get('api/cart/getCart')
	return data
}

export const fetchCartItems = async () => {
	const {data} = await $authHost.get('api/cart/getCartItems')
	return data
}

export const addCartItem = async (itemId, quantity) => {
	const {data} = await $authHost.post('api/cart/item/' + itemId + '/append/' + quantity);
	return data
}

export const incrementCartItem = async (itemId, quantity) => {
	const {data} = await $authHost.put('api/cart/item/' + itemId + '/increment/' + quantity);
	return data
}

export const decrementCartItem = async (itemId, quantity) => {
	const {data} = await $authHost.put('api/cart/item/' + itemId + '/decrement/' + quantity);
	return data
}

export const removeCartItem = async (itemId) => {
	const {data} = await $authHost.delete('api/cart/item/' + itemId + '/remove');
	return data
}

export const clearCart = async () => {
	const {data} = await $authHost.delete('api/cart/clear/');
	return data
}

export const createRating = async (itemId, rate) => {
	const {data} = await $authHost.post('api/rating/item/' + itemId + '/rate/' + rate);
	return data
}

export const getRating = async (itemId) => {
	const {data} = await $authHost.get('api/rating/item/' + itemId);
	return data
}