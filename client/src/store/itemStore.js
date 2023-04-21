import {makeAutoObservable} from 'mobx'

export default class ItemStore{
	constructor(){
		this._types = [];
		this._manufacturers = [];
		this._items = [];
		this._cart = {};
		this._cartItems = [];
		this._shopItems = [];
		this._selectedCartItems = [];
		this._itemUserRate = 0;
		this._itemRating = [];
		this._selectedType = {};
		this._selectedManufacturer = {};
		this._cartPrice = 0;
		this._cartItemCount = 0;
		this._page = 1;
		this._totalCount = 0;
		this._limit = 12;
		makeAutoObservable(this);
	}

	setTypes(types) {
		this._types = types;
	}

	setManufacturers(manufacturers) {
		this._manufacturers = manufacturers;
	}

	setItems(items) {
		this._items = items;
	}

	setShopItems(items) {
		this._shopItems = items;
	}

	setPage(page) {
		this._page = page;
	}

	setItemUserRate(rate) {
		this._itemUserRate = rate;
	}

	setTotalCount(count) {
		this._totalCount = count;
	}

	setCartItems(cartItems) {
		this._cartItems = cartItems;
	}
	
	removeCartItem(id) {
		this._cartItems.splice(id - 1, 1)
	}

	setCartItemCount(cartItemCount) {
		this._cartItemCount = cartItemCount;
	}

	setSelectedCartItems(items) {
		this._selectedCartItems = items;
	}

	setRating (rating) {
		this._itemRating = rating;
	}

	setSelectedType(type) {
		this.setPage(1)
		this._selectedType = type;
	}

	setSelectedManufacturer(manufacturer) {
		this.setPage(1)
		this._selectedManufacturer = manufacturer;
	}
	
	setCart(cart) {
		this._cart = cart;
	}

	updateCartInfo(data) {
		this._cartItems = data.rows;
		this._cartItemCount = 0;
		this._cartItems.forEach(cartItem => {
			this._cartItemCount = (this._cartItemCount + cartItem.quantity)
		})
	}

	setCartPrice(price) {
		this._cartPrice = price;
	}

	get itemUserRate () {
		return this._itemUserRate;
	}

	get cartItemCount () {
		return this._cartItemCount;
	}

	get cartPrice() {
		return this._cartPrice;
	}

	get cart() {
		return this._cart;
	}


	get cartItems(){
		return this._cartItems;
	}

	get selectedCartItems(){
		return this._selectedCartItems;
	}

	get itemRating(){
		return this._itemRating;
	}

	get types(){
		return this._types;
	}

	get manufacturers(){
		return this._manufacturers;
	}

	get shopItems(){
		return this._shopItems;
	}

	get items(){
		return this._items;
	}

	get selectedType() {
		return this._selectedType;
	}

	get selectedManufacturer() {
		return this._selectedManufacturer;
	}
	get totalCount() {
		return this._totalCount;
	}

	get page() {
		return this._page;
	}

	get limit() {
		return this._limit;
	}
}