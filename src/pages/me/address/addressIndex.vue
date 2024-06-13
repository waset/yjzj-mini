<script lang="ts" setup>
import areadata from '@/utils/common/division.json'

const { addressList } = storeToRefs(useAddressStore())
const { getAddressList, newAddress, delAddress, editAddress } = useAddressStore()

// ===== data ===================================
const area = areadata
const page = ref<number>(1)

// 新增地址请求参数
const addReqParams = ref<addressReq>({
  address: '',
  cityCode: '',
  countryCode: '',
  isDefault: 1, // 默认（1：是 2：否）
  phone: '',
  provinceCode: '',
  username: '',
})

// 要删除或者编辑的 id
const delOrEditID = ref<number>(0)

//  1 是新增 2 是编辑
const popupName = ref<number>(1)
// 开关 新增或者编辑弹出层
const AddressshowPop = ref<boolean>(false)

// 提示删除弹窗开关
const showModel = ref<boolean>(false)
const icon = ref<'i-svg-info' | 'i-svg-success' | 'i-svg-error' | 'i-svg-warn'>('i-svg-error')

// 索引
const multiIndex = ref<number[]>([0, 0, 0])
// 当前地址数组
const newAddressList = ref<any>([
  [],
  [],
  [],
])

// ===== methods =====================================

// 初始化数据
const initAddress = () => {
  newAddressList.value[0] = area.map((item: areaData) => {
    const obj = ref<areaData>({
      label: item.label,
      value: item.value,
    })
    return obj
  })
  newAddressList.value[1] = area[multiIndex.value[0]].children.map((item: areaData) => {
    const obj = ref<areaData>({
      label: item.label,
      value: item.value,
    })
    return obj
  })
  newAddressList.value[2] = area[multiIndex.value[0]].children[multiIndex.value[1]].children.map((item: areaData) => {
    const obj = ref<areaData>({
      label: item.label,
      value: item.value,
    })
    return obj
  })
}
// 选择地址 确认
const bindPickerChange = () => {
  // 地址拼接的字符串
  addReqParams.value.provinceCode = newAddressList.value[0][multiIndex.value[0]].value.value
  addReqParams.value.cityCode = newAddressList.value[1][multiIndex.value[1]].value.value
  addReqParams.value.countryCode = newAddressList.value[2][multiIndex.value[2]].value.value
}
// 互动选择器第几列
const pickerColumnchange = (e: any) => {
  if (e.detail.column === 0) {
    multiIndex.value[0] = e.detail.value
    newAddressList.value[0].value = area.map((item) => {
      const obj = ref<areaData>({
        label: item.label,
        value: item.value,
      })
      return obj
    })
    newAddressList.value[1] = area[multiIndex.value[0]].children.map((item) => {
      const obj = ref<areaData>({
        label: item.label,
        value: item.value,
      })
      return obj
    })
    newAddressList.value[2] = area[multiIndex.value[0]].children[multiIndex.value[1]].children.map((item) => {
      const obj = ref<areaData>({
        label: item.label,
        value: item.value,
      })
      return obj
    })
    multiIndex.value.splice(1, 1, 0)
    multiIndex.value.splice(2, 1, 0)
  }
  if (e.detail.column === 1) {
    multiIndex.value[1] = e.detail.value
    newAddressList.value[2] = area[multiIndex.value[0]].children[multiIndex.value[1]].children.map((item) => {
      const obj = ref<areaData>({
        label: item.label,
        value: item.value,
      })
      return obj
    })
    // 第二列 滑动 第三列 变成第一个
    multiIndex.value.splice(2, 1, 0)
  }
  if (e.detail.column === 2) {
    multiIndex.value[2] = e.detail.value
  }
}
// 显示
const labelsToRender = computed(() => {
  return [
    newAddressList.value[0] && newAddressList.value[0][multiIndex.value[0]] ? newAddressList.value[0][multiIndex.value[0]].value.label : '',
    newAddressList.value[1] && newAddressList.value[1][multiIndex.value[1]] ? newAddressList.value[1][multiIndex.value[1]].value.label : '',
    newAddressList.value[2] && newAddressList.value[2][multiIndex.value[2]] ? newAddressList.value[2][multiIndex.value[2]].value.label : '',
  ]
})
// 打开 新增地址弹窗
const newAdd = () => {
  AddressshowPop.value = true
}

// ** 新增保存 && 编辑保存**
const saveAddress = async () => {
  // 新增
  const newSave = async () => {
    try {
      await newAddress(addReqParams.value)
      // 获取地址列表
      AddressshowPop.value = false
      await getAddressList(page.value, 10)
    }
    catch (error) {
      // 捕获并处理任何可能发生的错误
      uni.showToast({
        title: '网络错误，请检查网络连接',
        icon: 'error',
        mask: true,
      })
    }
  }
  // 编辑

  const editFn = async () => {
    try {
      await editAddress(addReqParams.value)
      await getAddressList(page.value, 10)
      AddressshowPop.value = false
    }
    catch (error) {

    }
  }
  popupName.value === 1 ? newSave() : editFn()
}

