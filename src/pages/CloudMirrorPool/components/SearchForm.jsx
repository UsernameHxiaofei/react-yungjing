import React, {Component} from 'react'
import {Row, Col, Form, Input,  Button, Upload, message, Icon,DatePicker,Select} from 'antd'
import { connect } from '@souche-f2e/uniqlo';
const {  RangePicker } = DatePicker;
import obj from '../../../data' //下拉选择框的取值

// 样式
import { searchFormCreate } from '@/shared/hoc'
const FormItem = Form.Item
const { Option } = Select;

class SearchForms extends Component {

  componentDidMount =  () => {
    this.props.QueryCloudMirrorInvDetail(this.props.data)
  }

  keyWordChange = (e) => { //关键字改变事件
    let value = e.target.value
    this.props.SET_STATE({
      data: {...this.props.data, keyWord: value}
    })
  }

  statusCodeChange = (value, option) => { //质量改变事件
    if (value) {
      this.props.SET_STATE({
        data: {...this.props.data, statusCode: value}
      })
    } else {
      this.props.SET_STATE({
        data: {...this.props.data, statusCode: ''}
      })
    }
  }

  produce_date_change = (date, dateString) => { //生产日期改变
    this.props.SET_STATE({
      data: {...this.props.data, startProduceDate: dateString[0], endProduceDate: dateString[1]}
    })
  }

  input_date_change = (date, dateString) => { //录入日期改变
    this.props.SET_STATE({
      data: {...this.props.data, startInputDate: dateString[0], endInputDate: dateString[1]}
    })
  }

  isSalesChange = (value) => { //销售标识改变
    console.log(value)
    if (value == 0|| value == 1) {
      this.props.SET_STATE({
        data: {...this.props.data, isSales: value}
      })
    } else {
      this.props.SET_STATE({
        data: {...this.props.data, isSales: ''}
      })
    }
  }


  stateDateChange = (date, dateString) => {
    this.props.SET_STATE({
      data: {...this.props.data, startSalesDate: dateString[0], endSalesDate: dateString[1]}
    })
  }

  salesChannelCodeChange = (value) => {
    if (value) {
      this.props.SET_STATE({
        data: {...this.props.data, salesChannelCode: value}
      })
    } else {
      this.props.SET_STATE({
        data: {...this.props.data, salesChannelCode: ''}
      })
    }
  }

  outOrgNameChange = (e) => { //关联门店
    let value = e.target.value
    this.props.SET_STATE({
      data: {...this.props.data, orgName: value}
    })
  }

  isInstallChange = (value) => {
    if (value == 0 || value == 1) {
      this.props.SET_STATE({
        data: {...this.props.data, isInstall: value}
      })
    } else {
      this.props.SET_STATE({
        data: {...this.props.data, isInstall: ''}
      })
    }
  }
  carModelChange = (e) => {
    let value = e.target.value
    this.props.SET_STATE({
      data: {...this.props.data, modelCar: value}
    })
  }

  anDateChange = (date, dateString) => {
    this.props.SET_STATE({
      data: {...this.props.data, startInstallDate: dateString[0], endInstallDate: dateString[1]}
    })
  }

  isActiveChange = (value) => {
    if (value ==0 || value == 1) {
      this.props.SET_STATE({
        data: {...this.props.data, isActive: value}
      })
    } else {
      this.props.SET_STATE({
        data: {...this.props.data, isActive: ''}
      })
    }
  }
  carUserInfoChange = (e) => {
    let value = e.target.value
    this.props.SET_STATE({
      data: {...this.props.data, carOwner: value}
    })
  }

  salesOrgNameChange = (e) => {
    let value = e.target.value
    this.props.SET_STATE({
      data: {...this.props.data, salesOrgName: value}
    })
  }

  activeDateChange = (date, dateString) => {
    this.props.SET_STATE({
      data: {...this.props.data, startActiveDate: dateString[0], endActiveDate: dateString[1]}
    })
  }

