import React,{Component} from 'react'
import { Modal, Button, Form, Input, Upload, Icon, message  } from 'antd';
import { Addzhoubao } from '../../../api/goodsApi'
import styles from './day-head.module.less'
import  './day-head.module.less'


class DayHead extends Component {
  constructor (props) {
    super (props)
    this.state = { 
      visible: false
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
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


    this.showModal = () => {
      this.setState({
        visible: true,
      });
    };
    this.handleOk = e => {
      // console.log(1)
      let {getFieldsValue, validateFields} = this.props.form
        validateFields((err,data) => {
          console.log(data)
          let {title, content} = data
          let time = getCurrentDate()
          let img = 'asd'
          let mark = false
          let id = localStorage.getItem('uid')
          let uid =  JSON.parse(id).data
          Addzhoubao(title, content, time, img, mark, uid)
          .then((res) => console.log(res))
          if(!err){
            this.setState({
              visible: false,
            });
          }
        })
    };
    this.handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
    return (
      <div className={styles.dayHead}>
        <Button type="primary" onClick={this.showModal} className={styles.button}>
          +新增日报
        </Button>
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
              <Input className={styles.input1} readOnly="readOnly" placeholder="2017级计算机应用技术专业" />
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
export default Form.create()(DayHead)
