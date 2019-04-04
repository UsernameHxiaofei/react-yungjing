let obj = {
  quality: [  // 云镜质量的下拉列表
    {id: '600255000', code: '600255000', name: '正常'},
    {id: '600255005', code: '600255005', name: '报废'}
  ],

  DistributionChannel: [ // 销售渠道
    {id: '600155000', code: '600155000', name: '集团'},
    {id: '600155005', code: '600155005', name: '4S店'},
  ],

  IsActivated: [  // 是否激活
    {value: 0, name: '未激活'},
    {value: 1, name: '已激活'}
  ],

  IsInstalled: [ // 是否安装
    {value: 0, name: '未安装'},
    {value: 1, name: '已安装'}
  ],

  IsSell: [  // 是否销售
    {value: 0, name: '未销售'},
    {value: 1, name: '已销售'}
  ],

  IsScrapped: [ // 是否报废
    {value: 0, name: '未报废'},
    {value: 1, name: '已报废'}
  ],

  IsDelete: [ // 是否逻辑删除
    {value: 0, name: '否'},
    {value: 1, name: '是'}
  ],

  OperationType: [ // 操作类型
    {id:60035000, value: '60035000', name: '云镜录入'},
    {id:60035005, value: '60035005', name: '云镜Id修改'},
    {id:60035010, value: '60035010', name: '云镜销售'},
  ]
}
export default obj