  Search = () => { //查询事件
    this.props.SET_STATE({
      searchloading: true
    })
    this.props.QueryCloudMirrorInvDetail({...this.props.data, page: 1})
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const {
      gutter,                      // 左右间隔
      searchFormClassName,             // 控件区域className
      buttonColClassName,              // 按钮区域（右边的查询、重置）className
      colLayout,                   // 控件响应式配置
    } = this.props
    return (
      <div>
        <Form className={searchFormClassName}  >
          <Row gutter={gutter}>
            <Col {...colLayout}>
              <FormItem label='关键字:'>
                {getFieldDecorator('1111', {
                  initialValue: this.props.data.keyWord
                })(
                  <Input onChange={this.keyWordChange} placeholder='请输入云镜ID' />
                )}
              </FormItem>
            </Col>

            <Col {...colLayout}>
              <FormItem label='质量:'>
                {getFieldDecorator('2222', {
                  initialValue: this.props.data.statusCode
                })(
                  <Select onChange={this.statusCodeChange} allowClear placeholder="请选择质量">
                    {obj.quality.map((item, index) => {
                      return <Option id={item.id} key={index + 1} value={item.code}>{item.name}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col {...colLayout}>
              <FormItem label='生产日期'>
                {getFieldDecorator('3333', {
                   initialValue: this.props.produce_date
                })(
                  <RangePicker onChange={this.produce_date_change} />
                )}
              </FormItem>
            </Col>

            <Col {...colLayout}>
              <FormItem label='录入日期'>
                {getFieldDecorator('4', {
                  initialValue: this.props.input_date
                })(
                  <RangePicker onChange={this.input_date_change} />
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='销售标识'>
                {getFieldDecorator('5', {
                  initialValue: this.props.data.isSales
                })(
                  <Select allowClear onChange={this.isSalesChange} placeholder="请选择销售标识">
                      {obj.IsSell.map((item, index) => {
                        return <Option value={item.value} key={item.value}>{item.name}</Option>
                      })}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col {...colLayout}>
              <FormItem label='销售渠道'>
                {getFieldDecorator('6', {
                  initialValue: this.props.data.salesChannelCode
                })(
                  <Select onChange={this.salesChannelCodeChange} allowClear placeholder="请选择销售渠道">
                    {obj.DistributionChannel.map((item, index) => {
                      return <Option id={item.id} value={item.code} key={item.id}>{item.name}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='客户'>
                {getFieldDecorator('7', {
                  initialValue: this.props.data.salesOrgName
                })(
                  <Input onChange={this.salesOrgNameChange}  placeholder='请输入客户' />
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='销售日期'>
                {getFieldDecorator('8', {
                  initialValue: this.props.state_date
                })(
                  <RangePicker onChange={this.stateDateChange} />
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='关联门店'>
                {getFieldDecorator('9', {
                  initialValue: this.props.data.orgName
                })(
                  <Input onChange={this.outOrgNameChange}  placeholder='请输入关联门店' />
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='安装标识'>
                {getFieldDecorator('10', {
                  initialValue: this.props.data.isInstall
                })(
                  <Select allowClear onChange={this.isInstallChange}  placeholder="请选择安装标识">
                    {obj.IsInstalled.map((item, index) => {
                      return <Option value={item.value} key={item.value}>{item.name}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='车辆'>
                {getFieldDecorator('11', {
                  initialValue: this.props.data.modelCar
                })(
                  <Input  onChange={this.carModelChange} placeholder='请输入车牌号/VIN' />
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='安装日期'>
                {getFieldDecorator('12', {
                  initialValue: this.props.AN_date
                })(
                  <RangePicker onChange={this.anDateChange}  />
                )}
              </FormItem>
            </Col>

            <Col {...colLayout}>
              <FormItem label='激活标识'>
                {getFieldDecorator('13', {
                  initialValue: this.props.data.isActive
                })(
                  <Select allowClear onChange={this.isActiveChange}  placeholder="请选择激活标识">
                    {obj.IsActivated.map((item, index) => {
                      return <Option value={item.value} key={item.value}>{item.name}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col {...colLayout}>
              <FormItem label='车主'>
                {getFieldDecorator('14', {
                  initialValue: this.props.data.carOwner
                })(
                  <Input onChange={this.carUserInfoChange}  placeholder='请输入车主姓名/手机号' />
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='激活日期'>
                {getFieldDecorator('15', {
                  initialValue: this.props.activeDate
                })(
                  <RangePicker onChange={this.activeDateChange} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col className={buttonColClassName}>
              <Button onClick={this.Search} loading={this.props.searchloading} type='primary'> 查询 </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {searchloading,data,produce_date,input_date,state_date,AN_date} = state.cloudMirrorPool
  return {searchloading,data,produce_date,input_date,state_date,AN_date}
}

const mapDispatchToProps = (dispatch) => {
  const {QueryCloudMirrorInvDetail,SET_STATE} = dispatch.cloudMirrorPool
  return {QueryCloudMirrorInvDetail,SET_STATE}
}
const SearchForm = Form.create()(searchFormCreate()(SearchForms));

export default connect(mapStateToProps, mapDispatchToProps) (SearchForm)
