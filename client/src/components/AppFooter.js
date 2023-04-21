import React from 'react';
import { Container } from 'react-bootstrap';

const AppFooter = () => {
	return (
		<Container fluid sticky="bottom" bg="dark">
			Внимание: данное веб-приложение не является рабочим интернет-магазином, оно является тестовым проектом.
			Заказ товаров недоступен.
		</Container>
	);
};

export default AppFooter;