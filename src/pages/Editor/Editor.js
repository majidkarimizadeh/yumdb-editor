import React, { Component } from 'react';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/theme/monokai';


class Editor extends Component {

	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
		this.onChange = this.onChange.bind(this)
	}

	onChange(value) {
		this.setState({ value })
	}

	render() {
		const { value } = this.state

	    return ( 
	    	<Card>
	    		<h1>Editor</h1>
	    		<div>
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
					  	style={{width: '100%'}}
					/>
	    		</div>
	    	</Card>
	    );
	}
};

export default withRouter(withTranslation()(Editor));
