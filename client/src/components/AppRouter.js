import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
// import { Context } from '../index.js';
import { authRoutes, publicRoutes, ProtectedRoute } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => {
	// const {user} = useContext(Context)
	//Routes - указываем несколько маршрутов (страницы: авторизация, регистрация, магазин)
	//Если ни один из этих маршрутов не отработает (введен некорректный адрес), то отработает самый последний, указанный в свиче.
	// const isAuth = false;
	return (
		<Routes>
			{authRoutes.map(({path, Component}) => 
				<Route key={path} path={path} element={
					<ProtectedRoute>
						{Component}
					</ProtectedRoute>
				} exact
			/>
			)}
			{publicRoutes.map(({path, Component}) => 
				<Route key={path} path={path} element={Component} exact/>
			)}
			<Route
       			path="/*"
        		element={<Navigate to={SHOP_ROUTE} replace />}/>
		</Routes>
	);
};

export default AppRouter;