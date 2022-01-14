import React from 'react';
import appsConfigs  from '../main/MainConfigs';
import { Redirect } from 'react-router-dom';
import homePage from '../main/home/HomeController';

const routes = [
	...appsConfigs.routes,
	{
		path: '/',
		exact: true,
		component: homePage
	},
	{
		component: () => <Redirect to="/errors/404" />
	}
];

export default routes;
