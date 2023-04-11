import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../index.js';
import ItemComponent from './ItemComponent.js';

const ItemList = observer(() => {
	const {item} = useContext(Context)
	return (
		<Row className='d-flex'>
			{item.shopItems.map(i =>
				<ItemComponent key={i.id} itemCard={i}/>	
			)}
		</Row>
	);
});

export default ItemList;