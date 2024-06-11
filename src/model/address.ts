export const useAddressStore = defineStore('address', {
  state: (): {
    addressList: addresslist[]
    addressStrIng: addressStrs[]
  } => ({
    addressList: [], // 收货地址列表
    addressStrIng: [], // 单独存储一个显示地址的列表
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
        this.addressStrIng.push({
          id: data.id,
          str,
        })
    },
    // 删除地址
    async delAddress(id: number) {
      const { code } = await http.post<delReq>('/web/user/address/delete', { id }, { auth: true })
      const indexs = this.addressStrIng.findIndex(obj => obj.id === id)
      // 检查是否找到了元素
      if (indexs !== -1)
        // 从数组中删除元素
        this.addressStrIng.splice(indexs, 1)
      return code
    },
    // 修改地址
    async editAddress(params: editReq) {
      await http.post<editReq>('/web/user/address/edit', { ...params }, { auth: true })
    },

  },
  persist: true,
})
