import React, { useContext, useEffect, useState } from 'react';
import basket from '../assets/basket.svg'
import { Button, Card, Col, Dropdown, Form, Image, Row } from 'react-bootstrap';
import { Context } from '../index.js';
import { observer } from 'mobx-react-lite';
import { decrementCartItem, fetchCartItems, incrementCartItem } from '../http/itemAPI';

const CartItemComponent = observer(({itemCard, removeFromCart}) => {
	const quantities = [...Array(10).keys()];
	const {item} = useContext(Context);
	const [manufacturer, setManufacturer] = useState('')
	useEffect(() => {
		const man = item.manufacturers.find(m => m.id === itemCard.manufacturerId);
		const manName = !man ? 'Loading...' : man.name;
		setManufacturer(manName)
	}, [item.manufacturers])

	const changeQuantity = (itemId, value) => {
		const quantity = value - itemCard.quantity
		if(quantity > 0){
			incrementCartItem(itemId, quantity).then(() => fetchCartItems())
			.then(data => {
				item.setCartItems(data.rows)
				item.setCartItemCount(0)
				item.cartItems.forEach(cartItem => {
					item.setCartItemCount(item.cartItemCount + cartItem.quantity)
				})
			})
		} else if(quantity < 0){
			decrementCartItem(itemId, quantity * (-1)).then(() => fetchCartItems())
			.then(data => {
				item.setCartItems(data.rows)
				item.setCartItemCount(0)
				item.cartItems.forEach(cartItem => {
					item.setCartItemCount(item.cartItemCount + cartItem.quantity)
				})
			})
		}
	}

	return (
			<Card className='d-flex justify-content-center mb-2' style={{width: 750, cursor: 'pointer'}} border={"dark"}>
				<Row>
					<Col>
						<Card.Img variant='left' width={150} height={150} src={process.env.REACT_APP_API_URL + itemCard.img}/>
					</Col>
					<Col xs={6} className='mt-2'>
						<Card.Title className='mb-3'>{itemCard.name}</Card.Title>
						<div className='text-black-50'>{manufacturer}</div>
					</Col>
					<Col className='mt-2'>
						<div className='mb-3'>{itemCard.price} р.</div>
						<Dropdown className="mb-3">
							<Dropdown.Toggle style={{width: '100px'}}>{itemCard.quantity}</Dropdown.Toggle>
							<Dropdown.Menu>
								{quantities.map(q => 
									<Dropdown.Item 
									key={q+1} 
									onClick={() => changeQuantity(itemCard.itemId, q+1)}
								>
									{q+1}
								</Dropdown.Item>	
								)}
							</Dropdown.Menu>
						</Dropdown>
						<Button variant='danger' size="sm" onClick={removeFromCart}><Image width={25} height={25} src={basket}/></Button>
					</Col>
				</Row>
			</Card>
	);
});

export default CartItemComponent;