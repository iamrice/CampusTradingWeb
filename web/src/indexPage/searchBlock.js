import React from 'react';
import ReactDOM from 'react-dom';

import {
	Button,
	Input
} from 'antd';
import {
	AudioOutlined,
	DownOutlined,
	UpOutlined
} from '@ant-design/icons';

const {
	Search
} = Input;

class SearchBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSizer: true,
			objectTypeChosen: [],
			transactionTypeChosen: [false, false]
		};
		this.sizerClicked = this.sizerClicked.bind(this);
		this.objectTypeList = ['家用电器', '数码产品', '教育文娱', '食品', '服饰箱包', '美容护肤', '运动相关', '其他'];
		this.transactionType = ['出售', '求购'];
		for (var item = 0; item < this.objectTypeList.length; item++) {
			this.state.objectTypeChosen[this.objectTypeList[item]] = false;
		}
		this.objectTypeClick = this.objectTypeClick.bind(this);
		this.transactionTypeClick = this.transactionTypeClick.bind(this);
	}
	sizerClicked() {
		this.setState({
			showSizer: !this.state.showSizer
		})
	}
	objectTypeClick(id) {
		if (this.state.objectTypeChosen[id])
			console.log(id);
		this.state.objectTypeChosen[id] = !this.state.objectTypeChosen[id];
		this.setState({
			objectTypeChosen: this.state.objectTypeChosen
		})

	}
	transactionTypeClick(id) {
		this.state.transactionTypeChosen[id] = !this.state.transactionTypeChosen[id];
		this.setState({
			transactionTypeChosen: this.state.transactionTypeChosen
		})

	}
	render() {
		let arrowOfSizer = null;
		let sizer = null;
		const showSizer = this.state.showSizer;
		const objectTypeList = this.objectTypeList;
		const objectTypeChosen = this.state.objectTypeChosen;
		const objectTypes = objectTypeList.map((objectType) =>
			objectTypeChosen[objectType] ? (
				<Button style={{marginLeft:15,fontSize:10}} type='primary' id={objectType} onClick={(e)=> this.objectTypeClick(objectType)}>{objectType}</Button>
			) : (
				<Button style={{marginLeft:15,fontSize:10}} type='text' id={objectType} onClick={(e)=> this.objectTypeClick(objectType)}>{objectType}</Button>
			)
		);
		const transactionType = this.transactionType;
		const transactionTypeChosen = this.state.transactionTypeChosen;
		const transactionTypes = transactionType.map((item) =>
			transactionTypeChosen[item] ? (
				<Button  style={{marginLeft:15,fontSize:10}} type='primary' id={item} onClick={(e)=> this.transactionTypeClick(item)}>{item}</Button>
			) : (
				<Button style={{marginLeft:15,fontSize:10}} type='text' id={item} onClick={(e)=> this.transactionTypeClick(item)}>{item}</Button>
			)
		)
		if (showSizer) {
			arrowOfSizer = <DownOutlined style={{marginTop:5}} />;
			sizer =
				<div>
					<div style={{display:'flex',backgroundColor:'white',marginTop:2,marginLeft:10,marginBottom:10,marginRight:10}} >
	                    <div style={{marginLeft:40, marginRight:20,marginTop:10,marginBottom:5,display:'flex'}}>
	                        <h5 style={{color:'black',fontWeight:'bold',marginRight:20,marginTop:7}}>商品类型</h5>
	                        {objectTypes}
	                    </div>
	                </div>
	                <div style={{display:'flex',backgroundColor:'white',marginTop:2,marginLeft:10,marginBottom:10,marginRight:10}} >
	                	<div style={{marginLeft:40, marginRight:20,marginTop:10,marginBottom:5,display:'flex'}}>
	                        <h5 style={{color:'black',fontWeight:'bold',marginRight:20,marginTop:7}}>交易类型</h5>
	                        {transactionTypes}
	                    </div>
	                </div>
                </div>;
		} else {
			arrowOfSizer = <UpOutlined style={{marginTop:5}} />;
		}
		return (
			<div>
	            <div style={{display:'flex',backgroundColor:'white',marginTop:10,marginLeft:10,marginBottom:10,marginRight:10}} >
	                <Search
	                  placeholder="input search text"
	                  onSearch={value => console.log(value)}
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
	            {sizer}
            </div>
		);
	}
}

export default SearchBlock;