export const useDiyStore = defineStore('diy', {
  state: (): {
    gamesList: gamesList[]
    ModificationList: any
  } => ({
    gamesList: [],
    ModificationList: [],
  }),
  actions: {
    // 获取游戏列表
    async getGamesList() {
      const { code, data } = await http.post<gamesList[]>('/web/game/list', { page: 1, pageSize: 1000 }, { auth: false })

      if (code === 200) {
        this.gamesList = data
        return data
      }
    },
    // 获取游戏性能
    async getGamePower(params: powerParams) {
      const { code, data } = await http.post<FpsPowerRes[]>('/web/game/performance/list', params, { auth: false })
      if (code === 200) {
        return data
      }
    },
    // 获取改配的列表`
    async getModificationList(params: Modification) {
      if (params.page === 1) {
        this.ModificationList = []
      }
      const { code, data } = await http.post('/web/product/list/by/params', params, { auth: false })
      if (code === 200) {
        const res = cycleData(data)
        this.ModificationList = [...this.ModificationList, ...res]
      }
    },

    // 获取配置单列表
    async configurationList(params: configurationListReq) {
      await http.post('/web/product/config/list', params, { auth: false })
    },

    // 新增配置单
    async addConfiguration(params: addConfiguration) {
      const { code, data } = await http.post('/web/product/config/add', params)
      if (code === 200) {
        return data
      }
    },
    // 下单
    async submit(params: submitReq) {
      await http.post('/web/order/add', params)
    },

    // 获取配置的筛选条件
    async getFilter() {
      await http.post('/web/product/type/param/list', { ids: [2000] }, { auth: false })
    },

    // 获取配置的筛选条件
    async getAllParams(params: getAllParams) {
      const { code, data } = await http.post<AllParamsRes[]>('/web/product/type/param/children', params, { auth: false })
      if (code === 200) {
        return data
      }
    },

    // 收藏配置单
    // /web/product/config/add
    async collectionConfig(No: string) {
      const { code } = await http.post('/web/user/product/config/collect', { productConfigNo: No })
      return code
    },

    // 获取配置单详情
    async getConfigInfo(id: number) {
      const { data } = await http.post('/web/product/config/info', { id })
      return data
    },

  },
})

function cycleData(data: any) {
  const { detail } = storeToRefs(useProductStore())
  const _params: {
    num: number
    product: any
    tagTitle: string
    typeID: number
  }[] = []
  detail.value?.params.forEach((item, index) => {
    _params[index] = {
      num: 1,
      product: item.product,
      tagTitle: item.paramDesc,
      typeID: Number(item?.product?.typeID) || Number(item.content),
    }
  })

  data.forEach((item: any, index: number) => {
    const idx = _params.findIndex(v => v.tagTitle === item.typeName)
    if (index === -1) {
      return
    }
    const errs = getCompactErrors(_params, idx, item)
    const uniqueData = [...new Map(errs.map(item => [item.message, item])).values()]
    data[index].errors = uniqueData
  })

  return data
}

function getCompactErrors(sourceParams: any, paramsIndex: any, data: any) {
  if (paramsIndex < 0)
    return []
  const { cloned } = useCloned(sourceParams)
  cloned.value[paramsIndex] = {
    tagTitle: data.typeName,
    typeID: data.typeID, // 商品类型ID
    product: {
      id: data.id,
      sellPrice: data.sellPrice,
      banner: data.banner,
      params: data.params,
      name: data.name,
    },
    num: 1,
  }
  return createErrors(cloned.value)
}
