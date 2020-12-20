import React from 'react';
import $ from 'jquery'
import './create.css';
import { Button, Select, Input,Row, Col, message, Space,Typography } from 'antd';
import { Layout, Menu, Breadcrumb, Image ,Upload ,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider, } = Layout;
const { TextArea } = Input;

const { Option } = Select;

class CommodityDetails extends React.Component{
  constructor(props) {
    super(props);
    console.log(this.params)
    this.state = {
        dataOnShow: this.props.location.state.info,
    }
}

  render(){
    return(
    <Layout className="layout">
  
    <Header>
        <h3 style={{color:'white'}}>华园二手交易</h3>
    </Header>
    <Content style={{ padding: '30px 50px 3px 50px' }}>
      <div className="com-layout-content">
      <h1>{this.state.dataOnShow.commodityName}</h1>
        <div className="com-title-content">
        {this.state.dataOnShow.latestModified}
        </div>
      </div> 
      </Content>
    <Content style={{ padding: '0px 50px' }}>
      <div className="site-layout-content">
      <Row gutter={[0, 12]}> 
        <Col span={12}><img 
				      style={{height:250}}
				      src="https://s2.ax1x.com/2019/10/23/Kt2y1s.jpg"
				    /></Col>
        <Col span={12}>
        <Row gutter={[0, 12]}> 
        <Col span={7}><div style={{'letter-spacing':'20px','font-size':'17px'}}>价格：</div></Col>
        <Col span={7}><div style={{color:'#f00','font-size':'25px'}}>{this.state.dataOnShow.price}元</div></Col>
        </Row>
        <Row gutter={[0, 20]}> 
        <Col span={7}><div style={{'letter-spacing':'20px','font-size':'17px'}}>成色：</div></Col>
        <Col span={7}><div style={{'font-size':'17px'}}>{this.state.dataOnShow.oldLevel} </div></Col>
        </Row>
        <Row gutter={[0, 20]}>         
        <Col span={7}><div style={{'letter-spacing':'15px','font-size':'17px'}}>联系人：</div></Col>
        <Col span={7}><div style={{'font-size':'17px'}}> {this.state.dataOnShow.nickname}</div></Col>
        </Row>
        <Row gutter={[0, 20]}> 
        <Col span={7}><div style={{'letter-spacing':'10px','font-size':'17px'}}>联系方式：</div></Col>
        <Col span={7}><div style={{'font-size':'17px'}}> {this.state.dataOnShow.phoneNumber}</div></Col>
        </Row>
        <Row gutter={[0, 20]}> 
        <Col span={4}></Col>
        <Col span={7}><div style={{color:'#f00','font-size':'25px'}}> {this.state.dataOnShow.transactionType}</div></Col>
        </Row>
        </Col>
        </Row>
        <Row gutter={[0, 12]}> 
        <Col span={4}>详细描述</Col>
        <Col span={18}><Paragraph>
        {this.state.dataOnShow.recommend}
    </Paragraph></Col>
        </Row>
      </div> 
      </Content>
    </Layout>
    );  
  }
} 


export default CommodityDetails;



