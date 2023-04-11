import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
// import Row from 'react-bootstrap/Row'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '../http/userAPI.js';
import { Context } from '../index.js';
import { LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE } from '../utils/consts';
const Auth = observer(() => {
	const {user} = useContext(Context)
	const location = useLocation();
	const navigate = useNavigate();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const click = async () => {
		try {
			let data;
			if(isLogin){
				data = await login(email, password)
			} else {
				data = await register(email, password)
			}
			user.setUser(user);
			user.setIsAuth(true);
			navigate(SHOP_ROUTE);
		} catch(e) {
			alert(e.response.data.message)
		}
		
	}

	return (
		<Container 
			className='d-flex justify-content-center align-items-center'
			style={{height: window.innerHeight - 54}}>
			<Card style={{width: 600}} className="p-5">
				<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						className='mt-2'
						placeholder='Введите e-mail...'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className='mt-2'
						placeholder='Введите пароль...'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
					/>
					<div className="d-flex justify-content-between mt-3 ps-3 pe-3">
						{isLogin ?
							<div>
								Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрироваться</NavLink>
							</div>
							:
							<div>
								Уже зарегистрированы? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
							</div>
						}
						<Button variant={'outline-success'}
							onClick={click}>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
					</div>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;