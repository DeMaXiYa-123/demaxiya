import React from 'react'
import { Table, Divider, Tag } from 'antd';



class Notice extends React.Component{
    render(){
        const columns = [
            {
              title: '公告标题',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: '公告内容',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '发布时间',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: '状态',
              key: 'tags',
              dataIndex: 'tags',
              render: tags => (
                <span>
                  {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </span>
              ),
            },
            {
              title: '来源',
              key: 'laiyuan',
              render: (text, record) => (
                <span>
                  <a>Invite {record.name}</a>
                  <Divider type="vertical" />
                  <a>Delete</a>
                </span>
              ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a>Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                  </span>
                ),
              },
          ];
          
          const data = [
           
          ];
        return(
            <div style={{width:'100%',height:'99%',background:'#eee'}}><Table columns={columns} dataSource={data} style={{width:'98%',marginLeft:'1%',marginTop:'.5%'}}></Table></div>
        )
    }
}


export default Notice