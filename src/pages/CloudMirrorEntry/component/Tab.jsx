import React, {Component} from 'react'
import {Table,Pagination,Spin } from 'antd'
import { connect } from '@souche-f2e/uniqlo';

class Tab extends Component {

  edit = (record) => { //编辑事件（数据回显）
    this.props.SET_STATE({
      Editvisible: true,
      editobj: {...this.props.editobj, id: record.id, newMirrorNo: '', inputRemark: record.inputRemark},
      obj: record
    })
  }
  pageChange = (current) => { //分页查询事件
    let data = {...this.props.data, page:current}
    this.props.QueryCloudMirrorInvDetail(data)
  }

  onShowSizeChange = (current, pageSize) => { //每页条数改变的事件
    let data = {...this.props.data, page:current, pageSize:pageSize}
    this.props.QueryCloudMirrorInvDetail(data)
  }
  render () {
    const columns = [{
      title: '云镜ID',
      dataIndex: 'mirrorNo',
      key: 'Id',
      width:200,
    }, {
      title: '生产日期',
      width:200,
      key: 'data',
      render: (record) => (
        <div>
          {record.produceDate?record.produceDate.substr(0,10):''}
        </div>
      )
    }, {
      title: '质量',
      dataIndex: 'statusName',
      key:'statusNames',
      width:100,
    }, {
      title: '录入日期',
      width:200,
      key: 'inputDate',
      render: (record) => (
        <div>
          {record.inputDate?record.inputDate.substr(0,10): ''}
        </div>
      )
    }, {
      title: '备注',
      dataIndex: 'inputRemark',
      key: 'inputRemarks'
    }, {
      title: '操作',
      fixed: 'right',
      key: 'action',
      width:100,
      render: (record) => (
        <div>
          {record.isActive==0&&record.isInstall==0&&record.isSales==0?<a onClick={this.edit.bind(this, record)} href="javascript:;">编辑</a>:''}
        </div>
      )
    }
  ];

    return (
      <div>
        <Spin spinning={this.props.loading}>
          <Table
            columns={columns}
            pagination={false}
            bordered
            scroll={{ x: 1300 }}
            dataSource={this.props.tableList} />
        </Spin>
        <div style={{textAlign:'center', marginTop: '20px'}}>
          <Pagination
            size='small'
            showQuickJumper
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            total={+this.props.totalNumber}
            showTotal={total => `共 ${total} 条记录`}
            pageSize={this.props.data.pageSize}
            current={this.props.data.page}
            onChange={this.pageChange} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {editobj,loading,obj,data,Editvisible,tableList,totalNumber} = state.cloudMirrorEntry
  return {editobj,loading,obj,data,Editvisible,tableList,totalNumber}
}

const mapDispatchToProps = (dispatch) => {
  const {QueryCloudMirrorInvDetail,SET_STATE} = dispatch.cloudMirrorEntry
  return {QueryCloudMirrorInvDetail,SET_STATE}
}

export default connect (mapStateToProps,mapDispatchToProps) (Tab)
