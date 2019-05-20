import React, { Component } from 'react';
import i18n from '../../locales';
import { Table as AntdTable, Divider, Tag, Card, Button, Row, Col, Tabs, Icon, Collapse, Menu, Dropdown } from 'antd';
import { request } from '../../lib/ajax';
import { withTranslation } from 'react-i18next';

import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/monokai';

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

class Table extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataSource: [],
			tableSource: [],
			showSplit: false,
			selectedTable: '',
			value: '',
			verticalSplit: false,
			scrollY: 200,
			isDataLoading: false
		}
		this.onChange = this.onChange.bind(this)
		this.onExecute = this.onExecute.bind(this)
		this.onTabChange = this.onTabChange.bind(this)
		this.executeQuery = this.executeQuery.bind(this)
		this.onTableSelect = this.onTableSelect.bind(this)
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

	onTableSelect(text) {
		let query = `SELECT * FROM ${text}` 
		this.setState({ 
			showSplit: true, 
			selectedTable: text,
			value: query
		})
		this.executeQuery(query)
	}

	onChange(value) {
		this.setState({ value })
	}

	onExecute() {
		const { value } = this.state
		this.executeQuery(value)
	}

	executeQuery(q) {

		this.setState({ isDataLoading: true })
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
				setTimeout( () => {
					this.setState({ dataSource, isDataLoading: false })
				}, 1000) 
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
		const { 
			tableSource, 
			dataSource, 
			showSplit,
			selectedTable,
			value,
			verticalSplit,
			scrollY,
			isDataLoading
		} = this.state

		const tableColumns = [
		  	{
			    title: 'Name',
			    dataIndex: 'name',
			    key: 'name',
			    render: text => <a onClick={() => this.onTableSelect(text)}>{text}</a>,
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
			    sorter: (a, b) => a.name.length - b.name.length,
			},
			{
			    title: 'Number',
			    dataIndex: 'number',
			    key: 'number',
			    width: 200,
			    sorter: (a, b) => a.number - b.number,
			},
			{
			    title: 'Birthday',
			    dataIndex: 'birth',
			    key: 'birth',
			    width: 200,
			    sorter: (a, b) => a.birth.length - b.birth.length,
			},

			{
			    title: 'Name 1',
			    dataIndex: 'name1',
			    key: 'name1',
			    width: 200,
			    sorter: (a, b) => a.name1.length - b.name1.length,
			},
			{
			    title: 'Number 1',
			    dataIndex: 'number1',
			    key: 'number1',
			    width: 200,
			    sorter: (a, b) => a.number1 - b.number1,
			},
			{
			    title: 'Birthday 1',
			    dataIndex: 'birth1',
			    key: 'birth1',
			    width: 200,
			    sorter: (a, b) => a.birth1.length - b.birth1.length,
			},

			{
			    title: 'Name 2',
			    dataIndex: 'name2',
			    key: 'name2',
			    width: 200,
			    sorter: (a, b) => a.name2.length - b.name2.length,
			},
			{
			    title: 'Number 2',
			    dataIndex: 'number2',
			    key: 'number2',
			    width: 200,
			    sorter: (a, b) => a.number2 - b.number2,
			},
			{
			    title: 'Birthday 2',
			    dataIndex: 'birth2',
			    key: 'birth2',
			    width: 200,
			    sorter: (a, b) => a.birth2.length - b.birth2.length,
			},
		]

	    return (
			<Row>
				<Col span={24} style={{height:'100vh'}}>
		    		<SplitterLayout vertical={verticalSplit} percentage secondaryInitialSize={80}>
	    				<Card style={{height:'100vh'}}>
				        	<AntdTable 
				        		pagination={false}
								dataSource={tableSource} 
								columns={tableColumns}
							/>
						</Card>
		    			{showSplit &&
					        <Card style={{height:'100vh'}}>
					        	<Row>
					        		<Col span={12}>
					        			<h1>
							        		{selectedTable}
							        		<Button 
								        		onClick={() => this.setState({ showSplit: false})} 
								        		type="link"
								        	> 
								        		Close 
								        	</Button>
							        	</h1>
					        		</Col>
					        		<Col span={12} style={{textAlign:'right'}}>
					        			<div>
					        				<ButtonGroup>
										      	<Button type={verticalSplit ? 'primary' : 'default'} onClick={() => this.setState({ verticalSplit:true })}>
										      		Vertical
										      	</Button>
										      	<Button type={!verticalSplit ? 'primary' : 'default'} onClick={() => this.setState({ verticalSplit:false })}>
										      		Horizontal
										      	</Button>
										    </ButtonGroup>
										    <Button style={{marginLeft: '10px'}} icon="question-circle" />
					        			</div>
					        		</Col>
					        	</Row>

					        	<Tabs onChange={this.onTabChange} type="card">
								    <TabPane tab="Overview" key="1">
								     	Overview
								    </TabPane>
								    <TabPane tab="Items" key="items">
								    	<Row>
								    		<Col span={12} style={{marginBottom:'10px'}}> 
							    				<Button 
							    					style={{marginRight: '10px'}}
									        		onClick={() => this.setState({
									        			value: `INSERT INTO ${selectedTable} () VALUES ()`
									        		})} 
									        		type="primary"
									        	> 
									        		Create Item
									        	</Button>

									        	<Dropdown overlay={
									        		<Menu onClick={(menu) => alert(menu.key)}>
													    <Menu.Item key="1">
													      	<Icon type="export" />
													      	Export
													    </Menu.Item>
													    <Menu.Item key="2">
													      	<Icon type="delete" />
													      	Delete
													    </Menu.Item>
													</Menu>
									        	}>
											      	<Button>
											        	Action <Icon type="down" />
											      	</Button>
											    </Dropdown>

							    			</Col>
							    			<Col span={12} style={{textAlign:'right', marginBottom:'10px'}}> 
							    				<Button onClick={() => this.executeQuery(`SELECT * FROM ${selectedTable}`)} loading={isDataLoading} icon="sync" />
							    			</Col>
		        						</Row>
								    	<Collapse 
								    		onChange={(activeIndex) => this.setState({
								    			scrollY: (activeIndex ? 200 : 320)
								    		}) }
								    		bordered={false}
								    		accordion={true}
								    		defaultActiveKey={['1']}
								    	>
										    <Panel 
										    	header={
										    		<Row>
										    			<Col span={12}> 
										    				Scan Table " {selectedTable} " 
										    			</Col>
										    			<Col span={12} style={{textAlign:'right'}}> 
										    				{dataSource.length} Items found
										    			</Col>
					        						</Row>
										    	}
										    	key="1"
										    	style={{
												  	background: '#cfd8dc',
												  	borderRadius: 4,
												  	marginBottom: 24,
												  	border: 0,
												  	overflow: 'hidden',
												}}
										    >
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
												<div style={{textAlign:'right'}}>
													<Button 
														loading={isDataLoading}
										        		onClick={() => this.onExecute()} 
										        		type="primary"
										        	> 
										        		Execute
										        	</Button>
									        	</div>
										    </Panel>
									  	</Collapse>
										<AntdTable 
											loading={isDataLoading}
											scroll={{ y: scrollY, x: 1800 }}
							        		pagination={false}
											dataSource={dataSource} 
											columns={dataColumns}
										/>
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