import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import './index.css';
import SearchBlock from './indexPage/searchBlock';
import Exhibiton from './indexPage/commodityExhibition';
import * as serviceWorker from './serviceWorker';
import {
    Layout,
} from 'antd';

const {
    Header,
    Footer,
    Sider,
    Content
} = Layout;

//主页面在此完成

class ContainBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOnShow: [],
            windowWidth: $(window).width()
        }
        this.requestData();
        this.allData = [];
    }
    requestData() {
        //在进入界面时获取数据库所有商品数据
        var that = this
        $.ajax({
            url: "http://localhost:8000/queryAllCommoditys/",
            dataType: "json",
            success: function(data) {
                console.log(data)
                that.allData = data
                that.setState({
                    dataOnShow: data
                })
            }
        })
    }
    filterData(data) {
        //根据筛选条件的改变重新加载商品数据
        //正常来说只需要从当前所有数据里面做筛选即可，但考虑到这个是数据库作业，
        //所以打算直接请求后台，用数据库语言来筛选（其实也是因为懒得在js写筛选）
        var that = this
        var postData = new FormData();
        postData.append('condition', JSON.stringify(data))
        $.ajax({
            url: "http://localhost:8000/queryForCommodity/",
            dataType: "json",
            type: "POST",
            async: false, //同步上传
            cache: false, //上传文件无需缓存
            processData: false, // 不处理数据
            contentType: false, // 不设置内容类型
            data: postData,
            success: function(res) {
                console.log(res)
                var t = that.allData.filter((value) => {
                    return (res.indexOf(value.commodityID) >= 0);
                })
                console.log(t)
                that.setState({
                    dataOnShow: t
                })
            }
        })
    }
    render() {
        console.log(this.state.windowWidth)
        return (
            <Layout className="site-page-header-wrapper">
              <Header>
                <h3 style={{color:'white'}}>华园二手交易</h3>
              </Header>
              <Layout>
              <Content>
                <SearchBlock parent={this} />
                <Exhibiton parent={this} />
              </Content>
              </Layout>
              <Footer></Footer>
            </Layout>
        );
    }
};

ReactDOM.render(
    <ContainBox/>,
    document.getElementById('container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();