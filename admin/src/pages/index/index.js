import React from 'react'
import styles from './index.module.less'
import Tab from '../../components/tab'
import Nav from '../../components/nav'
import Indexcont from './index-cont'
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Icon , message , Button , Dropdown} from 'antd';
const { Header, Sider, Content } = Layout;

class Index extends React.Component{
    constructor(){
        super();
        this.state={
            collapsed: false,
          };
    }
    toggle(){
        this.setState({collapsed: !this.state.collapsed})
    }
    componentDidMount(){
      var token = JSON.parse(localStorage.getItem('token'))
      if(token == null){
                this.props.history.replace('/login')
                console.log(this)
              }
    }
    render(){
        return(
            <Layout className={styles.admin}>
            <Nav></Nav>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed} className={styles.pt}> 
              <div className="logo" />
                <Tab></Tab>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle.bind(this)}
                />
              </Header>
              <Content
                style={{
                  // margin: '0 16px',
                  // padding: 24,
                  background: '#f3f3f3',
                  minHeight: 280,
                }}
              >
               {this.props.children}
              </Content>
            </Layout>
          </Layout>
        )
    }
}

export default withRouter(Index)