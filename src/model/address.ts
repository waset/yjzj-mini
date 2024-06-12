export const useAddressStore = defineStore('address', {
  state: (): {
    addressList: addresslist[]
    addressString: addressStrs[]
  } => ({
    addressList: [], // 收货地址列表
    addressString: [], // 单独存储一个显示地址的列表
  }),
  getters: {
  },
  actions: {
    // 获取收获地址列表
    async getAddressList(page: number, pageSize: number) {
      const { data, code } = await http.post<addresslist[]>('/web/user/address/list', { page, pageSize }, { auth: true })
      if (code === 200)
        this.addressList = data
    },
    // 新增收获地址
    async newAddress(params: addressReq, str: string) {
      const { data, code } = await http.post<addresslist>('/web/user/address/add', { ...params }, { auth: true })
      if (code === 200)
        // 增加单独存储地址
        this.addressString.push({
          id: data.id,
          str,
        })
      if (code !== 200) {
        return uni.showToast({
          title: '新增地址失败，请重试',
          icon: 'error',
        })
      }
    },
    // 删除地址
    async delAddress(id: number) {
      const { code } = await http.post<delReq>('/web/user/address/delete', { id }, { auth: true })
      const indexs = this.addressString.findIndex(obj => obj.id === id)
      // 检查是否找到了元素
      if (indexs !== -1)
        // 从数组中删除元素
        this.addressString.splice(indexs, 1)
      return code
    },
    // 修改地址
    async editAddress(params: editReq) {
      const { code } = await http.post<editReq>('/web/user/address/edit', { ...params }, { auth: true })
      if (code === 200) {
        return uni.showToast({
          title: '保存地址成功',
          icon: 'success',
        })
      }
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
