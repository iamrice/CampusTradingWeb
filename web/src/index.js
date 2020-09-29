import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchBlock from './indexPage/searchBlock';
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
    }

    render() {

        return (
            <Layout className="site-page-header-wrapper">
              <Header>
                <h3 style={{color:'white'}}>华园二手交易</h3>
              </Header>
              <Layout>
              <Content>
                <SearchBlock />
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