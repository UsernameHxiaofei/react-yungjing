import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Table,Pagination,Spin} from 'antd';

class TableList extends Component {

    pageChange = (current) => { //分页点击事件
      let data = {...this.props.data, page:current}
      this.props.PageCloudMirrorSalesDetail(data)
    }
    onShowSizeChange = (current, pageSize) => { //每页条数改变的事件
      let data = {...this.props.data, page:current, pageSize:pageSize}
      this.props.PageCloudMirrorSalesDetail(data)
    }
    render(){
        const columns = [{
            title:'云镜ID',
            width:200,
            align: "center",
            key: "id",
            dataIndex: "mirrorNo"
        },{
            title:'质量',
            width:200,
            align: "center",
            key: "quality",
            dataIndex: "statusName"
        },{
            title:'销售渠道',
            width:200,
            align: "center",
            key: "sales_channel_code",
            dataIndex: "salesChannelName"
        },{
            title:'客户',
            width:200,
            align: "center",
            key: "name",
            dataIndex: "salesOrgName"
        },{
            title:'备注',
            width:200,
            align: "center",
            key: "key",
            dataIndex: "salesRemark"
        }]
        return(
            <div>
              <Spin spinning={this.props.TableLoading} >
                 <Table
                    bordered
                    scroll={{x:800}}
                    dataSource={this.props.List}
                    columns={columns}
                    pagination={ false}
                    />
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

const mapStateToProps = (state) =>{
    const {List,TableLoading,data,totalNumber} = state.Sale
    return {List,TableLoading,data,totalNumber}
}
const mapDispatchToProps = (disptch) =>{
    const {PageCloudMirrorSalesDetail,SET_STATE,QueryCloudMirrorInvDetail} = disptch.Sale
    return {SET_STATE,PageCloudMirrorSalesDetail,QueryCloudMirrorInvDetail}
}
export default connect( mapStateToProps, mapDispatchToProps )(TableList)
