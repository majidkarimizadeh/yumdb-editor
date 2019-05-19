import Dashboard from '../pages/Dashboard/Dashboard'
import Foo from '../pages/Foo/Foo'
import Bar from '../pages/Bar/Bar'

const routes = [
	{
		path: '/',
		icon: 'dashboard',
        name: 'menu.dashboard',
		component: Dashboard,
		hideInMenu: false,
		children: [
			{
				path: '/',
				icon: 'dashboard',
		        name: 'menu.dashboard',
				component: Dashboard,
				hideInMenu: false,
			},
		]
	},
	{
		icon: 'dashboard',
        name: 'menu.foo',
        path: '/foo',
		component: Foo,
		hideInMenu: false,
	},
	{
		icon: 'dashboard',
        name: 'menu.bar',
        path: '/bar',
		component: Bar,
		hideInMenu: false,
	}
]

export default routes