import React from 'react';
import { Container } from 'react-bootstrap';

const AppFooter = () => {
	return (
		<Container fluid className='bg-dark text-white' style={{padding: '30px', position: 'sticky', bottom: 0}}>
			Внимание: данное веб-приложение не является рабочим интернет-магазином, оно является тестовым проектом.
			Заказ товаров недоступен.
		</Container>
	);
};

export default AppFooter;