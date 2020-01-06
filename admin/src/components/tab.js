import React from 'react'
import { Menu, Icon } from 'antd'
import {Link} from 'react-router-dom'
import Alllist from '../rootAllList'
import styles from '../pages/index/index.module.less'
import {filterlist} from '../utils/filterlist'
const { SubMenu } = Menu;


class Tab extends React.Component{
    constructor(){
        super();
        this.state = {
            openKeys: ['sub1'],
          };
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    }
    onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  componentDidMount(){
    // filterlist(['1','0','2-1','2-3'])  
  }
    renderitem(list){
        if(!list.length) return '暂无数据'
        // console.log(list)
        let result = list.map((item,index)=>{
            if(item.children){
                return(
                    <SubMenu className={styles.pl}
                    key={item.id}
                    title={
                        <span>
                        <Icon type={item.icon} />
                        <span>{item.name}</span>
                        </span>
                    }>
                        {this.renderitem(item.children)}                              
                    </SubMenu> 
                )    
            }else{
                return (
                    <Menu.Item key={item.id} className={styles.pl}>
                        {/* <Link to={item.path||'/admin'}> */}
                            <span>
                                <Icon type={item.icon||'home'} />
                                <span>{item.name}</span>
                            </span>
                        {/* </Link>                       */}
                    </Menu.Item>
                    )
            }
        })
        return result
        }
    render(){
        return(
            <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    // style={{ width: 256 }}
                    theme='dark'
                >
                    {this.renderitem(Alllist)}
                </Menu>
        )
    }
}


export default Tab