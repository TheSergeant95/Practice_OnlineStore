import React, { useContext, useEffect } from 'react';
import Container  from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import ManufacturerBar from '../components/manufacturerBar.js';
import TypeBar from '../components/TypeBar.js';
import ItemList from '../components/ItemList.js';
import { observer } from 'mobx-react-lite';
import { Context } from '../index.js';
import { fetchItems, fetchManufacturers, fetchTypes } from '../http/itemAPI.js';
import Pages from '../components/Pages.js';

const Shop = observer(() => {
	const {item} = useContext(Context)
	useEffect(() => {
		fetchTypes().then(data => item.setTypes(data));
		fetchManufacturers().then(data => item.setManufacturers(data));
		fetchItems(null, null, 1, 6).then(data => {
			item.setShopItems(data.rows)
			item.setItems(data.rows)
			item.setTotalCount(data.count)
		});	
	}, [])

	useEffect(() => {
		fetchItems(item.selectedType.id, item.selectedManufacturer.id, item.page, 12).then(data => {
			item.setShopItems(data.rows)
			item.setTotalCount(data.count)
		});
	}, [item.page, item.selectedType, item.selectedManufacturer])

	return (
		<Container>
			<Row className='mt-2'>
				<Col md={3}>
					<TypeBar/>
				</Col>
				<Col md={9}>
					<ManufacturerBar/>
					<ItemList/>
					<Pages/>
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;