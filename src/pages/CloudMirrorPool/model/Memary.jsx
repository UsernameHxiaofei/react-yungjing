import React, {Component} from 'react'
import {Modal,Select, Form,DatePicker, Row,Table, Col,Pagination,Spin} from 'antd'
import {connect} from '@souche-f2e/uniqlo'
const FormItem = Form.Item
const { Option } = Select
const {  RangePicker } = DatePicker;
import obj from '../data'
class Memarys extends Component{

  handleCancel = () => {
    this.props.SET_STATE({
      Memarryvisible: false,
      IntObj: {
        page: 1,
        pageSize: 10,
        mirrorId: '',
        optTypeCode: '',
        startCreateDate: '',
        endCreateDate: ''
      }
    })
  }

  datesChange = (date, dateString) => { //操作时间改变的事件
    this.props.SET_STATE({
      loading: true,
      IntObj: {...this.props.IntObj, startCreateDate: dateString[0], endCreateDate: dateString[1]}
    })
    this.props.PageCloudMirrorLogDetail({...this.props.IntObj, startCreateDate: dateString[0], endCreateDate: dateString[1]}) //查询数据
  }

  pageChange = (current) => { //分页点击事件
    let data = {...this.props.IntObj, page:current}
    this.props.PageCloudMirrorLogDetail(data)
  }

  onShowSizeChange = (current, pageSize) => {
    let data = {...this.props.IntObj, page:current, pageSize:pageSize}
    this.props.PageCloudMirrorLogDetail(data)
  }

  OperationTypeChange = (value) => { //操作类型改变事件
    if (value) {
      this.props.SET_STATE({
        loading: true,
        IntObj: {...this.props.IntObj, optTypeCode: value}
      })
      this.props.PageCloudMirrorLogDetail({...this.props.IntObj, optTypeCode: value})
    } else {
      this.props.SET_STATE({
        loading: true,
        IntObj: {...this.props.IntObj, optTypeCode: ''}
      })
      this.props.PageCloudMirrorLogDetail({...this.props.IntObj, optTypeCode: ''})
    }

  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }

    const columns = [{
      title: '云镜ID',
      dataIndex: 'mirrorNo',
      key: 'name',
    }, {
      title: '操作类型',
      key: 'age',
      render: (record) => (
        <div>
          {record.optTypeName}
        </div>
      )
    }, {
      title: '操作时间',
      dataIndex: 'createDate',
      key: 'address',
    }, {
      title: '操作内容',
      dataIndex: 'optContent',
      key: '11',
    }];
    return (
      <div>
        <Modal
          width='850px'
          title="云镜记录"
          visible={this.props.Memarryvisible}
          onCancel={this.handleCancel}
          footer={[

          ]}
        >
          <Form>
            <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label='操作类型:'>
                {getFieldDecorator('1111', {
                  initialValue: this.props.IntObj.optTypeName
                })(
                  <Select allowClear onChange={this.OperationTypeChange} placeholder="请选择操作类型">
                  {obj.OperationType.map((item, index) => {
                    return <Option value={item.value} key={item.id}>{item.name}</Option>
                  })}
                </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label='操作时间:'>
                {getFieldDecorator('2222', {
                  initialValue: this.props.dates
                })(
                  <RangePicker onChange={this.datesChange} />
                )}
              </FormItem>
            </Col>
              </Row>
          </Form>
          <Spin spinning={this.props.loading} >
            <Table
            dataSource={this.props.TimeList}
            columns={columns}
            bordered
            pagination={false} />
          </Spin>
          <div style={{textAlign:'center', marginTop: '20px'}}>
              <Pagination
              size='small'
              showQuickJumper
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              total={+this.props.totalNumber}
              showTotal={total => `共 ${total} 条记录`}
              pageSize={this.props.IntObj.pageSize}
              current={this.props.IntObj.page}
              onChange={this.pageChange}
              />
          </div>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {loading,Memarryvisible,dates,IntObj,TimeList,totalNumber} = state.cloudMirrorPool
  return {loading,Memarryvisible,dates,IntObj,TimeList,totalNumber}
}

const mapDispatchToProps = (dispatch) => {
  const {PageCloudMirrorLogDetail,SET_STATE} = dispatch.cloudMirrorPool
  return {PageCloudMirrorLogDetail,SET_STATE}
}

const Memary = Form.create()(Memarys);

export default connect (mapStateToProps, mapDispatchToProps) (Memary)
