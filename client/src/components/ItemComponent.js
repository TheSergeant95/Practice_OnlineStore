import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/icon_rating.svg'
import { useNavigate } from 'react-router-dom';
import { ITEM_ROUTE } from '../utils/consts';
import { Context } from '../index.js';

const ItemComponent = ({itemCard}) => {
	let navigate = useNavigate();
	const [manufacturer, setManufacturer] = useState('')
	const {item} = useContext(Context)
	useEffect(()=> {
		const man = item.manufacturers.find(m => m.id === itemCard.manufacturerId);
		const manName = !man ? 'Loading...' : man.name;
		setManufacturer(manName)
	}, [])


	return (
		<Col md={3} className='mt-3' onClick={() => navigate(ITEM_ROUTE + '/' + itemCard.id)}>
			<Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
				<Image width={150} height={150} src={process.env.REACT_APP_API_URL + itemCard.img}/>
				<div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
					<div>{manufacturer}</div>
					<div className='d-flex align-items-center'>
						<div>{itemCard.rating}/5</div>
						<Image className='ms-1' width={20} height={20} src={star}/>
					</div>
				</div>
				<div>{itemCard.name}</div>
				<div>От: {itemCard.price} р.</div>
			</Card>
		</Col>
	);
};

export default ItemComponent;