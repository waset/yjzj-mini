<script lang="ts" setup>
const props = defineProps<{
  showpop: boolean
}>()

const emits = defineEmits<{
  setShow: [showpop: boolean]
  writeMark: [count: string]
}>()

// 字数
const txt = ref<string>('')

interface marklist {
  id: string
  title: string
}

// 隐藏mask
const hiddenMask = (params: boolean) => {
  emits('setShow', params)
}
// 确认备注信息
const sendMark = (txt: string) => {
  emits('setShow', false)
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
  if (txt.value.includes(params)) {
    // 包含
    txt.value = txt.value.replace(params, '')
  }
  else {
    txt.value = txt.value + params
  }
}
</script>

<template>
  <div class="mask" :class="{ showmask: props.showpop, hiddenmask: !props.showpop }">
    <div :class="[props.showpop ? 'popup' : 'hiddenPop']">
      <div class="titlebgc">
        <div style="font-size: 36rpx;">
          备注
        </div>
        <div style="font-size: 44rpx;" @click.stop="hiddenMask(false)">
          ×
        </div>
      </div>

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
        <div class="count">
          {{ txt.length }}/200
        </div>
      </div>

      <div class="confirm" @click="sendMark(txt)">
        确定
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
        margin: 32rpx auto 48rpx;
        width: 686rpx;
        height: 72rpx;
        background-image: linear-gradient(135deg, rgba(190, 190, 190, 0), rgba(190, 190, 190, 0.4), rgba(190, 190, 190, 0.4), rgba(190, 190, 190, 0));
    }

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
}
</style>
