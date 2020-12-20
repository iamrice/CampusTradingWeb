import React from 'react';
import $ from 'jquery'
import './create.css';
import { Button, Select, Input,Row, Col, message, Space } from 'antd';
import { Layout, Menu, Breadcrumb, Image ,Upload ,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider, } = Layout;
const { TextArea } = Input;

const { Option } = Select;

class Create extends React.Component{
  constructor(props) {
    super(props);
    
		this.state = {
      Item: {},
      
    };
    for (var i=0;i<6;i++)
    { 
      this.state.Item[i] = "dafault";
    }
    
    this.url = {
      local: 'http://localhost:8000/',
      server: 'http://81.71.26.99/database/'
  }
    this.buttonClicked = this.buttonClicked.bind(this);
    this.handleChange = this.selectChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.createCom = this.createCom.bind(this);

		//函数
		// this.sizerClicked = this.sizerClicked.bind(this);
		// this.sizerItemClicked = this.sizerItemClicked.bind(this);
  }

  buttonClicked(){
    console.log(this.state.Item[0]);//商品类型
    console.log(this.state.Item[1]);//交易类型
    console.log(this.state.Item[2]);//新旧程度
    console.log(this.state.Item[3]);//商品名字
    console.log(this.state.Item[4]);//商品价格
    console.log(this.state.Item[5]);//商品描述
    this.createCom(this.state.Item);
  }
  createCom(data) {
    var that = this
    var postData = new FormData()
    postData.append('context', JSON.stringify(data))

    $.ajax({
        url: this.url.local + "addCommodity/",
        dataType: "json",
        type: "POST",
        async: false, //同步上传
        cache: false, //上传文件无需缓存
        processData: false, // 不处理数据
        contentType: false, // 不设置内容类型
        data: postData,
        success: function(res) {
          console.log(res);
          that.successCreate();
        }
    })
    that.successCreate();
    this.props.history.push({
      pathname: "/index"
})  
    
    
}
  successCreate(){
    console.log("success");
    message.success('添加商品成功！');
  }
  selectChange(value) {
    this.state.Item[value[0]] = value.substr(1,value.length-1);
  }

  inputChange(event) {
    var iname = String(event.target.name);
    this.state.Item[event.target.name] = event.target.value;  
  }
  render(){
    return(
    <Layout className="layout">
  
  <Header>
        <h3 style={{color:'white'}}>华园二手交易</h3>
      </Header>
    <Content style={{ padding: '20px 200px' }}>
    
          <Image padding='50px' src="https://s3.ax1x.com/2020/12/15/rQMNGR.png"  ></Image>
          
      <div className="site-layout-content">
        
        <Row gutter={[0, 12]}>
        <Col span={4}>商品类型</Col>
        <Col span={7}><Select   defaultValue="请选择" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="0家用电器">家用电器</Option>
              <Option value="0数码产品">数码产品</Option>
              <Option value="0教育文娱">教育文娱</Option>
              <Option value="0食品">食品</Option>
              <Option value="0服饰箱包">服饰箱包</Option>
              <Option value="0美容护肤">美容护肤</Option>
              <Option value="0运动相关">运动相关</Option>
              <Option value="0其他">其他</Option>
            </Select></Col>
        </Row>
        <Row gutter={[0, 12]}> 
        
        <Col span={4}>交易类型</Col>
        <Col span={7}><Select defaultValue="请选择" style={{ width: 120 }} onChange={this.handleChange} >
              <Option value="1出售">出售</Option>
              <Option value="1求购">求购</Option>
            </Select></Col>
        </Row>
        <Row gutter={[0, 12]}> 
        
        <Col span={4}>新旧程度</Col>
        <Col span={7}><Select defaultValue="请选择" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="2全新">全新</Option>
              <Option value="295成新">95成新</Option>
              <Option value="29成新">9成新</Option>
              <Option value="28成新">8成新</Option>
              <Option value="27成新及以下">7成新及以下</Option>
            </Select></Col>
        </Row >
        <Row gutter={[0, 12]}> 
        
        <Col span={4}>商品名称</Col>
        <Col span={7}><Input placeholder="输入商品名称" name = "3" onChange={this.inputChange}/></Col>
        </Row>
        <Row gutter={[0, 12]}> 
        <Col span={4}>商品定价</Col>
        <Col span={7}><Input placeholder="输入商品价格" name = "4" onChange={this.inputChange}/></Col>
        </Row>
        <Row gutter={[0, 30]}> 
        <Col span={4}>详细描述</Col>
        <Col span={18}><TextArea rows={4} placeholder="输入详细描述" name = "5" onChange={this.inputChange} /></Col>
        </Row>
        <Row gutter={[0, 12]}> 
        <Col span={8}>上传图片</Col>
        <Col span={8}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            
          >
          <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Col>
        </Row>
        <Row gutter={[0, 12]}> 
        <Col span={8}></Col>
        <Col span={7}><Button type="primary" onClick={this.buttonClicked} >创建商品</Button></Col>
        </Row>
        
      </div>
        
      </Content>

    </Layout>
    );  
  }
} 


export default Create;
