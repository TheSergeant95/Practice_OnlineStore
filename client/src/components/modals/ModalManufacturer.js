import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createManufacturer } from '../../http/itemAPI';

const ModalManufacturer = ({show, onHide}) => {
	
	const [value, setValue] = useState('');
	
	const addManufacturer = () => {
		createManufacturer({name: value}).then(data => {
			setValue('');
			onHide();
		})
	}
	
	return (
		<Modal
		show={show}
		onHide={onHide}
		centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
				Добавить изготовителя
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control 
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={'Введите наименование изготовителя'}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant={'outline-danger'} onClick={addManufacturer}>Добавить</Button>
				<Button variant={'outline-success'} onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalManufacturer;