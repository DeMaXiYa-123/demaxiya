import React from 'react'
import styles from './index.module.less'
import Tab from '../../components/tab'
import Nav from '../../components/nav'
import { Layout, Menu, Icon , message , Button , Dropdown} from 'antd';
const { Header, Sider, Content } = Layout;

class Index extends React.Component{
    constructor(){
        super();
        this.state={
            collapsed: false,
            menu : (
              <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                  <Icon type="user" />
                  个人信息
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="user" />
                  个人设置
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="user" />
                  退出登录
              </Menu.Item>
              </Menu>
            )
          };
    }
    toggle(){
        this.setState({collapsed: !this.state.collapsed})
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
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
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

export default Index