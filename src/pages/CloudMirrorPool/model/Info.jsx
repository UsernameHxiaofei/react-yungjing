import React, {Component} from 'react'
import {Modal,Row, Col,Button } from 'antd'
import {connect} from '@souche-f2e/uniqlo'

class Info extends Component{


  handleCancel = () => {
    this.props.SET_STATE({
      Infovisible: false
    })
  }

  render () {
    const {
      mirrorNo,
      statusName,
      produceDate,
      inputRemark,
      batchNo,
      inputDate,
      purchaseRemark,
      salesChannelName,
      salesOrgName,
      salesDate,
      salesRemark,
      scrapDate,
      scrapName,
      orgName,
      vin,
      carPlateNo,
      installDate,
      installRemark,
      bindUserMobile,
      activeDate,
      receiptDate
    } = this.props.infoObj
    return (
      <div>
        <Modal
          width='650px'
          title="云镜详情"
          visible={this.props.Infovisible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>,
          ]}
        >
       <div style={{marginBottom:'20px'}}>
       <h3>基本信息</h3>
        <Row>
          <Col span={12}><div>云镜ID: {mirrorNo} </div></Col>
          <Col span={12}><div>质量: {statusName}</div></Col>
          <Col span={12}><div>生产日期: {produceDate?produceDate.substr(0,10):''}</div></Col>
          <Col span={12}><div>云镜备注: {inputRemark}</div></Col>
        </Row>
       </div>

        <div style={{marginBottom:'20px'}}>
        <h3>采购信息</h3>
        <Row>
          <Col span={12}><div>批次: {batchNo} </div></Col>
          <Col span={12}><div>录入时间: {inputDate?inputDate.substr(0,10):''}</div></Col>
          <Col span={12}><div>采购备注: {purchaseRemark} </div></Col>
        </Row>
        </div>

        <div style={{marginBottom:'20px'}}>
        <h3>销售信息</h3>
        <Row>
          <Col span={12}><div>销售渠道: {salesChannelName} </div></Col>
          <Col span={12}><div>客户: {salesOrgName}</div></Col>
          <Col span={12}><div>销售时间: {salesDate?salesDate.substr(0,10):''} </div></Col>
          <Col span={12}><div>销售备注: {salesRemark} </div></Col>
        </Row>
        </div>

       <div style={{marginBottom:'20px'}}>
       <h3>报废信息</h3>
        <Row>
          <Col span={12}><div>报废时间: {scrapDate?scrapDate.substr(0,10):''} </div></Col>
          <Col span={12}><div>报废原因: {scrapName}</div></Col>
        </Row>
       </div>

       <div style={{marginBottom:'20px'}}>
       <h3>镜店关系</h3>
        <Row>
          <Col span={12}><div>门店: {orgName} </div></Col>
          <Col span={12}><div>采购时间:{receiptDate?receiptDate.substr(0,10):''}</div></Col>
          <Col span={12}><div>采购备注: {purchaseRemark}</div></Col>
        </Row>
       </div>

        <div style={{marginBottom:'20px'}}>
        <h3>镜车关系</h3>
        <Row>
          <Col span={12}><div>车架号: {vin} </div></Col>
          <Col span={12}><div>车牌号: {carPlateNo}</div></Col>
          <Col span={12}><div>安装时间: {installDate?installDate.substr(0,10):''}</div></Col>
          <Col span={12}><div>安装备注: {installRemark}</div></Col>
        </Row>
        </div>

        <h3>镜人关系</h3>
        <Row>
          <Col span={12}><div>车主账号: {bindUserMobile} </div></Col>
          <Col span={12}><div>激活时间: {activeDate?activeDate.substr(0,10):''}</div></Col>
        </Row>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {infoObj,Id,Infovisible} = state.cloudMirrorPool
  return {infoObj,Id,Infovisible}
}

const mapDispatchToProps = (dispatch) => {
  const {SET_STATE} = dispatch.cloudMirrorPool
  return {SET_STATE}
}

export default connect (mapStateToProps, mapDispatchToProps) (Info)
