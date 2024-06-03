<script lang="ts" setup>
import { useStore } from '@/plugins/pinia'

const props = defineProps<{
  showpop: boolean
}>()
const emits = defineEmits<{
  setShow: [showpop: boolean]
}>()
const state = useStore()
// 隐藏mask
const hiddenMask = (params: boolean) => {
  emits('setShow', params)
}
// 地址
const addressStr = ref<string>('')
// 用户名
const userName = ref<string>('')
// 手机号
const mobile = ref<string>('')
// 详细地址
const addressInfo = ref<string>('')
// 默认地址
const isDefault = ref<boolean>(false)

// 选择地址
const bindPickerChange = (e: any) => {
  addressStr.value = e.detail.value.join(',')
}
const saveAddress = () => {
  state.setUserInfo({ username: userName.value, mobile: mobile.value, address: addressStr.value, addressInfo: addressInfo.value, isDefault: isDefault.value })
  hiddenMask(false)
}
</script>

<template>
  <div class="mask" :class="{ showmask: props.showpop, hiddenmask: !props.showpop }">
    <div :class="[props.showpop ? 'popup' : 'hiddenPop']">
      <div class="titlebgc">
        <div style="font-size: 36rpx;">
          新增地址
        </div>
        <div style="font-size: 44rpx;" @click.stop="hiddenMask(false)">
          ×
        </div>
      </div>

      <div class="inputBox">
        <div class="row">
          <div>收货人</div>
          <input v-model="userName" type="text">
        </div>
        <div class="row">
          <div>联系电话</div>
          <input v-model="mobile" type="text">
        </div>
        <div class="row">
          <div>收获地址</div>
          <picker mode="region" @change="bindPickerChange">
            <div class="input">
              {{ addressStr }}
            </div>
          </picker>
        </div>
        <div class="textareaBox">
          <div class="textarea">
            <textarea id="" v-model="addressInfo" name="" />
          </div>
        </div>

        <div class="check" @click="isDefault = !isDefault">
          <div v-show="isDefault" class="default" />
          <div v-show="!isDefault" class="not" />
          <div>设为默认地址</div>
        </div>
      </div>

      <div class="confirm" @click="saveAddress()">
        保存
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  display: none;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 19;

}

@keyframes test2 {
  0% {
    display: none;
  }

  100% {
    display: block;
  }
}

@keyframes test2R {
  0% {
    // opacity: 1;
    display: block;
  }

  100% {
    display: none;
    // opacity: 0;
  }
}

@keyframes test {
  0% {
    height: 0;
  }

  100% {
    height: 1140rpx;
  }
}

@keyframes testR {
  0% {
    height: 1140rpx;
  }

  100% {
    height: 0;
  }
}

.showmask {
  display: block;
  opacity: 1;
  animation: test2 0.5s ease;
}

.hiddenmask {
  animation: test2R 0.5s ease;
  opacity: 0;
}

.hiddenPop {
  animation: testR 0.5s ease;
  opacity: 0;
}

.popup {
  width: 750rpx;
  height: 1140rpx;
  background-color: #272727;
  position: fixed;
  bottom: 0;
  z-index: 999;
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;
  animation: test 0.55s ease;

  .titlebgc {
    box-sizing: border-box;
    padding: 8rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 32rpx auto 0;
    width: 686rpx;
    height: 72rpx;
    background-image: linear-gradient(135deg, rgba(190, 190, 190, 0), rgba(190, 190, 190, 0.4), rgba(190, 190, 190, 0.4), rgba(190, 190, 190, 0));
  }

  .inputBox {
    width: 686rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    // align-items: flex-end;

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
        border-radius: 10rpx;
        width: 542rpx;
        height: 80rpx;
        box-sizing: border-box;
        line-height: 80rpx;
        text-align: left;

        background-color: #4C4C4C;
        padding-left: 24rpx;
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
