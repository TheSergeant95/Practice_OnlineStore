import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from '../index.js';

const TypeBar = observer(() => {
	const {item} = useContext(Context)
	return (
		<div>
			<ListGroup>
				<ListGroup.Item
					style={{cursor: 'pointer'}}
					active={!item.selectedType.id}
					onClick={() => item.setSelectedType({})}
					key={0}
				>
					Все типы товаров
				</ListGroup.Item>
				{item.types.map(type =>
					<ListGroup.Item 
						style={{cursor: 'pointer'}}
						active={type.id === item.selectedType.id}
						onClick={() => item.setSelectedType(type)}
						key={type.id}>
						{type.name}
					</ListGroup.Item>	
				)}
			</ListGroup>
		</div>
	);
});

export default TypeBar;