export const useAddressStore = defineStore('address', {
  state: (): {
    addressList: addresslist[]
    nowAddress: addresslist
    chooseid?: addresslist['id']
  } => ({
    addressList: [], // 收货地址列表
    nowAddress: {
      address: '',
      cityCode: '',
      countryCode: '',
      createdAt: '',
      deletedAt: null,
      id: 0,
      isDefault: 0,
      phone: '',
      provinceCode: '',
      status: 0,
      updatedAt: '',
      userID: 0,
      username: '',
    }, // 当前选择的地址
  }),
  getters: {
    // 当前选择的地址 如没有选择则返回默认地址
    defaultAddress(state) {
      if (state.chooseid) {
        return state.addressList.find(item => item.id === state.chooseid) || state.nowAddress
      }
      return state.addressList.find(item => item.isDefault === 1) || state.nowAddress
    },
  },
  actions: {
    // 下单时重新选择地址
    changeAddress(id: addresslist['id']) {
      this.chooseid = id
    },
    // 获取收获地址列表
    async getAddressList(page: number, pageSize: number) {
      const { data, code } = await http.post<addresslist[]>('/web/user/address/list', { page, pageSize }, { auth: true })
      if (code === 200)
        this.addressList = data
    },
    // 新增收获地址
    async newAddress(params: addressReq) {
      const { code } = await http.post<addresslist>('/web/user/address/add', { ...params }, { auth: true })
      if (code !== 200)
        uni.showToast({
          title: '保存地址失败，请稍后重试~',
          icon: 'error',
          mask: true,
        })
    },
    // 删除地址
    async delAddress(id: number) {
      const { code } = await http.post<delReq>('/web/user/address/delete', { id }, { auth: true })
      return code
    },
    // 修改地址
    async editAddress(params: editReq) {
      const { code } = await http.post<editReq>('/web/user/address/edit', { ...params }, { auth: true })
      if (code !== 200) {
        return uni.showToast({
          title: '保存地址失败,请重试',
          icon: 'error',
        })
      }
    },

  },
  persist: true,
})
