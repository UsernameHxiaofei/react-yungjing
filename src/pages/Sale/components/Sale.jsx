import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Modal,Button,Form,Col,Input,Select,message} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
class ModalSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shwo:false, //销售组织是否显示（不是所有的状态都要放到redux）
        };
    }

    Close = () => { //关闭清空字段
        // this.setState({shwo:false})
        this.props.SET_STATE({
          ModelShow:false,
          show: false,
          obj: {
            mirrorNo:'',
            salesChannelId:'',
            salesChannelCode: '',
            salesChannelName: '',
            salesOrgId: '',
            salesOrgName: '',
            salesRemark: ''
          }
        })
    }

    confirm = () => {  // 确认事件
    message.destroy();
      this.props.form.validateFields((err, values) => { //表单校验通过获取到数据发请求清空字段提示成功关闭页面
        if (!err) {
          let obj = {...this.props.obj, mirrorNo:this.props.obj.mirrorNo.split(/[(\r\n)\r\n]+/).join(',')}//（拿到数据）
          this.props.SET_STATE({obj, sureLoding: true})
          this.props.InsertCloudMirrorSales(obj,{...this.props.data, page: 1})
        }
      })
    }

    idChange = (value) => { //id改变的事件
      if (value) {
        this.props.SET_STATE({
          obj: {...this.props.obj, mirrorNo: value}
        })
      } else {
        this.props.SET_STATE({
          obj: {...this.props.obj, mirrorNo: ''}
        })
      }
    }

    fetchUser = (value) => {
      if (value) { //value为空的情况
        this.deepSlice(this.props.totalList, value)
      } else {
        this.props.SET_STATE({
          ids: this.props.totalList.slice(0, 600)
        })
      }
    }
    deepSlice = (array, value) => {  // 定义一个方法
      let arr = []
      let ARR = []
      for (let i = 0; i <= array.length; i++) {
        if (array[i]&&array[i].indexOf(value) >= 0) {
              ARR.push(array[i])
              if (ARR.length >= 600) {
                arr = ARR.slice(0, 600)
                return
              } else {
                arr = ARR
              }
          }
      }
      this.props.SET_STATE({ids:arr})
    }

    CHANGE = (e) => {
      let value = e.target.value
      this.props.SET_STATE({
        obj: {...this.props.obj, mirrorNo: value}
      })
    }

    salesChange = (value,props) =>{ // 销售渠道改变  判断是否显示组织选项
        if (value) {
          this.props.SET_STATE({
            obj: {...this.props.obj, salesOrgId: '', salesOrgName: '',  salesChannelId:props.props.id,salesChannelCode:props.props.value, salesChannelName:props.props.children},
          })
          // 重置表单的值
          this.props.form.resetFields(['sale'])
        } else {
          this.props.SET_STATE({
            obj: {...this.props.obj, salesChannelId:'', salesOrgId: '', salesOrgName: '', salesChannelCode:'',  salesChannelName:''}
          })
          this.props.form.resetFields(['sale'])
        }
        //在经销商集团跟4S店的时候显示并且取值不一样（弹个车的销售组织不显示）
        if(value =='600155000' || value=='600155005'){
          this.props.SET_STATE({show: true})
            // 掉接口
            if (value == '600155000') {
              this.props.LIstDealerInfoVo({...this.props.sale,  storeType: 1, salesOrgName:''})
            } else {
              this.props.LIstDealerInfoVo({...this.props.sale,  storeType: 2, salesOrgName:''})
            }
        } else {
          this.props.SET_STATE({show: false})
        }
    }

    orgChange = (value, props) => { //客户改变事件
      if (value) {
        this.props.SET_STATE({
          obj: {...this.props.obj, salesOrgId: value, salesOrgName:props.props.children}
        })
      } else {
        this.props.SET_STATE({
          obj: {...this.props.obj, salesOrgId: '', salesOrgName:''}
        })
      }
    }

    areaChange = (e) => {
      let value = e.target.value.trim()
      this.props.SET_STATE({
        obj: {...this.props.obj, salesRemark: value}
      })
    }
    render(){

        const DistributionChannel = this.props.DistributionChannel.map((item, index) => { //销售渠道下拉取值
            return (<Option id={item.id} key={item.id} value={item.code}>{item.name}</Option>)
        })
        const ids = this.props.ids.map((item, index) => { //id下拉选择
          return (<Option value={item} key={index}>{item}</Option>)
        })
        const saleLists = this.props.saleList.map((item, index) => {
          return (<Option value={item.code} key={item.code}>{item.name}</Option>)
        })

        const { getFieldDecorator } = this.props.form;
        const formLeftLayout = {
            labelCol: {
                xs: { span: 5 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 19 },
                sm: { span: 19 },
            },
        }
        return(
            <Modal title={this.props.ModelSign === '0'?'云镜销售':'云镜批量销售'} visible={this.props.ModelShow} onCancel={this.Close} width='500px' height='500px' maskClosable={true} destroyOnClose={true}
            footer={[
                <Button type='primary' loading={this.props.sureLoding} onClick={this.confirm}>确认</Button>,
                <Button key='back' onClick={this.Close}>关闭</Button>
            ]}
            >
                <Form>
                    <Col>
                        <FormItem label='云镜ID' {...formLeftLayout}>
                            {getFieldDecorator('id', {
                                initialValue: this.props.obj.mirrorNo,
                                rules: [{
                                  required: true, message: '请选择云镜ID',
                                }]
                            })(
                                this.props.ModelSign ==='0'?(
                                  <Select
                                  onChange={this.idChange}
                                  showSearch
                                  optionFilterProp="children"
                                  allowClear
                                  onSearch={this.fetchUser}
                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                  >
                                  {ids}
                                </Select>
                                ):(
                                    <TextArea placeholder='请输入云镜ID,如果有多个请换行' onChange={this.CHANGE} rows={8}  style={{resize:'none'}}/>
                                )
                            )}
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label='销售渠道' {...formLeftLayout}>
                            {getFieldDecorator('sales_channel_code', {
                                initialValue: this.props.obj.salesChannelCode,
                                rules: [{
                                  required: true, message: '请选择销售渠道',
                                }],
                            })(
                                <Select allowClear placeholder='请选择' onChange={this.salesChange}>
                                    {DistributionChannel}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    {/* 销售组织是否显示 */}
                    {this.props.show?( <Col>
                        <FormItem label='客户' {...formLeftLayout}>
                            {getFieldDecorator('sale', {
                                initialValue: this.props.obj.salesOrgId,
                                rules: [{
                                  required: true, message: '请选客户',
                                }]
                            })(
                                <Select showSearch allowClear onChange={this.orgChange} placeholder='请选择'>
                                    {saleLists}
                                </Select>
                            )}
                        </FormItem>
                    </Col>):''}
                    <Col>
                        <FormItem label='备注' {...formLeftLayout}>
                            {getFieldDecorator('name', {
                                initialValue: this.props.obj.salesRemark,
                                rules: [{
                                  max:255, message: '长度不能大于255位'
                                },
                                {
                                  pattern: new RegExp(/^[\n\r\u4E00-\u9FA5A-Za-z0-9_^%&',;@#(){}*&^/+-“”|=?$!！~`. 。，……《》：（）【】；、|？、?{}''""￥\x22]+$/, "g"), message: '不能输入非法的字符'
                                }
                              ],
                            })(
                                <TextArea placeholder='请输入' onChange={this.areaChange}  rows={5} style={{resize:'none'}}/>
                            )}
                        </FormItem>
                    </Col>
                </Form>
            </Modal>
        )
    }
}

const mapStateToProps = (state) =>{
    const {show,totalList,data,sale,sureLoding,obj,ids,ModelShow,ModelSign,DistributionChannel,saleList,sLoading} = state.Sale
    return {
      show,
      totalList,
        data,
        saleList,
        sale,
        sureLoding,
        obj,
        ids,
        ModelShow,
        ModelSign,
        DistributionChannel,
        sLoading
    }
}
const mapDispatchToProps = (disptch) =>{
    const {SET_STATE,InsertCloudMirrorSales,LIstDealerInfoVo,PageCloudMirrorSalesDetail} = disptch.Sale
    return { SET_STATE,InsertCloudMirrorSales,LIstDealerInfoVo,PageCloudMirrorSalesDetail}
}
const IndexPage = Form.create()(ModalSale);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexPage)
