import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, DatePicker, Input, Select  } from 'antd';
import styled from 'styled-components';
import { searchFormCreate } from '@/shared/hoc'
import moment from "moment";
const Option = Select.Option
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const Root = styled.div`
    .top{
        padding: 16px;
        background: #fafafa;
        border: 1px solid #bfbfbf;
        border-radius: 6px;
        margin-bottom: 32px;
  `
class SearchForm extends Component {

  componentDidMount = () => {
    this.props.PageCloudMirrorSalesDetail(this.props.data)
    // this.props.ListCloudMirrorInvById()
  }
    query = () => { //查询事件
        let data = this.props.form.getFieldsValue() // 获取Form表单内容赋值
        const crtDateStart = data.sales_date.length?moment(data.sales_date[0]).format("YYYY-MM-DD"): "";
        const crtDateEnd = data.sales_date.length?moment(data.sales_date[1]).format("YYYY-MM-DD"): "";
        let obj = {
            keyWord:data.keyWord,
            statusCode:data.statusCode,
            salesChannelCode : data.salesChannelCode,
            salesOrgName:data.salesOrgName,
            startSalesDate:crtDateStart,
            endSalesDate:crtDateEnd,
            page:1,//页数
            pageSize:10,//条数
        }
        this.props.SET_STATE({data:obj,TableLoading: true})
        this.props.PageCloudMirrorSalesDetail(obj) // 调接口发送请求
    }

    ModalShow = (num) =>{ // 模态框显示
        this.props.SET_STATE({
            ModelShow: true,
            ModelSign: num,
        })
        if (num == 0) { //是下拉选择框就掉接口渲染
          this.props.ListCloudMirrorInvById()
        }
    }

    render() {
        const {
            form: { getFieldDecorator },
            gutter,                      // 左右间隔
            searchFormClassName,             // 控件区域className
            buttonColClassName,              // 按钮区域（右边的查询、重置）className
            buttonColClassNameLef,       //左侧操作按钮
            colLayout,                   // 控件响应式配置
        } = this.props

        // 下拉框的取值
        const qualitySelect = this.props.qualitySelect.map(item => {
            return (<Option key={item.id} value={item.code}>{item.name}</Option>)
        })
          const DistributionChannel = this.props.DistributionChannel.map(item => {
            return (<Option key={item.id} value={item.code}>{item.name}</Option>)
        })

        return (
            <Root>
                <Form className={searchFormClassName}>
                    <Row gutter={gutter}>
                        <Col {...colLayout}>
                            <FormItem label='关键字' >
                                {getFieldDecorator('keyWord', {
                                    initialValue: ''
                                })(
                                    <Input placeholder='请输入' />
                                )}
                            </FormItem>
                        </Col>
                        <Col {...colLayout}>
                            <FormItem label='质量' >
                                {getFieldDecorator('statusCode', {
                                    initialValue: ''
                                })(
                                    <Select allowClear  placeholder='请选择'>
                                    {qualitySelect}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col {...colLayout}>
                            <FormItem label='销售渠道'>
                                {getFieldDecorator('salesChannelCode', {
                                    initialValue: ''
                                })(
                                    <Select allowClear placeholder='请选择'>
                                    {DistributionChannel}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col {...colLayout}>
                            <FormItem label='客户'>
                                {getFieldDecorator('salesOrgName', {
                                    initialValue: ''
                                })(
                                    <Input placeholder='请输入'/>
                                )}
                            </FormItem>
                        </Col>
                        <Col {...colLayout}>
                            <FormItem label='销售时间'>
                                {getFieldDecorator('sales_date', {
                                    initialValue: []
                                })(
                                    <RangePicker style={{ width: '100%' }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={gutter}>
                <Col className={buttonColClassName}>
                    <Button type='primary' loading={this.props.TableLoading} onClick={this.query}>查询</Button>
                </Col>
                <Col className={buttonColClassNameLef}>
                    <Button type='primary' onClick={this.ModalShow.bind(this,'0')}>销售</Button>
                    <Button type='primary' onClick={this.ModalShow.bind(this,'1')}>批量销售</Button>
                </Col>
                </Row>
                </Form>
            </Root>
        )
    }
}

const mapStateToProps = (state) => {
    const {sLoading,qualitySelect,DistributionChannel,data,TableLoading} = state.Sale
    return {sLoading,qualitySelect,DistributionChannel,data,TableLoading}
}
const mapDispatchToProps = (dispatch) => {
    const {SET_STATE,PageCloudMirrorSalesDetail,ListCloudMirrorInvById} = dispatch.Sale
    return { SET_STATE,PageCloudMirrorSalesDetail,ListCloudMirrorInvById}
}
const IndexPage = Form.create()(searchFormCreate()(SearchForm))
export default connect(mapStateToProps,mapDispatchToProps)(IndexPage)
