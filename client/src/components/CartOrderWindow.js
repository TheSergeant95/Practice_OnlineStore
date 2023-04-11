import React, { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Context } from '../index.js';
import ModalOrderCompleted from './modals/ModalOrderCompleted.js';
import { observer } from 'mobx-react-lite';
import { clearCart, fetchCartItems } from '../http/itemAPI.js';

const CartOrderWindow = observer(({cartCleared}) => {
	const {item} = useContext(Context)
	
	
	
	return (
		<>
			<Card className='d-flex flex-column align-items-center justify-content-around'
				style={{width: 350, height: 200, fontSize: 25, border: '5px solid lightgray', position: 'fixed'}}>
					<Button 
						variant={'outline-dark'} 
						size='lg' className='mt-3' 
						onClick={cartCleared}
					>
						Оформить заказ
					</Button>
					<hr align="right" width="250" size="3" color="#0000dd" />
					<h6>Товаров в корзине: {item.cartItemCount}</h6>
					<div style={{fontSize: '20px'}} className='mb-3'>Общая стоимость: {item.cartPrice} руб.</div>				
			</Card>
			
		</>
	);
});

export default CartOrderWindow;