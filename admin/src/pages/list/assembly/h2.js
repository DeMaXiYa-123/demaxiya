import React, { Component } from 'react'
import { Input, Button, Cascader } from 'antd'

class H2 extends Component {
  constructor() {
    super()
  }
  fnc = () => {
    console.log(1)
  }
  render() {
    const options = [{
      label: '2017级计算机应用技术专业',
      value: '2017级计算机应用技术专业'
    }]
    const InputGroup = Input.Group;
    return (
      <div style={{display: 'flex'}}>
        <InputGroup compact style={{width: '203px'}}>
          <Cascader options={options} placeholder="请选择计划" />
        </InputGroup>
        <Button type="primary" style={{ background: '#66d3b8' }}>查询</Button>
      </div>
    )
  }
}

export default H2