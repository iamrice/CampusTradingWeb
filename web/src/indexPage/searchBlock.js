import React from 'react';

import {
	Button,
	Input
} from 'antd';
import {
	AudioOutlined,
	DownOutlined,
	UpOutlined
} from '@ant-design/icons';
import Filter from './filter'

const {
	Search
} = Input;



class SearchBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSizer: false,
		};

		//函数
		this.sizerClicked = this.sizerClicked.bind(this);
	}
	sizerClicked() {
		this.setState({
			showSizer: !this.state.showSizer
		})
		if (!this.state.showSizer)
			this.props.parent.state.useSelect = this.state.showSizer
		this.props.parent.filterData()
	}
	inputSearch(context) {
		console.log("get context:",context)
		if (context == '') {
			this.props.parent.state.useSearch = false
			this.props.parent.filterData()
		} else {
			this.props.parent.state.useSearch = true
			this.props.parent.searchData(context)
		} 
	}
	render() {
		let arrowOfSizer = null;
		let sizer = null;
		const showSizer = this.state.showSizer;

		if (showSizer) {
			arrowOfSizer = <DownOutlined style={{marginTop:5}} />;
			sizer = <Filter global={this.props.parent}></Filter>
		} else {
			arrowOfSizer = <UpOutlined style={{marginTop:5}} />;
		}

		return (
			<div>
	            <div style={{display:'flex',backgroundColor:'white',marginTop:10,marginLeft:10,marginBottom:10,marginRight:10}} >
	                <Search
	                  placeholder="input search text"
	                  onSearch={value => this.inputSearch(value)}
	                  enterButton
	                  style={{ width: 600 , height: 40, marginTop:25,marginBottom:20,marginLeft:40}}
	                />
	                <Button style={{marginLeft:50,marginTop:25}} onClick={this.sizerClicked}>
	                    <div style={{display:'flex'}}>
	                        {arrowOfSizer}
	                        <h5 style={{marginLeft:9,marginTop:2}}>高级筛选</h5>
	                    </div>
	                </Button>
	            </div>
	            <div style={{marginTop:10}}>
	            {sizer}
	            </div>
            </div>
		);
	}
}

export default SearchBlock;