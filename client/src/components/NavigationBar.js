import React, { useContext, useEffect } from 'react';
import { Context } from '../index.js';
import {Navbar, Container, Nav, Button, Image} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts.js';
import {observer} from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/shopping_cart.svg'
import { fetchCart, fetchCartItems } from '../http/itemAPI.js';
const NavigationBar = observer(() => { //чтобы панель перерендерилась в режиме реального времени
	const {user, item} = useContext(Context)
	const navigate = useNavigate();
	useEffect(() => {
		if(user.isAuth){
		  fetchCart().then(data => {
			if(user.isAuth){
			  item.setCart(data)
			}
		  })
		  fetchCartItems()
		  .then(data => {
			if(user.isAuth){
			  item.updateCartInfo(data)
			}
		  })
		}
	  }, [user.isAuth])

	useEffect(() => {
        const prices = [];
		if(item.cartItems.length > 0 && item.items.length > 0){
			item.cartItems.forEach(entry => {
				const itemPrice = item.items.find(item => item.id === entry.itemId).price;
				prices.push(itemPrice * entry.quantity)
			})
		}
        item.setCartPrice(prices.reduce((a, b) => a + b, 0));
        
	}, [item.cartItems])
	
	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
		user.setIsAdmin(false);
		localStorage.removeItem('token')
		navigate(SHOP_ROUTE)
	}

	return (
		<>
			<Navbar sticky="top" bg="dark" variant="dark">
				<Container>
						<NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Linen Store</NavLink>
						{user.isAuth ? 
						<Nav 
							className="ml-auto" 
							style={{color: 'white'}}
						>
							<Button className='d-flex justify-content-center align-items-center me-2' variant='dark' onClick={() => navigate(CART_ROUTE)}>
								<div className='me-3'>{item.cartPrice} руб.</div>
								<Image  width={40} height={40} src={cart}/>
							</Button>
							{user.isAdmin ?
							<Button 
								variant='outline-light' 
								onClick={() => navigate(ADMIN_ROUTE)}
							>
								Администраторская
							</Button>
							:
							null
							}
							<Button 
								variant='outline-light' 
								onClick={() => logOut()} 
								className='ms-2'
							>
								Выйти
							</Button>
						</Nav>
						:
						<Nav className="ml-auto" style={{color: 'white'}}>
							<Button variant='outline-light' className='ms-2' onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
						</Nav>
						}
				</Container>
			</Navbar>
			<Container height={40} fluid className='bg-dark text-white' style={{padding: '0 100px', zIndex: 4}}>
					Внимание: данное веб-приложение не является рабочим интернет-магазином, оно является тестовым проектом.
					Заказ товаров недоступен.
			</Container>
		</>
	);
});

export default NavigationBar;