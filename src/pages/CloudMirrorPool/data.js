 let obj = {
  // 云镜质量的下拉列表
  quality: [
    {id: '600255000', code: '600255000', name: '正常'},
    {id: '600255005', code: '600255005', name: '报废'}
  ],

  // 销售渠道
  DistributionChannel: [
    {id: '600155000', code: '600155000', name: '集团'},
    {id: '600155005', code: '600155005', name: '4S店'},
  ],

  // 是否激活
  IsActivated: [
    {value: 0, name: '未激活'},
    {value: 1, name: '已激活'}
  ],

  // 是否安装
  IsInstalled: [
    {value: 0, name: '未安装'},
    {value: 1, name: '已安装'}
  ],

  // 是否销售
  IsSell: [
    {value: 0, name: '未销售'},
    {value: 1, name: '已销售'}
  ],

  // 是否报废
  IsScrapped: [
    {value: 0, name: '未报废'},
    {value: 1, name: '已报废'}
  ],

  // 是否逻辑删除
  IsDelete: [
    {value: 0, name: '否'},
    {value: 1, name: '是'}
  ],

  // 操作类型
  OperationType: [
    {id:60035000, value: 60035000, name: '云镜录入'},
    {id:60035005, value: 60035005, name: '云镜Id修改'},
    {id:60035010, value: 60035010, name: '云镜销售'},
  ]
}
export default obj
