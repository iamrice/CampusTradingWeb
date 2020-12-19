import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import './index.css';
import SearchBlock from './indexPage/searchBlock';
import Exhibiton from './indexPage/commodityExhibition';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
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
            dataFromSelect: [],
            dataFromSearch: [], //如果输入栏清空这里应该=datafromfilter
            useSearch: false,
            useSelect: false,
            windowWidth: $(window).width()
        }
        this.url = {
            local: 'http://localhost:8000/',
            server: 'http://81.71.26.99/database/'
        }
        this.requestData();
        this.allData = [];
        /*this.props.history.push({
            pathname: "/search",
            state: {
                id: 1
            }
        })*/
    }
    render() {
        console.log(this.state.windowWidth)
        let index =
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

        return index;
    }
    requestData() {
        //在进入界面时获取数据库所有商品数据
        var that = this
        $.ajax({
            url: that.url.local + "queryAllCommoditys/",
            dataType: "json",
            success: function(data) {
                console.log("alldata", data)
                that.allData = data
                that.setState({
                    dataOnShow: data
                })
            }
        })
    }
    filterData() {
        var that = this
        let useSearch = this.state.useSearch
        let useSelect = this.state.useSelect
        console.log("filter: ", useSearch, useSelect)
        if (useSearch && useSelect) {
            var t = that.allData.filter((value) => {
                return (that.state.dataFromSelect.indexOf(value.commodityID) >= 0) && (that.state.dataFromSearch.indexOf(value.commodityID) >= 0);
            })
            console.log("use both", t)
            that.setState({
                dataOnShow: t
            })
        } else if (!useSearch && !useSelect) {
            that.setState({
                dataOnShow: that.allData
            })
        } else if (useSearch) {
            var t = that.allData.filter((value) => {
                return (that.state.dataFromSearch.indexOf(value.commodityID) >= 0);
            })
            console.log("use search", t)
            that.setState({
                dataOnShow: t
            })
        } else if (useSelect) {
            var t = that.allData.filter((value) => {
                return (that.state.dataFromSelect.indexOf(value.commodityID) >= 0);
            })
            console.log("use select", t)
            that.setState({
                dataOnShow: t
            })
        }
    }
    selectData(data) {
        var that = this
        var postData = new FormData();
        postData.append('condition', JSON.stringify(data))
        $.ajax({
            url: that.url.local + "queryForCommodity_select/",
            dataType: "json",
            type: "POST",
            async: false, //同步上传
            cache: false, //上传文件无需缓存
            processData: false, // 不处理数据
            contentType: false, // 不设置内容类型
            data: postData,
            success: function(res) {
                that.state.dataFromSelect = res
                that.state.useSelect = true
                console.log("select result", res, that.state.useSelect)
                that.filterData()
            }
        })
    }
    searchData(data) {
        var that = this
        var postData = new FormData();
        postData.append('context', data)
        $.ajax({
            url: that.url.local + "queryForCommodity_search/",
            dataType: "json",
            type: "POST",
            async: false, //同步上传
            cache: false, //上传文件无需缓存
            processData: false, // 不处理数据
            contentType: false, // 不设置内容类型
            data: postData,
            success: function(res) {
                that.state.dataFromSearch = res
                console.log("search result", res)
                that.filterData()
            }
        })
    }
};

ReactDOM.render(
    <Router>
        <Route path="/">
            <Route path="/index" exact component={ContainBox}/>
            <Route path="/search" component={SearchBlock}/>
            <Redirect path="/" to={{pathname:'/index'}} />
        </Route>
    </Router>,
    document.getElementById('container')
);

//export default ContainBox

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();