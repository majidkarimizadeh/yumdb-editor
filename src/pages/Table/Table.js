import React, { Component } from 'react';
import i18n from '../../locales';
import { Table as AntdTable, Divider, Tag, Card, Button, Row, Col, Tabs } from 'antd';
import { request } from '../../lib/ajax';
import { withTranslation } from 'react-i18next';

import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/monokai';

const TabPane = Tabs.TabPane;

class Table extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			tableSource: [],
			showSplit: false,
			selectedTable: '',
			value: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onExecute = this.onExecute.bind(this)
		this.onTabChange = this.onTabChange.bind(this)
		this.executeQuery = this.executeQuery.bind(this)
	}

	onTabChange(index) {
		const { selectedTable } = this.state
		switch(index) 
		{
			case 'items' : 
			{
				this.executeQuery(`SELECT * FROM ${selectedTable}`)
				this.setState({value: `SELECT * FROM ${selectedTable}` })
			}
		}
	}

	onChange(value) {
		this.setState({ value })
	}

	onExecute() {
		const { value } = this.state
		this.executeQuery(value)
	}

	executeQuery(q) {

		request('Post', 'http://192.168.2.134:6095/exec', { q })
			.then( res => {
				let results = JSON.parse(res.results)
				let dataSource = results.map( (item, i) => {
					return {
						key: i,
					    name: item.name,
					    number: item.number,
					    birth: item.birthday,

					    key1: i,
					    name1: item.name,
					    number1: item.number,
					    birth1: item.birthday,

					    key2: i,
					    name2: item.name,
					    number2: item.number,
					    birth2: item.birthday,
					}
				})
				this.setState({ dataSource })
			})
	}

	componentDidMount() {
		request('Get', 'http://192.168.2.134:6095/tables')
		.then( res => {
			let tableSource = res.results.map( (item, i) => {
				return {
					key: i,
				    name: item,
				}
			})
			this.setState({ tableSource })
		})
	}

	render() 
	{
		const { t } = this.props
		const { tableSource, dataSource,  showSplit, selectedTable, value } = this.state

		const tableColumns = [
		  	{
			    title: 'Name',
			    dataIndex: 'name',
			    key: 'name',
			    render: text => <a onClick={() => this.setState({ showSplit: true, selectedTable: text})}>{text}</a>,
			    filters: tableSource.map( ds => { 
			    	return { 
				    	text: ds.name,
				    	value: ds.name
			    	}
			    }) ,
			    onFilter: (value, record) => record.name.indexOf(value) === 0,
			    sorter: (a, b) => a.name.length - b.name.length,
		  	}
		];

		const dataColumns = [
			{
			    title: 'Name',
			    dataIndex: 'name',
			    key: 'name',
			    width: 200,
			},
			{
			    title: 'Number',
			    dataIndex: 'number',
			    key: 'number',
			    width: 200,
			},
			{
			    title: 'Birthday',
			    dataIndex: 'birth',
			    key: 'birth',
			    width: 200,
			},

			{
			    title: 'Name 1',
			    dataIndex: 'name1',
			    key: 'name1',
			    width: 200,
			},
			{
			    title: 'Number 1',
			    dataIndex: 'number1',
			    key: 'number1',
			    width: 200,
			},
			{
			    title: 'Birthday 1',
			    dataIndex: 'birth1',
			    key: 'birth1',
			    width: 200,
			},

			{
			    title: 'Name 2',
			    dataIndex: 'name2',
			    key: 'name2',
			    width: 200,
			},
			{
			    title: 'Number 2',
			    dataIndex: 'number2',
			    key: 'number2',
			    width: 200,
			},
			{
			    title: 'Birthday 2',
			    dataIndex: 'birth2',
			    key: 'birth2',
			    width: 200,
			},
		]

	    return (
			<Row>
				<Col span={24} style={{height:'100vh'}}>
		    		<SplitterLayout percentage secondaryInitialSize={80}>
	    				<Card style={{height:'100vh'}}>
				        	<AntdTable 
				        		pagination={false}
								dataSource={tableSource} 
								columns={tableColumns}
							/>
						</Card>
		    			{showSplit &&
					        <Card style={{height:'100vh'}}>
					        	<h1>
					        		{selectedTable}
					        		<Button 
						        		onClick={() => this.setState({ showSplit: false})} 
						        		type="link"
						        	> 
						        		Close 
						        	</Button>
					        	</h1>

					        	<Tabs onChange={this.onTabChange} type="card">
								    <TabPane tab="Overview" key="1">
								     	Overview
								    </TabPane>
								    <TabPane tab="Items" key="items">
								    	
								    	<AceEditor
										  	placeholder=""
										  	mode="mysql"
										  	theme="monokai"
										  	name="ace-editor"
										  	onChange={this.onChange}
										  	fontSize={16}
										  	showPrintMargin={true}
										  	showGutter={true}
										  	highlightActiveLine={true}
										  	value={value}
										  	setOptions={{
										  		enableBasicAutocompletion: true,
										  		enableLiveAutocompletion: true,
										  		enableSnippets: true,
										  		showLineNumbers: true,
										  		tabSize: 2,
										  	}}
										  	style={{width: '100%', height:'85px', margin: '10px 0px'}}
										/>
										<Button 
							        		onClick={() => this.onExecute()} 
							        		type="primary"
							        	> 
							        		Execute
							        	</Button>
										<Divider />
										<div>
											<AntdTable 
												scroll={{ y: 240, x: 1800 }}
								        		pagination={false}
												dataSource={dataSource} 
												columns={dataColumns}
											/>
										</div>
								    </TabPane>
								    <TabPane tab="Metrics" key="3">
								    	Metrics
								    </TabPane>
								    <TabPane tab="Alarms" key="4">
								    	Alarms
								    </TabPane>
								    <TabPane tab="Capacity" key="5">
								    	Capacity
								    </TabPane>
								    <TabPane tab="Indexes" key="6">
								    	Indexes
								    </TabPane>
								    <TabPane tab="Global Tables" key="7">
								    	Global Tables
								    </TabPane>
								    <TabPane tab="Backups" key="8">
								    	Backups
								    </TabPane>
								    <TabPane tab="Triggers" key="9">
								    	Triggers
								    </TabPane>
								    <TabPane tab="Access Control" key="10">
								    	Access Control
								    </TabPane>
								    <TabPane tab="Tags" key="11">
								    	Tags
								    </TabPane>
								</Tabs>
				    		</Card>
			    		}
				    </SplitterLayout>
				</Col>
			</Row>
	    );
    }
};

export default withTranslation()(Table);