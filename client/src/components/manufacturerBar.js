import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card'
import { Context } from '../index.js';

const ManufacturerBar = observer(() => {
	const {item} = useContext(Context)
	return (
		<div className='d-flex flex-wrap'>
			<Card
				key={0}
				style={{cursor: 'pointer'}}
				onClick={() => item.setSelectedManufacturer({})}
				border={!item.selectedManufacturer.id ? 'danger' : 'light'}
				className='p-3'
			>
					Все изготовители
			</Card>
			{item.manufacturers.map(man =>
				<Card
					key={man.id}
					style={{cursor: 'pointer'}}
					onClick={() => item.setSelectedManufacturer(man)}
					border={man.id === item.selectedManufacturer.id ? 'danger' : 'light'}
					className='p-3'>
					{man.name}
				</Card>	
			)}
		</div>
	);
});

export default ManufacturerBar;