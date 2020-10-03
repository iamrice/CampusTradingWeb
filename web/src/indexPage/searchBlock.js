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

const {
	Search
} = Input;

function ItemButton(props) {
	return (
		props.that.state.sizerItemChosen[props.groupName][props.itemName] ? (
			<Button style={{marginLeft:15,fontSize:10}} type='primary' key={props.itemName} onClick={(e)=> props.that.sizerItemClicked(props.groupName,props.itemName)}>{props.itemName}</Button>
		) : (
			<Button style={{marginLeft:15,fontSize:10}} type='text' key={props.itemName} onClick={(e)=>  props.that.sizerItemClicked(props.groupName,props.itemName)}>{props.itemName}</Button>
		)
	)
}

class SearchBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showSizer: true,
			sizerItemChosen: {}
		};
		this.sizerItemName = {
			'商品类型': ['全部', '家用电器', '数码产品', '教育文娱', '食品', '服饰箱包', '美容护肤', '运动相关', '其他'],
			'交易类型': ['全部', '出售', '求购'],
			'新旧程度': ['全部', '全新', '95成新', '9成新', '8成新', '7成新及以下']
		}
		for (var groupName in this.sizerItemName) {
			this.state.sizerItemChosen[groupName] = {};
			for (var i in this.sizerItemName[groupName]) {
				var itemName = this.sizerItemName[groupName][i]
				this.state.sizerItemChosen[groupName][itemName] = false;
			}
			this.state.sizerItemChosen[groupName]['全部'] = true
		}

		//函数
		this.sizerClicked = this.sizerClicked.bind(this);
		this.sizerItemClicked = this.sizerItemClicked.bind(this);
	}
	sizerClicked() {
		this.setState({
			showSizer: !this.state.showSizer
		})
	}
	sizerItemClicked(groupName, itemName, e) {
		if (itemName == '全部') {
			if (this.state.sizerItemChosen[groupName][itemName] == false) {
				for (var i in this.sizerItemName[groupName]) {
					var itemName = this.sizerItemName[groupName][i]
					this.state.sizerItemChosen[groupName][itemName] = false;
				}
				this.state.sizerItemChosen[groupName]['全部'] = true;
			} else {
				this.state.sizerItemChosen[groupName]['全部'] = false;
			}
		} else {
			this.state.sizerItemChosen[groupName][itemName] = !this.state.sizerItemChosen[groupName][itemName];
			this.state.sizerItemChosen[groupName]['全部'] = false;
		}
		this.setState({
			sizerItemChosen: this.state.sizerItemChosen
		})
		this.props.parent.filterData(this.state.sizerItemChosen);
	}
	render() {
		let arrowOfSizer = null;
		let sizer = null;
		const showSizer = this.state.showSizer;

		if (showSizer) {
			arrowOfSizer = <DownOutlined style={{marginTop:5}} />;
			sizer = []
			var i = 0;
			for (var groupName in this.state.sizerItemChosen) {
				const buttons = [];
				var j = 0;
				for (var itemName in this.state.sizerItemChosen[groupName]) {
					buttons[j++] = <ItemButton groupName={groupName} itemName={itemName} that={this} />
				}
				sizer[i++] =
					<div key={groupName} style={{display:'flex',backgroundColor:'white',marginLeft:10,marginRight:10,borderBottom:'solid 1px rgb(231 232 236)'}} >
		                <div style={{marginLeft:40, marginRight:20,marginTop:10,marginBottom:5,display:'flex'}}>
		                    <h5 style={{color:'black',fontWeight:'bold',marginRight:20,marginTop:7}}>{groupName}</h5>
		                    {buttons}
		                </div>
		            </div>
			}
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
	            <div style={{marginTop:10}}>
	            {sizer}
	            </div>
            </div>
		);
	}
}

export default SearchBlock;