// ** 删除地址 **
const delAddressFn = (id: number) => {
  showModel.value = true
  delOrEditID.value = id
}
const deleteAddressFn = async () => {
  try {
    const response = await delAddress(delOrEditID.value)
    if (response !== 200) {
      uni.showToast({
        title: '删除失败，请稍后重试~',
        icon: 'error',
        mask: true,
      })
    }
    else {
      showModel.value = false
      await getAddressList(page.value, 10)
    }
  }
  catch (error) {
    // 处理可能的网络错误或其他异常
    uni.showToast({
      title: '网络错误，请检查网络连接',
      icon: 'error',
      mask: true,
    })
  }
}

//  ** 设置为默认地址  **
const setDefaultFn = async (item: addresslist, index: number) => {
  if (item.isDefault === 2)
    addressList.value[index].isDefault = 1
  await editAddress(item)
  await getAddressList(page.value, 10)
}

// **  编辑地址 **
const editAddressFn = (data: addresslist) => {
  popupName.value = 2
  AddressshowPop.value = true
  addReqParams.value = JSON.parse(JSON.stringify(data))
  // nowAddressCode.value = [data.provinceCode, data.cityCode, data.countryCode]
}
onShow(async () => {
  // 获取地址列表
  await getAddressList(page.value, 10)
})
onMounted(() => {
  // 初始化数据
  initAddress()
})
</script>

<template>
  <div>
    <navbar-home text="收货地址" />
    <common-model :show="showModel" msg="确认删除该地址吗？" :icon="icon" @ok="deleteAddressFn" @cancel="showModel = false" />
    <div class="myaddress">
      <address-item-card
        :addressdata="addressList" @delete-address="delAddressFn" @set-default="setDefaultFn"
        @edit-address="editAddressFn"
      />
      <div class="newAddress" @click="newAdd()">
        新增收货地址
      </div>
    </div>
    <common-popup v-model:show="AddressshowPop" :name="popupName === 1 ? '新增地址' : '编辑地址'">
      <div class="config">
        <div class="inputBox">
          <div class="row">
            <div>收货人</div>
            <input v-model="addReqParams.username" type="text">
          </div>
          <div class="row">
            <div>联系电话</div>
            <input v-model="addReqParams.phone" type="text">
          </div>
          <div class="row">
            <div>收获地址</div>
            <picker
              mode="multiSelector" :value="multiIndex" :range="newAddressList" range-key="label"
              @change="bindPickerChange" @columnchange="pickerColumnchange"
            >
              <div class="input">
                <span v-for="(label, index) in labelsToRender" :key="index">{{ addReqParams.provinceCode === '' ? ''
                  : label }}</span>
                <div class="i-icons-left" />
              </div>
            </picker>
          </div>
          <div class="textareaBox">
            <div class="textarea">
              <textarea id="" v-model="addReqParams.address" name="" />
            </div>
          </div>

          <div class="check" @click="addReqParams.isDefault = addReqParams.isDefault === 1 ? 2 : 1">
            <div v-if="addReqParams.isDefault === 1" class="default">
              <div class="i-icons-correct" style="color: #000;" />
            </div>
            <div v-if="addReqParams.isDefault === 2" class="not" />
            <div>设为默认地址</div>
          </div>
        </div>

        <div class="confirm" @click="saveAddress()">
          保存
        </div>
      </div>
    </common-popup>
  </div>
</template>

<style lang="scss" scoped>
$theme: #A7F522;

.myaddress {
  padding-top: 32rpx;

  .newAddress {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    width: 440rpx;
    border-radius: 4rpx;
    height: 80rpx;
    position: fixed;
    bottom: 32rpx;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28rpx;
    background-color: $theme;
  }

}

.config {
  .inputBox {
    width: 686rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .row {
      margin: 32rpx auto 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 686rpx;
      height: 80rpx;
      font-size: 28rpx;
      color: #F5F5F5;

      input {
        border-radius: 10rpx;
        width: 542rpx;
        height: 80rpx;
        background-color: #4C4C4C;
        padding-left: 24rpx;
        box-sizing: border-box;
      }

      .input {
        position: relative;
        border-radius: 10rpx;
        width: 542rpx;
        height: 80rpx;
        box-sizing: border-box;
        line-height: 80rpx;
        text-align: left;

        background-color: #4C4C4C;
        padding-left: 24rpx;

        .i-icons-left {
          position: absolute;
          right: 32rpx;
          top: 24rpx;
          transform: rotate(270deg);
        }
      }

    }

    .textareaBox {

      width: 100%;
      padding-left: 144rpx;
      box-sizing: border-box;

      .textarea {
        width: 542rpx;
        height: 160rpx;
        border-radius: 10rpx;
        background-color: #4C4C4C;
        margin-top: 32rpx;
        box-sizing: border-box;
        padding: 20rpx 24rpx;

        textarea {
          width: 100%;
          height: 100%;
        }
      }

    }

    .check {
      display: flex;
      align-items: center;
      float: left;
      font-size: 28rpx;
      margin-top: 50rpx;

      .default {
        width: 48rpx;
        height: 48rpx;
        border: 2rpx solid #fff;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: #A7F522;
        margin-right: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;

      }

      .not {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        border: 2rpx solid #fff;
        box-sizing: border-box;
        margin-right: 16rpx;

      }
    }

  }

  .confirm {
    width: 440rpx;
    height: 80rpx;
    background-color: #A7F522;
    border-radius: 4rpx;
    margin: 148rpx auto 0;
    font-size: 28rpx;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .confirm:active {
    background-color: #bcfa52;

  }
}
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
