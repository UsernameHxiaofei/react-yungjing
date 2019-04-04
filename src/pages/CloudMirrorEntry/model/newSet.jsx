import React,{Component}  from 'react'
import {Modal,Form, Input, Button,DatePicker,message } from 'antd'
import {queryCloudMirrorInvDetail,cloudMirrorAssetEntry,cloudMirrorAssetEdit} from '@/services/getData'
const {RangePicker} = DatePicker;
import { connect } from '@souche-f2e/uniqlo';
const FormItem = Form.Item
const { TextArea } = Input
import moment from 'moment'
import { consolidateStreamedStyles } from 'styled-components';

class newSets extends Component {

  produceDateChange =(date, dateString) => {
    this.props.SET_STATE({
      newSet: {...this.props.newSet, produceDate:dateString}
    })
  }

  mirrorNo_Change = (e) => {
    let value = e.target.value.trim()
    this.props.SET_STATE({
      newSet: {...this.props.newSet, mirrorNo: value}
    })
  }

  inputRemark_change = (e) => {
    let value = e.target.value.trim()
    this.props.SET_STATE({
      newSet: {...this.props.newSet, inputRemark: value}
    })
  }
  handleCancel = () => {
    this.props.SET_STATE({
      newSetvisible: false,
      newSet: {
        mirrorNo:'',
        produceDate: '',
        inputRemark: ''
      },
    })
    this.props.form.resetFields()
  }

  disabledDate = (current) => { //限制当天以后的时间不能选择
    return current && current > moment().endOf('day');
  }

  async CloudMirrorAssetEntry (payload) {
    const res = await cloudMirrorAssetEntry (payload)
    if (res.success) {
      message.success('新建成功')
      this.props.SET_STATE({
        newSetvisible: false,
        newSet: {
          mirrorNo:'',
          produceDate: '',
          inputRemark: ''
        },
        saveLoading: false
    })
    this.props.QueryCloudMirrorInvDetail(this.props.data)
    this.props.form.resetFields()
    } else {
      message.error(res.msg)
      this.props.SET_STATE({
        saveLoading: false
      })
    }
  }

  handleOk = () => {
    message.destroy();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      //表单校验通过获取到数据发请求清空字段提示成功关闭页面
      this.props.SET_STATE({
        saveLoading: true,
      })
        this.CloudMirrorAssetEntry(this.props.newSet)
      }
    })
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
        sm: { span: 18 },
      },
    };
   const monthFormat  = 'YYYY-MM-DD';
    return (
      <Modal
          title="新建云镜"
          visible={this.props.newSetvisible}
          onCancel={this.handleCancel}
          footer={[
            <Button type='primary' loading={this.props.saveLoading} onClick={this.handleOk}>保存</Button>,
            <Button  onClick={this.handleCancel}>取消</Button>,
          ]}
        >
      <Form>
      <Form.Item
          {...formItemLayout}
          label="云镜ID"
        >
          {getFieldDecorator('ID', {
            initialValue: this.props.newSet.mirrorNo.trim(),
            rules: [{
              required: true, message: '请输入云镜ID',
            }, {
              max:20, message: '长度不能大于20位',
            }, {
              pattern: new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_^%&',;@#(){}*&^/+-“”|=?$!！~`. 。，……《》：（）【】；、|？、?{}''""￥\x22]+$/, "g"), message: '不能输入非法的字符'
            }],
          })(
            <Input onChange={this.mirrorNo_Change} />
          )}
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="生产日期"
        >
          {getFieldDecorator('2', {
            initialValue: moment(moment(new Date()).format("YYYY-MM-DD")),
            rules: [{
              required: true, message: '请输入生产日期',
            }],
          })(
            <DatePicker  style={{width:'355px'}} disabledDate={this.disabledDate} onChange={this.produceDateChange} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="备注"
        >
        {getFieldDecorator('3', {
            initialValue: this.props.newSet.inputRemark,
            rules: [{
              max:255, message: '长度不能大于255位'
            },
            {
              pattern: new RegExp(/^[\n\r\u4E00-\u9FA5A-Za-z0-9_^%&',;@#(){}*&^/+-“”|=?$!！~`. 。，……《》：（）【】；、|？、?{}''""￥\x22]+$/, "g"), message: '不能输入非法的字符'
            }
          ],
          })(
            <TextArea style={{wordWrap:'normal'}} onChange={this.inputRemark_change}  />
          )}
        </Form.Item>
      </Form>
    </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const {saveLoading,data,newSet,newSetvisible} = state.cloudMirrorEntry
  return {saveLoading,data,newSet,newSetvisible}
}

const mapDispatchToProps = (dispatch) => {
  const {QueryCloudMirrorInvDetail,SET_STATE} = dispatch.cloudMirrorEntry
  return {QueryCloudMirrorInvDetail,SET_STATE}
}
const newSet = Form.create()(newSets);

export default connect (mapStateToProps,mapDispatchToProps) (newSet)
