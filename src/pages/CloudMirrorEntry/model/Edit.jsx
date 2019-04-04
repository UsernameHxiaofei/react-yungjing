import React,{Component}  from 'react'
import {Modal,Form,Button, Input, DatePicker,message} from 'antd'
import { connect } from '@souche-f2e/uniqlo';
const FormItem = Form.Item
const { TextArea } = Input
const {RangePicker} = DatePicker;
import {queryCloudMirrorInvDetail,cloudMirrorAssetEntry,cloudMirrorAssetEdit} from '@/services/getData'


class Edits extends Component {
  EdithandleCancel = () => {
    this.props.form.resetFields()
    this.props.SET_STATE({
      Editvisible: false,
      editobj: {
        id: '',
        newMirrorNo: '',
        inputRemark: ''
      },
    })
  }

  mirrorNoChange = (e) => {
    let value = e.target.value.trim()
    this.props.SET_STATE({
      editobj: {...this.props.editobj, newMirrorNo: value}
    })
  }

  inputRemarkChange = (e) => {
    let value = e.target.value.trim()
    this.props.SET_STATE({
      editobj: {...this.props.editobj,  inputRemark: value}
    })
  }

  async CloudMirrorAssetEdit (payload) {
    const res = await cloudMirrorAssetEdit (payload)
    if (res.success) {
      message.success('编辑成功')
      this.props.form.resetFields()
      this.props.SET_STATE({
        Editvisible: false,
        editobj: {
          id: '',
          newMirrorNo: '',
          inputRemark: ''
        },
        obj: {},
        editLoadng: false
    })
    this.props.QueryCloudMirrorInvDetail(this.props.data)
    } else {
      message.error(res.msg)
      this.props.form.resetFields()
      this.props.SET_STATE({
        editLoadng: false,
      })
    }
  }

  EdithandleOk = () => {
    message.destroy();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.SET_STATE({
          editLoadng: true,
        })
        this.CloudMirrorAssetEdit(this.props.editobj)
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
    return (
        <Modal
          title="编辑云镜"
          visible={this.props.Editvisible}
          onCancel={this.EdithandleCancel}
          footer={[
            <Button type='primary'   onClick={this.EdithandleOk}>保存</Button>,
            <Button  onClick={this.EdithandleCancel}>取消</Button>,
          ]}
        >
      <Form>
        <Form.Item
            {...formItemLayout}
            label="原ID"
          >
          <span>{this.props.obj.mirrorNo}</span>
          </Form.Item>
        <Form.Item
            {...formItemLayout}
            label="新ID"
          >
           {getFieldDecorator('ID', {
             initialValue: this.props.editobj.newMirrorNo,
             rules: [{
              max:20, message: '长度不能大于20位',
            },{
              pattern: new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_^%&',;@#(){}*&^/+-“”|=?$!！~`. 。，……《》：（）【】；、|？、?{}''""￥\x22]+$/, "g"), message: '不能输入非法的字符'
            }],
          })(
            <Input  onChange={this.mirrorNoChange} />
          )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="备注"
          >
          {getFieldDecorator('watir', {
            initialValue: this.props.editobj.inputRemark,
            rules: [{
              max:255, message: '长度不能大于255位'
            },
            {
              pattern: new RegExp(/^[\n\r\u4E00-\u9FA5A-Za-z0-9_^%&',;@#(){}*&^/+-“”|=?$!！~`. 。，……《》：（）【】；、|？、?{}''""￥\x22]+$/, "g"), message: '不能输入非法的字符'
            }
          ],
          })(
            <TextArea  onChange={this.inputRemarkChange}  />
          )}
          </Form.Item>
      </Form>
    </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const {editLoadng,data,CloudMirrorAssetEdit,editobj,obj,Editvisible,ID} = state.cloudMirrorEntry
  return {editLoadng,data,CloudMirrorAssetEdit,editobj,obj,Editvisible,ID}
}

const mapDispatchToProps = (dispatch) => {
  const {CloudMirrorAssetEdit,SET_STATE,QueryCloudMirrorInvDetail} = dispatch.cloudMirrorEntry
  return {CloudMirrorAssetEdit,SET_STATE,QueryCloudMirrorInvDetail}
}
const Edit = Form.create()(Edits);

export default connect (mapStateToProps,mapDispatchToProps) (Edit)
