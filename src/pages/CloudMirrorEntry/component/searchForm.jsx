import React, {Component} from 'react'
import {Row, Col, Form, Input,  Button, Upload, message, Icon,DatePicker } from 'antd'
import { connect } from '@souche-f2e/uniqlo';
import styled from 'styled-components';
import moment from 'moment'
import {env} from '../../../config/env/index'
import CacheUtils from '@souche-f2e/souche-util/lib/cache'
const {  RangePicker } = DatePicker;
const Root = styled.div`
  .ant-message-custom-content{
    width: 850px;
    height: 600px;
    overflow:auto;
  }
`;

import { searchFormCreate } from '@/shared/hoc'// 样式
const FormItem = Form.Item
let downLoadUrl = env.SERVER_URL.fileDownLoadUrl //导入下载的地址
class SearchForms extends Component{
  constructor (props) {
    super (props)
    this.state = {
      flag: false
    }
  }
  componentDidMount = () => {
    this.props.QueryCloudMirrorInvDetail(this.props.data)
  }

  newSet = () => {//新建（打开新建的model）
    message.destroy();
    this.props.SET_STATE({
      newSetvisible: true,
      newSet: {...this.props.newSet, produceDate:moment(new Date()).format("YYYY-MM-DD ")}
    })
  }

  outExcel = () => {  //下载excel模板
    window.open(downLoadUrl)
  }

  inTo = () => { //点击让它有加载的效果
    message.destroy();
  }

  search = () => {//查询事件
    this.props.SET_STATE({
      loading: true,
    })
    this.props.QueryCloudMirrorInvDetail({...this.props.data, page: 1})
  }

  IDchange = (e) => {  // ID改变事件
    let value = e.target.value.trim() //去除两边的字符
    this.props.SET_STATE({
      data: {...this.props.data, keyWord: value}
    })
  }

  produce_dateChange = (date, dateString) => {//生产日期改变
    this.props.SET_STATE({
      data: {...this.props.data, startProduceDate:dateString[0], endProduceDate: dateString[1]}
    })
  }

  input_dateChange = (date, dateString) => {//录入日期改变
    this.props.SET_STATE({
      data: {...this.props.data, startInputDate:dateString[0], endInputDate: dateString[1]}
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const {
      buttonColClassNameLef,
      gutter,                      // 左右间隔
      searchFormClassName,             // 控件区域className
      buttonColClassName,              // 按钮区域（右边的查询、重置）className
      colLayout,                   // 控件响应式配置
    } = this.props

    let _th = this
    const props = {
      name: 'file',
      accept: '.xlsx,.xls',//限制类型
      action: `${env.SERVER_URL.fileUrl + '?token=' + CacheUtils.getCookie('_security_token_inc')}`,
      onChange (info)  {
        _th.props.SET_STATE({
          inToLoading: true,
          flag: true,
         })
        if (info.file.status !== 'uploading') {
          // console.log(info);
        }
        if (info.file.status === 'done') { //上传成功
          if (info.fileList[info.fileList.length-1].response.success) {
            message.success(`${info.file.name} 导入成功`)
            _th.props.SET_STATE({
              inToLoading: false,
              flag: false,
            })
            _th.props.QueryCloudMirrorInvDetail(_th.props.data) //导入成功在查询一次
          } else { //上传失败报异常(异常多条)
            // console.log('info.fileList[info.fileList.length-1].response.msg',info.fileList[info.fileList.length-1].response.msg)
            let str = info.fileList[info.fileList.length-1].response.msg  // 判断数据异常的格式
            if (str.indexOf('excel录入如下信息不符合') < 0) {
              message.error(info.fileList[info.fileList.length-1].response.msg)
              _th.props.SET_STATE({
                inToLoading: false,
                flag: false,
              })
            } else {
              let title = str.substr(0, 14)
              let arr = str.slice(14)
              let main = ''
              arr = JSON.parse(arr)
              arr.map((item, index) => {
                if (index < 100) {
                  main +=  `第${(+item.index)}条数据${item.errMessage}`
                }
              })
              message.error(title + ": "  +  main + '......', 10) //提示信息
            }
            _th.props.SET_STATE({
              inToLoading: false,
              flag: false,
            })
          }
        } else if (info.file.status === 'error') { //上传失败
          message.error(`${info.file.name} 导入失败`);
          _th.props.SET_STATE({
            inToLoading: false,
            flag: false,
          })
        }
      },
    }

    return (
      <Root>
          <Form className={searchFormClassName}  >
          <Row gutter={gutter}>
            <Col {...colLayout}>
              <FormItem label='关键字:'>
                {getFieldDecorator('keyWord', {
                  initialValue: this.props.data.keyWord
                })(
                  <Input  onChange={this.IDchange} placeholder='请输入云镜Id' />
                )}
              </FormItem>
            </Col>
            <Col {...colLayout}>
              <FormItem label='生产日期'>
                {getFieldDecorator('produce_date', {
                   initialValue: this.props.produce_date
                })(
                  <RangePicker onChange={this.produce_dateChange} />
                )}
              </FormItem>
            </Col>

            <Col {...colLayout}>
              <FormItem label='录入日期'>
                {getFieldDecorator('input_date', {
                  initialValue: this.props.input_date
                })(
                  <RangePicker onChange={this.input_dateChange} />
                )}
              </FormItem>
            </Col>


          </Row>
          <Row>
          <Col className={buttonColClassNameLef}>
              <Button onClick={this.newSet} type='primary'>新建</Button>
              <Upload {...props} disabled={this.props.inToLoading}>
              <Button loading={this.props.inToLoading}  onClick={this.inTo} type='primary'>
                 Excel导入
              </Button>
            </Upload>
                <Button style={{marginLeft:'10px'}} onClick={this.outExcel}  type='primary'>导出Excel模板</Button>
            </Col>
            <Col className={buttonColClassName}>
              <Button onClick={this.search} loading={this.props.loading} type='primary'> 查询 </Button>
            </Col>
          </Row>
        </Form>
      </Root>
    )
  }
}

const mapStateToProps = (state) => {
  const {flag,inToLoading,newSet,tableList,totalNumber, data,loading,newSetvisible,produce_date,input_date} = state.cloudMirrorEntry
  return {flag,inToLoading,newSet,tableList,totalNumber, data,loading,newSetvisible,produce_date,input_date}
}

const mapDispatchToProps = (dispatch) => {
  const {SET_STATE,QueryCloudMirrorInvDetail,DownloadTemplate} = dispatch.cloudMirrorEntry
  return {SET_STATE,QueryCloudMirrorInvDetail,DownloadTemplate}
}

const SearchForm = Form.create()(searchFormCreate()(SearchForms));
export default connect (mapStateToProps,mapDispatchToProps) (SearchForm)
