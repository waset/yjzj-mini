<script lang="ts" setup>
const emits = defineEmits<{
  writeMark: [count: string]
}>()

// 字数
const txt = ref<string>('')

// 确认备注信息
const sendMark = (txt: string) => {
  emits('writeMark', txt)
}

// 备注列表
const markList = ref<marklist[]>([
  {
    id: '1',
    title: '装win10系统',
  },
  {
    id: '2',
    title: '硬盘分3个区，C盘150g，剩下的分给DE',
  },
  {
    id: '3',
    title: '分DE盘里',
  },
  {
    id: '4',
    title: ' 尽快发货',
  },
])
// 添加备注选项到 备注框
const addMark = (params: string) => {
  txt.value = txt.value.includes(params) ? txt.value.replace(params, '') : txt.value + params
}
</script>

<template>
  <div class="selectItemBox">
    <div
      v-for="(item, index) in markList" :key="index" class="selectItem"
      :class="{ active: txt.indexOf(item.title) !== -1 }" @click="addMark(item.title)"
    >
      {{ item.title }}
    </div>
  </div>

  <div class="txt">
    <textarea id="" v-model="txt" class="textarea" name="" placeholder="建议提前和客服联系。" :maxlength="200" />
    <!-- <input v-model="txt" type="text" class="textarea" placeholder="建议提前和客服联系。"> -->
    <div class="count">
      {{ txt.length }}/200
    </div>
  </div>

  <div class="confirm" @click="sendMark(txt)">
    确定
  </div>
</template>

<style scoped lang="scss">
.selectItemBox {
    width: 610rpx;
    height: 280rpx;
    margin: 0 auto;
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;

    .selectItem {
      // width: 210rpx;
      height: 72rpx;
      padding: 16rpx 24rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      color: #fff;
      border: 2rpx solid #BEBEBE;
      border-radius: 36rpx;
      margin-right: 32rpx;
    }

    .active {
      color: #A7F522;
      border: 2rpx solid transparent;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #3C3C3C, #3C3C3C), linear-gradient(135deg, rgba(#A7F522, 1.0), rgba(#fff, 0.1), rgba(#A7F522, 1.0), );
    }
  }

  .txt {
    position: relative;
    margin: 48rpx auto;
    width: 686rpx;
    height: 470rpx;
    background-color: rgba($color: #5C5C5C, $alpha: 0.5);
    border-radius: 32rpx;
    box-sizing: border-box;
    padding: 32rpx;

    .textarea {
      width: 100%;
      height: 100%;
    }

    .count {
      position: absolute;
      bottom: 32rpx;
      right: 32rpx;
      font-size: 28rpx;
      color: #BEBEBE;

    }
  }

  .confirm {
    width: 440rpx;
    height: 80rpx;
    background-color: #A7F522;
    border-radius: 4rpx;
    margin: 48rpx auto;
    font-size: 28rpx;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center
  }

  .confirm:active {
    background-color: #bcfa52;

  }
</style>
