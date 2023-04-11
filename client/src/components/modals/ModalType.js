import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { createType } from '../../http/itemAPI';

const ModalType = ({show, onHide}) => {
	const [value, setValue] = useState('');
	
	const addType = () => {
		createType({name: value}).then(data => {
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
				Добавить тип
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control 
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={'Введите название типа'}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant={'outline-danger'} onClick={addType}>Добавить</Button>
				<Button variant={'outline-success'} onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalType;