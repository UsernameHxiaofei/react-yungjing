import { createModel } from '@souche-f2e/uniqlo';
import {message} from 'antd'
import {queryCloudMirrorInvDetails,queryCloudMirrorInvById,pageCloudMirrorLogDetail} from '@/services/getData'
// 初始化数据
const initState = Object.freeze({
  data: {
    page: 1,
    pageSize: 10,
    keyWord: '',
    statusCode: '',
    startProduceDate: '',
    endProduceDate: '',
    startInputDate: '',
    endInputDate: '',
    isSales: '',
    salesChannelCode: '',
    salesOrgName: '',
    startSalesDate: '',
    endSalesDate: '',
    orgName: '',
    isInstall: '',
    modelCar: '',
    carOwner: '',
    isActive: '',
    startInstallDate: '',
    endInstallDate: '',
    startActiveDate: '',
    endActiveDate: ''
  },
  searchloading: false,
  Infovisible: false,
  Memarryvisible: false,
  produce_date: [], //生产日期
  input_date: [], //录入日期
  state_date:[],
  AN_date: [],
  tableList: [],
  totalNumber:'',
  Id:'',
  infoObj:{},

  // 云镜录入
  dates:[],
  IntObj: {
    page: 1,
    pageSize: 10,
    mirrorId: '',
    optTypeCode: '',
    startCreateDate: '',
    endCreateDate: ''
  },
  TimeList:[],
  totalNumber: '',
  loading: false
})

export default createModel({
  name:'cloudMirrorPool',

  state: {
    ...initState,
  },
  // 异步修改数据
  effects: {
    async QueryCloudMirrorInvDetail (payload) { //获取表格的数据
      const res = await queryCloudMirrorInvDetails (payload)
      if (res.success) {
        res.data.items.map((item, index) => {
          item['key'] = item.id
        })
        this.SET_STATE({
          tableList: res.data.items,
          totalNumber: res.data.totalNumber,
          searchloading: false,
          data: payload
        })
      } else {
        this.SET_STATE({
          loading: false
        })
        message.success(res.msg)
      }
    },

    async QueryCloudMirrorInvById (obj) { //根据id查询详情
      const res = await queryCloudMirrorInvById (obj)
      if (res.success) {
        this.SET_STATE({
          infoObj: res.data
        })
      } else {
        message.error(msg)
      }
    },

  async PageCloudMirrorLogDetail (payload) { //获取记录详情的数据
    const res = await pageCloudMirrorLogDetail (payload)
    if (res.success) {
      res.data.items.map((item, index) => {
        item['key'] = index + 1
      })
      this.SET_STATE({
        TimeList: res.data.items,
        totalNumber: res.data.totalNumber,
        loading: false,
        IntObj: payload
      })
    } else {
      message.error(res.msg)
    }
  }



  },
  reducers: {
    RESET_STATE (state, payload) {
      return { ...initState}
    },


    SET_STATE (state, payload) {
      console.log(payload)
      Object.keys(payload).forEach( (key) => {
        if (state[key] !== undefined && payload[key] !== undefined) {
          state[key] = payload[key]
        }
      })
    }
  }
})
