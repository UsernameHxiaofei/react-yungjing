import React, {Component} from 'react'
import {Table,Divider,Pagination,Spin} from 'antd'
import { connect } from '@souche-f2e/uniqlo';

class Tab extends Component {
  pageChange = (current) => { //分页点击事件
    let data = {...this.props.data, page:current}
    this.props.QueryCloudMirrorInvDetail(data)
  }
  onShowSizeChange = (current, pageSize) => {
    let data = {...this.props.data, page:current, pageSize:pageSize}
    this.props.QueryCloudMirrorInvDetail(data)
  }
  InfoShow = (record) => {//详情显示
    this.props.SET_STATE({
      Infovisible: true,
    })
    this.props.QueryCloudMirrorInvById({id: record.id})
  }
  MemarryShow = (record) => { //点击记录调接口
    this.props.SET_STATE({
      Memarryvisible: true,
      loading: true,
      IntObj: {...this.props.IntObj, page: 1, mirrorId: record.id}
    })
    this.props.PageCloudMirrorLogDetail({...this.props.IntObj, mirrorId: record.id})
  }

  render () {
    const columns = [
      {
      title: '云镜信息',
      width:280,
      key:'infoy',
      render: (record) => (
        <div>
          <div>ID:{record.mirrorNo}</div>
          <div>质量:{record.statusName}</div>
          <div>生产时间:{record.produceDate?record.produceDate.substr(0,10) : ''}</div>
          <div>录入时间:{record.inputDate?record.inputDate.substr(0,10) : ''}</div>
        </div>
      )
    }, {
      title: '销售信息',
      width:280,
      key:'info',
      render: (record) => (
        <div>
          <div>销售标识:{record.isSales==1?'是':'否'}</div>
          <div>销售渠道:{record.salesChannelName}</div>
          <div>客户:{record.salesOrgName}</div>
          <div>销售时间:{record.salesDate?record.salesDate.substr(0,10) : ''}</div>
        </div>
      )
    },
    {
      title: '镜店关系',
      width:280,
      key:'reative',
      render: (record) => (
        <div>
          <div>关联门店:{record.orgName}</div>
          <div>录入时间:{record.inputDate?record.inputDate.substr(0,10) : ''}</div>
        </div>
      )
    }, {
      title: '镜车关系',
      width:280,
      key:'carj',
      render: (record) => (
        <div>
          <div>安装标识:{record.isInstall==1?'是':'否'}</div>
          <div>车牌号:{record.carPlateNo}</div>
          <div>车架号:{record.vin}</div>
          <div>安装时间:{record.installDate? record.installDate.substr(0,10) : ''}</div>
        </div>
      )
    },
    {
      title: '镜人关系',
      key:'people',
      render: (record) => (
        <div>
          <div>激活标识:{record.isActive==1?'是':'否'}</div>
          <div>车主姓名:{record.bindUserName}</div>
          <div>车主账号:{record.bindUserMobile}</div>
          <div>激活时间:{record.activeDate? record.activeDate.substr(0,10) : ''}</div>
        </div>
      )
    }, {
      title: '操作',
      fixed: 'right',
      key:'action',
      width:140,
      render: (record) => (
        <div><a onClick={this.InfoShow.bind(this, record)} href="javascript:;">详情</a>
         <Divider type="vertical" />
        <a onClick={this.MemarryShow.bind(this, record)} href="javascript:;">记录</a></div>
      )
    }
  ];
    return (
      <div>


        <Spin spinning={this.props.searchloading} >
        <Table
        columns={columns}
        pagination={false}
        scroll={{ x: 1600 }}
        bordered
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
  const {searchloading,loading,IntObj,Id,data,tableList, totalNumber,Infovisible,Memarryvisible} = state.cloudMirrorPool
  return {searchloading,loading,IntObj,Id,data,tableList,totalNumber,Infovisible,Memarryvisible}
}

const mapDispatchToProps = (dispatch) => {
  const {QueryCloudMirrorInvDetail,PageCloudMirrorLogDetail,QueryCloudMirrorInvById,SET_STATE} = dispatch.cloudMirrorPool
  return {QueryCloudMirrorInvDetail,PageCloudMirrorLogDetail,QueryCloudMirrorInvById,SET_STATE}
}

export default connect (mapStateToProps,mapDispatchToProps) (Tab)
