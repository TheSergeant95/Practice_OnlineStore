import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index.js';
import CartItemComponent from './cartItemComponent.js';
import { observer } from 'mobx-react-lite';
import { fetchCartItems, removeCartItem } from '../http/itemAPI.js';

const CartItemList = observer(() => {
	const {item} = useContext(Context)
	const [cartList, setCartList] = useState([])
	const removeFromCart = (id) => {
		removeCartItem(id)
		.then(() => fetchCartItems())
		.then(data => {
			item.updateCartInfo(data)
		})
	}

	useEffect(() => {
		if(item.items.length > 0 && item.cartItems.length > 0) {
			const cartItemsInfo = item.cartItems.map(entry => {
				const itemFromList = item.items.find(i => i.id === entry.itemId)
				return {...entry, name: itemFromList.name, price: itemFromList.price, rating: itemFromList.rating, img: itemFromList.img, typeId: itemFromList.typeId, manufacturerId: itemFromList.manufacturerId}
			})
			setCartList(cartItemsInfo);
		}
	}, [item.cartItems, item.items])
	
	return (
		<div>
			{cartList.map(i =>
				<CartItemComponent key={i.id} itemCard={i} removeFromCart={()=>removeFromCart(i.itemId)}/>	
			)}
		</div>
	);
});

export default CartItemList;