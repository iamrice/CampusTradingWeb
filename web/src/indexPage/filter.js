import React from 'react';

import {
	Button,
	Input
} from 'antd';

function ItemButton(props) {
	return (
		props.that.state.sizerItemChosen[props.groupName][props.itemName] ? (
			<Button style={{marginLeft:15,fontSize:10}} type='primary' key={props.itemName} onClick={()=> props.that.sizerItemClicked(props.groupName,props.itemName)}>{props.itemName}</Button>
		) : (
			<Button style={{marginLeft:15,fontSize:10}} type='text' key={props.itemName} onClick={()=>  props.that.sizerItemClicked(props.groupName,props.itemName)}>{props.itemName}</Button>
		)
	)
}

class Filter extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
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
		this.sizerItemClicked = this.sizerItemClicked.bind(this);
	}
	sizerItemClicked(groupName, itemName) {
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
		this.props.global.selectData(this.state.sizerItemChosen);
	}
	render() {
		let sizer = []
		var i = 0;
		for (var groupName in this.state.sizerItemChosen) {
			const buttons = [];
			var j = 0;
			for (var itemName in this.state.sizerItemChosen[groupName]) {
				buttons[j++] = <ItemButton key={itemName} groupName={groupName} itemName={itemName} that={this} />
			}
			sizer[i++] =
				<div key={groupName} style={{display:'flex',backgroundColor:'white',marginLeft:10,marginRight:10,borderBottom:'solid 1px rgb(231 232 236)'}} >
	                <div style={{marginLeft:40, marginRight:20,marginTop:10,marginBottom:5,display:'flex'}}>
	                    <h5 style={{color:'black',fontWeight:'bold',marginRight:20,marginTop:7}}>{groupName}</h5>
	                    {buttons}
	                </div>
	            </div>
		}
		return sizer;
	}
}


export default Filter;