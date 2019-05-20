import Dashboard from '../pages/Dashboard/Dashboard'
import Table from '../pages/Table/Table'
import Editor from '../pages/Editor/Editor'

const routes = [
	{
		path: '/',
		icon: 'dashboard',
        name: 'menu.dashboard',
		component: Dashboard,
		hideInMenu: false,
	},
	{
		icon: 'dashboard',
        name: 'menu.tables',
        path: '/tables',
		component: Table,
		hideInMenu: false,
	},
	{
		icon: 'dashboard',
        name: 'menu.editor',
        path: '/editor',
		component: Editor,
		hideInMenu: false,
	},
	{
		icon: 'dashboard',
        name: 'menu.backups',
        path: '/backups',
		component: Dashboard,
		hideInMenu: false,
	},
	{
		icon: 'dashboard',
        name: 'menu.reserved.capacity',
        path: '/reserved-capacity',
		component: Dashboard,
		hideInMenu: false,
	},
	{
		icon: 'dashboard',
        name: 'menu.preferences',
        path: '/preferences',
		component: Dashboard,
		hideInMenu: false,
	}
]

export default routes