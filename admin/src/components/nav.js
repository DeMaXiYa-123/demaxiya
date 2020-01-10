import React from 'react'
import styles from '../pages/index/index.module.less'
import axios from '../utils/axios'
import { Layout, Menu, Icon , message , Button , Dropdown , Modal} from 'antd';
class Nav extends React.Component{
    constructor(){
        super();
        this.state={
            collapsed: false,
            menu : (
              <Menu onClick={this.handleMenuClick.bind(this)} style={{width:'100px' , marginLeft:'12px'}}>
                <Menu.Item key="1"  onClick={this.showModal}>
                  <Icon type="user" />
                  个人信息
                </Menu.Item>
                {/* <Menu.Item key="2">
                  <Icon type="user" />
                  修改密码
                </Menu.Item> */}
                <Menu.Item key="3">
                  <Icon type="user" />
                  退出登录
              </Menu.Item>
              </Menu>
            ),
            menu2:(
              <Menu onClick={this.handleMenuClick} style={{width:'100px' , marginLeft:'12px'}}>
              <Menu.Item key="4">
                <Icon type="user" />
                学生
              </Menu.Item>
            </Menu>
            ),
            list:['xxx通过了补签申请？','xxx通过了补签申请？','xxx通过了补签申请？','xxx通过了补签申请？'],
            visible: false,
            visible2 : false,
            userName:'',
          };  
    }
    menu3(list){
          return(
            <Menu style={{width:'400px'}}>
                <h2 style={{width:'100%',height:'30px',borderBottom:'1px solid #eed',fontSize:'14px',fontWeight:'600',paddingLeft:'15px',lineHeight:'30px'}}>消息通知</h2>
                {list.map((item,index)=>{
                      return(
                        <Menu.Item style={{height:'35px'}} key={index}>
                          <div>
                          <img src='https://www.moguding.net/static/img/notice3.png' style={{width:'24px',height:'24px',marginRight:'8px'}}></img>{item}
                          </div>
                        </Menu.Item>
                      )
                  })}
              </Menu>
            )
    }
    handleMenuClick(e) {
        // message.info('Click on menu item.');
        console.log('click', e);
        if(e.key == 1){
          this.setState({visible2:true})
          console.log(1)
        }
      }
    getData(){
      let url = '/api/admin/user'
      axios.post(url)
      .then(data=>{
          console.log(data.data[0])
          this.setState({list:data.data[0].noticelist})
          this.setState({userName:data.data[0].userName})

      })
      
    }
    componentDidMount(){
        this.getData()
    }
    render(){
        return(
            <div className={styles.nav}>
                    <h2 className={styles.logo}>
                        <img src='https://qiniu.gongxueyun.com/upload/55ed9debfe9c097bff8393091c520d2b.png'></img>
                        五道口职业技术学院
                    </h2>
                    <div className={styles.btn}>
                      <Dropdown overlay={this.state.menu2} >
                        <Button type="link"  ghost={true} >
                        学生 <Icon type="caret-down" theme="filled" />
                        </Button>
                      </Dropdown>
                      

                      <Dropdown overlay={this.menu3.bind(this,this.state.list)}>
                        <a className="ant-dropdown-link" href="#">
                        <Icon type="bell" theme="filled" style={{color:'#fff',lineHeight:'35px'}} onClick={this.showModal} /> <span style={{background:'#f56c6c',display:'block',position:'absolute', width:'26px',height:'18px',color:'#fff',borderRadius:'8px',lineHeight:'18px',fontSize:'12px',top:'-2px',left:'90px',textAlign:'center'}}>11</span>
                        </a>
                      </Dropdown>


                      <Dropdown overlay={this.state.menu} >
                        <Button type="link"  ghost={true} style={{marginLeft:'15px'}}>
                        <img src='https://qiniu.gongxueyun.com/upload/f005585371b08470a447374c1a8e85c7.png'></img>{this.state.userName} <Icon type="caret-down" theme="filled" />
                        </Button>
                      </Dropdown>

                      <div>
                        <Modal
                          title="个人信息"
                          visible={this.state.visible2}
                          onOk={()=>{
                            this.setState({visible2:false})
                          }}
                          onCancel={()=>{
                            this.setState({visible2:false})
                          }}
                        >
                          <p>姓名  &nbsp;赵子琦</p>
                          <p>学校  &nbsp;五道口职业技术学院</p>
                          <p>院系  &nbsp;计算机工程系</p>
                          <p>专业  &nbsp;计算机应用技术</p>
                          <p>班级  &nbsp;计应A1703</p>
                        </Modal>
                    </div>
                   </div>                
            </div>
        )
    }
}


export default Nav