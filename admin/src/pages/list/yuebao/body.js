import React,{Component} from 'react'
import { Modal, Button, Form, Input, Upload, Table, Pagination, Icon, message, Spin, Alert } from 'antd';
import styles from './day-head.module.less'
import { Getyuebao, Updatayuebao } from '../../../api/goodsApi'


class Body extends Component {
  constructor () {
    super ()
    this.state = { 
      visible: false,
      data: [],
      id: 0,
      page: 0,
      pageSize: 10,
      spinning: false,
      uid: '5e171328f4bbb442483ceb3d'
    }
  }

  componentDidMount () {
    let { page, pageSize } = this.state
    let data = localStorage.getItem('uid')
    let id =  JSON.parse(data).data
    this.setState({spinning: true,uid: id},()=> console.log(this.state.uid))
    Getyuebao(page,pageSize,id)
    .then((res) => this.setState({data: res.data.list.foods,spinning: false},()=>{console.log(this.state.data)}))
    // .then((res) => console.log(res))

  }
  render () {
    let { id,page,pageSize,spinning } = this.state
    // console.log(this.props.form)
    const { getFieldDecorator } = this.props.form;
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    function getCurrentDate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth();//得到月份
      var date = now.getDate();//得到日期
      var day = now.getDay();//得到周几
      var hour = now.getHours();//得到小时
      var minu = now.getMinutes();//得到分钟
      var sec = now.getSeconds();//得到秒
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      var time = "";
      //精确到天
      time = year + "-" + month + "-" + date;
      return time;
    }


    this.updata = () => {
      this.setState({visible: true})
    }
    this.beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }
    this.showModal = (el) => {
      this.setState({
        visible: true,
        id: el.target.id
      });
    };
    //点击确定的回调方法
    this.handleOk = e => {
      let {getFieldsValue, validateFields} = this.props.form
      validateFields((err,data) => {
        console.log(data)
        let {title, content} = data
        let time = getCurrentDate()
        let img = 'asd'
        let mark = false
        Updatayuebao(id, title, content, time, img, mark)
        .then((res) => console.log(res))
        if(!err){
          this.setState({
            visible: false,
          });
        }
      })
      this.setState({spinning: true})
      Getyuebao(page,pageSize,this.state.uid)
      .then((res) => this.setState({data: res.data.list.foods,spinning: false}))
    };
    this.handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    const columns = [
      {
        title: '日报标题',
        dataIndex: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: '日报内容',
        className: 'column-money',
        dataIndex: 'content',
      },
      {
        title: '发布时间',
        dataIndex: 'time',
      },
      {
        title: '批阅状态',
        dataIndex: 'sp',
      },
      {
        title: '操作',
        dataIndex: 'cz',
      },
    ];
    return (
      <div>
        <Spin spinning={spinning}>
          <div className={styles.box}>
            <table className={styles.table}>
                <thead>
                  <tr>
                    {columns.map((item) => {
                      return <th key={item.dataIndex} className={styles.th}>{item.title}</th>
                    })}
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item)=>{
                    return <tr key={item._id}>
                      <td className={styles.td}>{item.title}</td>
                      <td className={styles.td}>{item.content}</td>
                      <td className={styles.td}>{item.time}</td>
                      {item.mark?<td className={styles.td}>批阅</td>:<td className={styles.td}>未批阅</td>}
                      {<td className={styles.cz}><span>详情</span><span onClick={(key) => this.showModal(key)} className={styles.xg} id={item._id}>修改</span></td>}
                    </tr>
                  })}
                </tbody>
              </table>
          </div>
        </Spin>
              <Pagination simple total={this.state.data.length} total={10} onChange={(page) => {
                Getyuebao(page,10,this.state.uid)
                .then((res) => this.setState({data: res.data.list.foods}))
              }} style={{float: 'right',marginTop: '10px',margin: '30px'}} />
              <Modal
                title="新增日报"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确定"
                cancelText="取消"
                width="55vw"
              >
                <div>
                  <Form.Item
                      className={styles.formItem}
                      label={
                        <span>
                          实习计划
                        </span>
                      }
                    >
                    <Input className={styles.input1} readOnly="readOnly" placeholder="请选择计划" />
                    </Form.Item>
                  <Form.Item
                      className={styles.formItem}
                      label={
                        <span>
                          日报标题
                        </span>
                      }
                    >
                      {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请填写标题!' }],
                      })(
                    <Input className={styles.input2} placeholder="请填写" />
                      )}
                  </Form.Item>
                  <Form.Item
                      className={styles.formItemTextarea}
                      label={
                        <span>
                          日报内容
                        </span>
                      }
                    >
                      {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请填写内容!' }],
                      })(
                    <textarea className={styles.textarea} placeholder="1.岗位任务及完成情况
      2.心得与体会
      3.存在问题与解决办法
                  "></textarea>
                  )}
                  <span className={styles.formItemSpan}>0/2000</span>
                  </Form.Item>
                  <Form.Item
                    className={styles.formItem}
                    label={
                      <span>
                        上传照片
                      </span>
                    }>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                      className={styles.formItem}
                      label={
                        <span>
                          上传附件
                        </span>
                      }
                    >
                    <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                      <Button>
                        选取文件
                      </Button>
                    </Upload>
                  </Form.Item>     
                </div>
              </Modal>
      </div>
    )
  }
}

export default Form.create()(Body)