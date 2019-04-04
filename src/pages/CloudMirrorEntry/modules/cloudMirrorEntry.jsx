import { createModel } from '@souche-f2e/uniqlo';
import { message } from 'antd'
import moment from 'moment'
import {queryCloudMirrorInvDetail,downloadTemplate,cloudMirrorAssetEntry,cloudMirrorAssetEdit} from '@/services/getData'
// 初始化数据
const initState = Object.freeze({
  flag: true,
  data:{
    page:1,
    pageSize: 10,
    keyWord: '',
    startProduceDate: '',
    endProduceDate: '',
    startInputDate:'',
    endInputDate: ''
  },
  produce_date: [],
  input_date: [],
  date: [],
  loading: false,
  newSetvisible: false,
  Editvisible: false,
  ID: '',
  newSet: { // 新建的参数
    mirrorNo:'',
    produceDate: '',
    inputRemark: ''
  },
  obj: {},  // 编辑
  // 编辑参数
  editobj: {
    id: '',
    newMirrorNo: '',
    inputRemark: ''
  },
  tableList: [],
  totalNumber: '',
  saveLoading: false,
  editLoadng: false,
  inToLoading: false
})

export default createModel({
  name:'cloudMirrorEntry',

  state: {
    ...initState,
  },

  effects: {
    async QueryCloudMirrorInvDetail (payload) {
      const res = await queryCloudMirrorInvDetail (payload)
        if (res.success) {
          let list = res.data.items
          list.map((item, index) => {
          item['key'] = item.id
        })
        this.SET_STATE({
          tableList: list,
          totalNumber: res.data.totalNumber,
          loading: false,
          data: payload
        })
      } else {
        message.error(res.msg)
        this.SET_STATE({
          loading: false,
        })
      }
    },




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

