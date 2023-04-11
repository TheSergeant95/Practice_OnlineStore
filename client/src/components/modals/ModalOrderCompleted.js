import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalOrderCompleted = ({show, onHide}) => {
	return (
		<Modal
		show={show}
		onHide={onHide}
		centered
		>
			<Modal.Header 
			// closeButton
			>
				<Modal.Title id="contained-modal-title-vcenter">
					Заказ оформлен и оплачен
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Ожидайте получения заказа в течение нескольких дней.
			</Modal.Body>
		</Modal>
	);
};

export default ModalOrderCompleted;