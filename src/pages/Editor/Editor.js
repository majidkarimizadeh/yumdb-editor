import React, { Component } from 'react';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class Editor extends Component {

	render() {
	    return ( 
	    	<Card>
	    		<h1>Editor</h1>
	    	</Card>
	    );
	}
};

export default withRouter(withTranslation()(Editor));
