import Dashboard from '../pages/Dashboard/Dashboard'
import Foo from '../pages/Foo/Foo'
import Bar from '../pages/Bar/Bar'

const routes = [
	{
		path: '/',
		icon: 'dashboard',
		name: 'Dashboard',
        locale: 'menu.dashboard',
		component: Dashboard,
		children: [
			{
				path: '/',
				icon: 'dashboard',
				name: 'Main',
		        locale: 'menu.dashboard',
				component: Dashboard,
			},
		]
	},
	{
		icon: 'dashboard',
        locale: 'menu.foo',
        name: 'Foo',
        path: '/foo',
		component: Foo
	},
	{
		icon: 'dashboard',
        locale: 'menu.bar',
        name: 'Bar',
        path: '/bar',
		component: Bar
	}
]

export default routes