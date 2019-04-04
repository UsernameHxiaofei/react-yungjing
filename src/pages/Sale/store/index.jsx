import { createModel } from '@souche-f2e/uniqlo';
import { fetchUser } from '@/services/global';
import {pageCloudMirrorSalesDetail,listCloudMirrorInvById,insertCloudMirrorSales,ListDealerInfoVo} from '@/services/getData'
import { message } from 'antd';

const initState = {
  currentUser: null,
  qualitySelect: [
    {id: '600255000', code: '600255000', name: '正常'},
    {id: '600255005', code: '600255005', name: '报废'}
  ],
  DistributionChannel: [
    {id: '600155000', code: '600155000', name: '集团', value:'1'},
    {id: '600155005', code: '600155005', name: '4S店', value:'2'},
  ],
  List:[],
  TableLoading:false,
  data:{
    page: 1,
    pageSize: 10,
    keyWord: '',
    statusCode: '',
    salesChannelCode: '',
    salesOrgName: '',
    startSalesDate: '',
    endSalesDate: '',
  },
  totalNumber:'',//总条数
  ModelShow:false,//弹框显示
  ModelSign:'',//弹框标识 0为销售 1为批量销售
  ids:[],
  obj: {
    mirrorNo:'',
    salesChannelId:'',
    salesChannelCode: '',
    salesChannelName: '',
    salesOrgId: '',
    salesOrgName: '',
    salesRemark: ''
  },
  sureLoding: false,
  sale: { //客户下拉选择的参数
    storeType: '',
    salesOrgName: '',
    page: 1,
    pageSize: 500
  },
  saleList: [],
  sLoading: false,
  totalList:[],
  show: false
};

export default createModel({
  name: 'Sale',
  state: {
    ...initState,
  },
  effects: {
    async PageCloudMirrorSalesDetail (payload) {
      const res = await pageCloudMirrorSalesDetail (payload)
      let list = res.data.items
      list.map((item, index) => {
        item['key'] = index
      })
      if (res.success) {
        this.SET_STATE({
          List: list,
          totalNumber: res.data.totalNumber,
          data: payload,
          TableLoading: false
        })
      } else {
        message.error(res.msg)
      }
    },

    async ListCloudMirrorInvById () { //获取id列表
      const res = await listCloudMirrorInvById ({mirrorNo:''})
      if (res.success) {
        let arr = [] //展示在页面上500条
        let Arr = [] //总条数
        res.data.map((item, index) => { // 数组去重 (全部数据)
          if (Arr.indexOf(item) < 0) {
            Arr.push(item)
          }
        })
        if (Arr.length >= 600) {
          arr = Arr.slice(0,600)
        } else {
          arr = Arr
        }
        this.SET_STATE({ids:arr,totalList: Arr})
      } else {
        message.error(res.msg)
      }
    },

    async InsertCloudMirrorSales (payload,num,object) {
      const res = await insertCloudMirrorSales (payload) //确定
      if (res.success) {
        message.success('销售成功')
        this.SET_STATE({
          obj: {
            mirrorNo:'',
            salesChannelId:'',
            salesChannelCode: '',
            salesChannelName: '',
            salesOrgId: '',
            salesOrgName: '',
            salesRemark: ''
          },
          ModelShow: false,
          sureLoding: false,
          show: false,
        })
        this.PageCloudMirrorSalesDetail(object)
      } else {
        message.error(res.msg)
        this.SET_STATE({sureLoding: false})
      }
    },

    async LIstDealerInfoVo (payload) {
      const res = await ListDealerInfoVo (payload)
      if (res.success) {
        res.data.items.map((item, index) => {
          item['key'] = index + 1
        })
        this.SET_STATE({
          saleList: res.data.items
        })
      } else {
        message.error(res.msg)
      }
    }
  },
  reducers: {
    RESET_STATE(state, payload) {
      return { ...initState };
    },
    SET_STATE(state, payload) {
      Object.keys(payload).forEach((key) => {
        if ((initState[key] !== undefined) && (payload[key] !== undefined)) {
          state[key] = payload[key];
        }
      });
    },
  },
});
