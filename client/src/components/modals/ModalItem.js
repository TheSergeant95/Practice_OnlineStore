import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Dropdown, Modal, Row } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { createItem, fetchManufacturers, fetchTypes } from '../../http/itemAPI.js';
import { Context } from '../../index.js';

const ModalItem = observer(({show, onHide}) => {
	const {item} = useContext(Context)
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);
	useEffect(() => {
		fetchTypes().then(data => item.setTypes(data));
		fetchManufacturers().then(data => item.setManufacturers(data));
	}, [])
	
	const addInfo = () => {
		setInfo([...info, {prop: '', description: '', number: Date.now()}])
	}
	const removeInfo = (number) => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
	}

	const selectFile = e => {
		setFile(e.target.files[0])
	}

	const addItem = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', `${price}`);
		formData.append('img', file);
		formData.append('manufacturerId', item.selectedManufacturer.id);
		formData.append('typeId', item.selectedType.id);
		formData.append('info', JSON.stringify(info));
		createItem(formData).then(() => onHide());
	}


	return (
		<Modal
		show={show}
		onHide={onHide}
		centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
				Добавить товар
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>					
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{item.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{item.types.map(type => 
								<Dropdown.Item 
									key={type.id} 
									onClick={() => item.setSelectedType(type)}
								>
									{type.name}
								</Dropdown.Item>	
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{item.selectedManufacturer.name || "Выберите изготовителя"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{item.manufacturers.map(man => 
								<Dropdown.Item 
									key={man.id} 
									onClick={() => item.setSelectedManufacturer(man)}
								>
									{man.name}
								</Dropdown.Item>	
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className="mt-3" 
						placeholder={'Введите наименование товара'}
					/>
					<Form.Control
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
						className="mt-3" 
						placeholder={'Введите стоимость товара'}
						type="number"
					/>
					<Form.Control
						className="mt-3" 
						type="file"
						onChange={selectFile}
					/>
					<hr/>
					<Button
						variant={'outline-dark'}
						onClick={addInfo}>
							Добавить новое свойство
					</Button>
					{info.map(i =>
						<Row className='mt-3' key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.prop}
									onChange={(e) => changeInfo('prop', e.target.value, i.number)} 
									placeholder='Введите название свойства'
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={(e) => changeInfo('description', e.target.value, i.number)} 
									placeholder='Введите описание свойства'
								/>
							</Col>
							<Col md={4}>
								<Button 
									variant={'outline-danger'}
									onClick={() => removeInfo(i.number)}>
									Удалить
								</Button>
							</Col>
						</Row>	
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant={'outline-danger'} onClick={addItem}>Добавить</Button>
				<Button variant={'outline-success'} onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default ModalItem;