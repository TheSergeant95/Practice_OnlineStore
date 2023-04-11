import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router-dom';
import { Context } from '../index.js';
import ratingStar from '../assets/icon_page_rating.svg';
import StarRating from '../components/rating/RatingStarComponent';
import { addCartItem, createRating, fetchCartItems, fetchOneItem, getRating } from '../http/itemAPI.js';

const ItemPage = observer(() => {
	const [itemCard, setItem] = useState({info: []});
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const [rating, setRating] = useState(0);
	const [itemRating, setItemRating] = useState(0);
	const [loadingRate, setLoadingRate] = useState(true)
	const [addToCartLabel, setAddToCartLabel] = useState('Добавить в корзину');

	const {user, item} = useContext(Context)

	const addRating = (rating) => {
		createRating(id, rating).then(() => fetchOneItem(id)).then(data => {
			setRating(data.rating)
		})
	}

	const addToCart = () => {
		addCartItem(id, 1)
		.then(() => fetchCartItems())
		.then(data => {
		  if(user.isAuth){
			item.setCartItems(data.rows)
			item.setCartItemCount(0)
			item.cartItems.forEach(cartItem => {
				item.setCartItemCount(item.cartItemCount + cartItem.quantity)
			})
		  }
		})
		.then(()=> {
			setAddToCartLabel('Добавлено в корзину');
			setTimeout(() => {
				setAddToCartLabel('Добавить в корзину')
			}, 1500)
		})
	}

	useEffect(() => {
		
		fetchOneItem(id).then(data => {
			setRating(data.rating)
			setItem(data)
		})
		.finally(() => setLoading(false));
	}, [])

	useEffect(()=> {
		getRating(id).then(data => {
			if(data){
				setItemRating(data)
			} else {
				setItemRating(0)
			}

		}).finally(() => setLoadingRate(false));
	}, [])
	
	return (
		<Container className='mt-3'>
			<Row>
				<Col md={4}>
					{loading ? 
						<Spinner animation="grow"/> 
						: 
						<Image 
							className='m-1' 
							width={300} 
							height={300} 
							src={process.env.REACT_APP_API_URL + itemCard.img}
						/>
					}
				</Col>
				<Col md={4}>
					<Row className='d-flex flex-column align-items-center'>
						<h2 style={{textAlign: 'center'}}>{itemCard.name}</h2>
						
					</Row>
				</Col>
				<Col md={4}>
					<Card className='d-flex flex-column align-items-center justify-content-around'
					style={{width: 350, height: 400, fontSize: 32, border: '5px solid lightgray'}}>
						<h3>От: {itemCard.price} руб.</h3>
						<div
							className='d-flex align-items-center justify-content-center'
							style={{background: `url(${ratingStar}) no-repeat center center`, width:140, height: 140, backgroundSize: 'contain', fontSize: 28}}
						>
							{rating}/5	
						</div>
						{user.isAuth 
						?
							loadingRate ? 'Loading...' : <StarRating defaultState={itemRating.rate} onChangeValue={(value) => addRating(value)} labelText={()=> 'Оценить товар:'}/>
						:
						null }
						{user.isAuth 
						?
						<Button className='mb-3' variant={'outline-dark'} onClick={addToCart}>{addToCartLabel}</Button>
						:
						<div style={{fontSize: '20px', padding: '0 20px'}} className='mb-3'>Авторизуйтесь, чтобы добавить товар в корзину или поставить ему оценку.</div>}
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column m-3'>
				<h1>Характеристики</h1>
				{itemCard.info.map((info, index) =>
					<Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
						{info.prop}: {info.description}
					</Row>	
				)}
			</Row>
		</Container>
	);
});

export default ItemPage;