import React from 'react';
import { Container } from 'react-bootstrap';

const AppFooter = () => {
	return (
		<Container height={40} fluid className='bg-dark text-white' style={{padding: '0 50px', position: 'fixed', bottom: 0, zIndex: 4}}>
			Внимание: данное веб-приложение не является рабочим интернет-магазином, оно является тестовым проектом.
			Заказ товаров недоступен.
		</Container>
	);
};

export default AppFooter;