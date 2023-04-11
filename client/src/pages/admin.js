import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ModalItem from '../components/modals/ModalItem.js';
import ModalManufacturer from '../components/modals/ModalManufacturer.js';
import ModalType from '../components/modals/ModalType.js';

const Admin = () => {
	const [manVisible, setManVisible] = useState(false);
	const [itemVisible, setItemVisible] = useState(false);
	const [typeVisible, setTypeVisible] = useState(false);
	return (
		<Container className='d-flex flex-column'>
			<Button 
				variant={'outline-dark'} 
				className="mt-4 p-2"
				onClick={() => setTypeVisible(true)}>
				Добавить тип
			</Button>
			<Button 
				variant={'outline-dark'} 
				className="mt-4 p-2"
				onClick={() => setManVisible(true)}>
				Добавить изготовителя
			</Button>
			<Button 
				variant={'outline-dark'} 
				className="mt-4 p-2"
				onClick={() => setItemVisible(true)}>
				Добавить товар
			</Button>
			<ModalManufacturer show={manVisible} onHide={() => setManVisible(false)}/>
			<ModalType show={typeVisible} onHide={() => setTypeVisible(false)}/>
			<ModalItem show={itemVisible} onHide={() => setItemVisible(false)}/>
		</Container>
	);
};

export default Admin;