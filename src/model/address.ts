export const useAddressStore = defineStore('address', {
  state: (): {
    addressList: addresslist[]
    nowAddress: addresslist
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

  },
  actions: {
    // 获取收获地址列表
    async getAddressList(page: number, pageSize: number) {
      const { data, code } = await http.post<addresslist[]>('/web/user/address/list', { page, pageSize }, { auth: true })
      if (code === 200)
        this.addressList = data
      this.addressList.forEach((item) => {
        if (item.isDefault === 1) {
          this.nowAddress = item
        }
      })
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
      if (id === this.nowAddress.id) {
        this.nowAddress = {
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
        }
      }
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

    async demoAddress() {
      this.addressList.push({
        address: '3213',
        cityCode: '110100000000',
        countryCode: '110101000000',
        createdAt: '2024-06-13 11:34:18',
        deletedAt: null,
        id: 108,
        isDefault: 1,
        phone: '213213',
        provinceCode: '110000000000',
        status: 1,
        updatedAt: '2024-06-13 11:34:18',
        userID: 104,
        username: 'sun',
      })
    },

  },
  persist: true,
})
