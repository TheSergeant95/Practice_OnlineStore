import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CartItemList from '../components/CartItemList';
import { Context } from '../index.js';
import { clearCart, fetchCartItems, fetchItems, fetchManufacturers, fetchTypes } from '../http/itemAPI';
import { observer } from 'mobx-react-lite';
import CartOrderWindow from '../components/CartOrderWindow';
import ModalOrderCompleted from '../components/modals/ModalOrderCompleted';

const Cart = observer(() => {
	const {item} = useContext(Context)
	const [orderVisible, setOrderVisible] = useState(false);
	useEffect(() => {
		fetchManufacturers().then(data => item.setManufacturers(data));
		
	}, [])
	
	const openCloseModal = () => {
		setOrderVisible(true);
		
		setTimeout(() =>{
			setOrderVisible(false)
			clearCart()
			.then(() => fetchCartItems())
			.then(data => {
			item.updateCartInfo(data)
		})
		}, 5000);
	}

	return (
		<>
			<Container className='d-flex mt-5 justify-content-center'>
				{item.cartItems.length > 0 
				?
				<Col md={4}>
					<CartItemList />
				</Col>
				:
				<Row>
					<h1>Ваша корзина пуста</h1>
				</Row>
				}
				{item.cartItems.length > 0
				?
				<Col md={{ span: 4, offset: 4 }}>
					<CartOrderWindow cartCleared={() => openCloseModal()}/>
				</Col>
				:
				null
				}
				
				
			</Container>
			<ModalOrderCompleted show={orderVisible} onHide={() => setOrderVisible(false)}/>
		</>
	);
});

export default Cart;