import React, { Profiler } from 'react'
import styles from '../../pages/index/index.module.less'
import {Link} from 'react-router-dom'
import { Icon, Button , Select } from 'antd'
import 'echarts/dist/echarts.js'
import ReactEcharts from 'echarts-for-react'
import axios from '../../utils/axios'
class Cont extends React.Component {
    constructor() {
        super()
        this.state = {
            list:[],
            rootList:[],
            biglist:{},
            flag:false
        }
    }
    btncss(value, e) {
        // console.log(value)
        if (value == 1) {
            e.target.style.background = '#43CD80'
        } else {
            e.target.style.background = '#66d3b8'
        }
    }
    handleChange(value) {
        console.log(`selected ${value}`);
      }
      
    componentDidMount(){
            this.getData()    
    }
    option(){
        let option = {
            color: ['#1E90FF', '#BFEFFF'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['已签到', '未签到']
            },
            series: [
                {
                    name: '签到数量',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: this.state.biglist.sign, name: '已签到' },
                        { value: this.state.biglist.nosign, name: '未签到' },
                    ]
                }
            ]
        }
        return option    
    }
    // componentDidMount(){
    //     var token = JSON.parse(localStorage.getItem('token'))
    //     if(token == null){
    //       // this.props.history.push('/login')
    //       console.log(this)
    //     }
    //     // console.log(token)
    //   }
    async getData(){
        try {
            let url = '/api/admin/user'
            let userName = JSON.parse(localStorage.getItem('uid')).data
            console.log(userName)
            await axios.post(url,{userName})
            .then(data=>{       
                let value = data.data[0].reportlist;
                console.log(value)
                this.setState({list:value})
                this.setState({rootList:data.data[0].rootList})
                this.setState({biglist:data.data[0]})
                if(this.state.list.length){
                    for(let key in this.refs){
                        let i = key.slice(key.length-1,key.length)
                        // console.log(i)
                        this.refs[key].style.background = this.state.list[i].color
                    }
                }
            })
            this.setState({flag:true})
        }
        catch(err) {
        }
    }
    render() {
        const { Option } = Select;
        return (
            <div>
                <div className={styles.top}>
                {this.state.flag || <img  style={{position:'absolute' ,width:'150px',height:'120px', top:'40%',left:'46%',zIndex:10}} src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578639325890&di=26fb7e43e94ad28d33afad06fd9befd1&imgtype=0&src=http%3A%2F%2Fimg.ui.cn%2Fdata%2Ffile%2F4%2F2%2F3%2F1814324.gif'></img>}
                    {/* <div className={styles.dressing}>{this.state.biglist.grade}<span><Icon type='down' /></span></div> */}
                    <div style={{float:'left',marginRight:'20px',marginLeft:'10px'}}>
                        <Select defaultValue="grade" style={{ width: 200 }} onChange={this.handleChange}>
                        <Option value="grade">{this.state.biglist.grade}顶岗实习方案</Option>
                        </Select> 
                    </div>
                    <Button onMouseOver={this.btncss.bind(this, 1)} onMouseOut={this.btncss.bind(this, 2)} type="search" style={{ background: '#66d3b8', color: '#fff', width: '90px', height: '32px', float: 'left', border: 0 }}>查询</Button>
                </div>
                <div style={{ width: '68%', height: '340px', background: '#fff', marginLeft: '16px', marginTop: '16px', borderRadius: '6px', float: 'left', marginRight: '22px' }}>
                    <h2 style={{ width: '100%', textAlign: 'left', paddingLeft: '16px', height: '57px', lineHeight: '57px', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #dde' }}>我的考勤</h2>
                    <ReactEcharts option={this.option()} style={{ width: '160px', marginLeft: '20%', marginTop: '3%', float: 'left' }}></ReactEcharts>
                    <div style={{ width: '290px', height: '230px', padding: ' 0 20px', background: '#f8f8f8', float: 'left', marginLeft: '220px', marginTop: '15px' }}>
                        <ul>
                            <li className={styles.rli}><Icon type='profile' style={{ marginRight: '12px', fontSize: '24px', color: 'rgb(87, 134, 255)' }}></Icon> 请假 <span style={{ float: 'right', marginRight: '12px' }}>{this.state.rootList[0]}天</span></li>
                            <li className={styles.rli}><Icon type="carry-out" style={{ marginRight: '12px', fontSize: '24px', color: 'rgb(78, 203, 115)' }} /> 补签<span style={{ float: 'right', marginRight: '12px' }}>{this.state.rootList[1]}天</span></li>
                            <li className={styles.rli}><Icon type="file-done" style={{ marginRight: '12px', fontSize: '24px', color: 'rgb(251, 193, 55)' }} /> 免签<span style={{ float: 'right', marginRight: '12px' }}>{this.state.rootList[2]}天</span></li>
                        </ul>
                    </div>
                </div>
                <div style={{ width: '28%', height: '340px', background: '#fff', float: 'left', marginTop: '16px', borderRadius: '6px' }}>
                    <h2 style={{ width: '100%', textAlign: 'left', paddingLeft: '16px', height: '57px', lineHeight: '57px', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #dde' }}>学校公告 <Link to='/admin/schoolNotice'><span style={{ float: 'right', marginRight: '10px', fontWeight: '400', fontSize: '12px', cursor: 'pointer', color: '#999' }}>更多<Icon type="right" /></span></Link></h2>
                </div>
                <div style={{ width: '97.5%', height: '340px', background: '#fff', float: 'left', margin: '22px 16px', borderRadius: '6px' }}>
                    <h2 style={{ width: '100%', textAlign: 'left', paddingLeft: '16px', height: '57px', lineHeight: '57px', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #dde' }}>我的报告</h2>
                    <div style={{ padding: '25px 0 0 50px', height: '207px' }}>
                        {this.state.list.map((item,index)=>{
                            let {color} = item;
                            console.log(color)
                            return(
                        <div key={index} style={{ width: '49%', height: '81px' ,float:'left',marginBottom:'33px'}}><p style={{ textAlign: 'left', height: '16px', width: '100%', marginBottom: '15px' }}>{item.title}</p><h2 ref={'oh2'+index} style={{ width: '50px', height: "50px", borderRadius: '8px', background: '#83a3ff', float: 'left' }}><img ref={'oimg'+index} src={item.src} style={{ background: '#83a3ff', width: '22px', height: "24px", marginTop: "12px" , marginLeft:'14px'}}></img></h2><div style={{ width: "240px", height: '36px', float: 'left', marginLeft: '22px', marginTop: '14px' }}><p style={{ width: "100%", height: '20px', marginBottom: "10px", textAlign: 'left', lineHeight: '20px' }}><span style={{ fontSize: '20px' }}>{item.suc}篇</span>/{item.duc}篇</p> <div style={{ width: '100%', height: '6px', background: '#cedbff', borderRadius: '100px' }}></div></div></div>
                            )
                        })}
                       
                    </div>
                </div>
            </div>
        )
    }

}
export default Cont






