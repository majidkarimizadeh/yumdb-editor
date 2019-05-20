import React, { Component } from 'react';
import i18n from '../../locales';
import { Table as AntdTable, Divider, Tag, Card } from 'antd';
import { request } from '../../lib/ajax';
import { withTranslation } from 'react-i18next';

class Table extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataSource: []
		}
	}

	componentDidMount() {
		request('Get', 'http://192.168.2.134:6095/tables')
		.then( res => {
			let dataSource = res.results.map( (item, i) => {
				return {
					key: i,
				    name: item,
				}
			})
			this.setState({ dataSource })
		})
	}

	render() 
	{
		const { t } = this.props
		const { dataSource } = this.state

		const columns = [
		  	{
			    title: 'Name',
			    dataIndex: 'name',
			    key: 'name',
			    render: text => <a onClick={() => alert(text)}>{text}</a>,
			    filters: [
			      	{
			        	text: 'T1',
			        	value: 't1',
			      	},
			      	{
			        	text: 'Person',
			        	value: 'person',
			      	},
			    ],
			    onFilter: (value, record) => record.name.indexOf(value) === 0,
			    sorter: (a, b) => a.name.length - b.name.length,
		  	}
		];

	    return (
	    	<Card bordered={false}>
    			<AntdTable dataSource={dataSource} columns={columns} />
    		</Card>
	    );
    }
};

export default withTranslation()(Table);
