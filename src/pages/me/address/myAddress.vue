<script lang="ts" setup>
const { addressList, addressStrIng } = storeToRefs(useAddressStore())
const { getAddressList, newAddress, delAddress, editAddress } = useAddressStore()
// 当前页数
const page = ref<number>(1)
onShow(async () => {
  // 获取地址列表
  await getAddressList(page.value, 10)
})

//  开关 地址新增 弹出层
const AddressshowPop = ref<boolean>(false)
// 提示删除弹窗开关
const showModel = ref<boolean>(false)
const icon = ref<'i-svg-info' | 'i-svg-success' | 'i-svg-error' | 'i-svg-warn'>('i-svg-error')

// 当前点击的地址id
const activeId = ref<number>(0)

// 接收当前点击的id
const receiveId = async (id: number) => {
  activeId.value = id
  showModel.value = true
}

// 执行删除  并 关闭弹窗  刷新列表
const deleteAddressFn = async () => {
  const code = await delAddress(activeId.value)
  if (code === 200)
    showModel.value = false
  await getAddressList(page.value, 10)
}

// 修改默认地址
const setDefaultFn = async (item: addresslist) => {
  if (item.isDefault === 2)
    item.isDefault = 1
  await editAddress(item)
  await getAddressList(page.value, 10)
}
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
// 显示的地址
const addressStr = ref<string>('')
const popupName = ref<string>('新增地址')
// 当前编辑地址的code
const nowAddressCode = ref<string[]>([])
// 修改地址 打开弹窗
const editAddressFn = (data: addresslist) => {
  popupName.value = '编辑地址'
  AddressshowPop.value = true
  addReqParams.value = data

  nowAddressCode.value = [data.provinceCode, data.cityCode, data.countryCode]

  // 找出符合单前地址的对象
  addressStr.value = addressStrIng.value.find(item => item.id === data.id)?.str ?? ''
}
//  新增地址 打开弹窗
const newAdd = () => {
  popupName.value = '新增地址'
  addReqParams.value = {
    address: '',
    cityCode: '',
    countryCode: '',
    isDefault: 1, // 默认（1：是 2：否）
    phone: '',
    provinceCode: '',
    username: '',

  }
  nowAddressCode.value = []
  addressStr.value = ''
  AddressshowPop.value = true
}

// 选择地址
const bindPickerChange = (e: any) => {
  // 地址拼接的字符串
  addressStr.value = e.detail.value.join(',')
  addReqParams.value.provinceCode = e.detail.code[0]
  addReqParams.value.cityCode = e.detail.code[1]
  addReqParams.value.countryCode = e.detail.code[2]
}
// 新增地址保存  调接口
const saveAddress = async () => {
  // 新增地址 ==> 获取地址列表
  if (popupName.value === '新增地址') {
    const str = ref<string>('')
    str.value = addressStr.value
    await newAddress(addReqParams.value, str.value)
    await getAddressList(page.value, 10)
    AddressshowPop.value = false
  }
  else {
  // 编辑保存地址
    await editAddress(addReqParams.value)
    await getAddressList(page.value, 10)
    AddressshowPop.value = false
  }
}
</script>

<template>
  <div>
    <navbar-home text="收货地址" />
    <common-model :show="showModel" msg="确认删除该地址吗？" :icon="icon" @ok="deleteAddressFn" @cancel="showModel = false" />
    <div class="myaddress">
      <address-item-card
        :addressdata="addressList" :address-str="addressStrIng" @delete-address="receiveId"
        @set-default="setDefaultFn" @edit-address="editAddressFn"
      />
      <div class="newAddress" @click="newAdd">
        新增收货地址
      </div>
    </div>
    <common-popup v-model:show="AddressshowPop" :name="popupName">
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
            <picker mode="region" :value="nowAddressCode" @change="bindPickerChange">
              <div class="input">
                {{ addressStr }}
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
