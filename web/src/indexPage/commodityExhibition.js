/*
商品展示组件
基本结构：
商品名称（大号加粗）
商品类型、交易类型、新旧程度（小标签）
价格
地点
详细介绍
发布者信息： 头像、昵称、发布时间
*/
import React from 'react';

import {
	Tag,
	Image
} from 'antd';

import {
	CameraOutlined,
	ShopOutlined,
	SearchOutlined,
	NumberOutlined
} from '@ant-design/icons';

function CommodityCard(props) {
	//console.log("props", props)
	return <div style={{display:'flow-root',paddingLeft:40,paddingRight:40,paddingTop:20,paddingBottom:10,borderBottom:'solid 1px #d7d8dc'}}>
			<div style={{float:'left'}}>
				<h3 style={{fontWeight:'bold'}}>{props.info.commodityName}</h3>
				<div style={{display:'flex',marginBottom:10,}}>
					<Tag icon={<CameraOutlined />} color="#55acee" style={{transform:'scale(0.9)'}}>
				      {props.info.objectType}
				    </Tag>
				    <Tag icon={<ShopOutlined />} color="#55acee" style={{transform:'scale(0.9)'}}>
				      {props.info.transactionType}
				    </Tag>
				    <Tag icon={<NumberOutlined />} color="#55acee" style={{transform:'scale(0.9)'}}>
				      {props.info.oldLevel}
				    </Tag>
			    </div>
			    <h4>价格：{props.info.price}元</h4>
			    <h4>地点：大学城</h4>
			    <h4>介绍：{props.info.recommend}</h4>
			    <div style={{display:'flex',marginTop:10}}>
				    <img src="https://s2.ax1x.com/2019/12/01/QePCTI.png" style={{borderRadius:50,width:30,height:30}} />
				    <div style={{display:'flex',marginTop:10,marginLeft:20,fontSize:12}}>
					    <h5 style={{fontWeight:'bold'}}>{props.info.nickname}&nbsp;</h5>
					    <h5>发布于{props.info.latestModified}</h5>  
			   		</div>  	
			    </div>		
		    </div>					    
		    <div style={{float:'right',margin:10}}>
		    	 <img 
				      style={{height:150,maxWidth:props.that.state.windowWidth/2}}
				      src="https://s2.ax1x.com/2019/10/23/Kt2y1s.jpg"
				    />
		    </div>		        
		</div>
}

class Exhibiton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: props.parent.state.windowWidth
		}
	}
	componentWillReceiveProps() {}
	render() {
		var data = this.props.parent.state.dataOnShow
		let cards = data.map((item) =>
			<CommodityCard info={item} key={item.latestModified} that={this}/>
		);
		return (
			<div style={{backgroundColor:'white',margin:10}}>
				{cards}
			</div>
		);
	}
}

export default Exhibiton;