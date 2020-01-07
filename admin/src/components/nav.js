import React from 'react'
import styles from '../pages/index/index.module.less'
import { Layout, Menu, Icon , message , Button , Dropdown} from 'antd';
class Nav extends React.Component{
    constructor(){
        super();
        this.state={
            collapsed: false,
            menu : (
              <Menu onClick={this.handleMenuClick} style={{width:'100px' , marginLeft:'12px'}}>
                <Menu.Item key="1">
                  <Icon type="user" />
                  个人信息
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="user" />
                  修改密码
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="user" />
                  退出登录
              </Menu.Item>
              </Menu>
            )
          };
    }
    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
      }
    render(){
        return(
            <div className={styles.nav}>
                    <h2 className={styles.logo}>
                        <img src='https://qiniu.gongxueyun.com/upload/55ed9debfe9c097bff8393091c520d2b.png'></img>
                        五道口职业技术学院
                    </h2>
                  <Dropdown overlay={this.state.menu} >
                    <Button type="link" className={styles.btn} ghost={true}>
                     <img src='https://qiniu.gongxueyun.com/upload/f005585371b08470a447374c1a8e85c7.png'></img> 赵子琦 <Icon type="down" />
                    </Button>
                  </Dropdown>                
            </div>
        )
    }
}


export default Nav