import React from 'react';
import BasicLayout from './layouts/BasicLayout';
import defaultSettings from './defaultSettings'
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from './config/router.config';
import './App.less';

const App = () => (
	<Router>
		<BasicLayout 
			menuData={routes}
			{...defaultSettings}
		>
			{routes.map((r, i) => <Route exact path={r.path} component={r.component} /> )}
		</BasicLayout>
	</Router>
);

export default App;