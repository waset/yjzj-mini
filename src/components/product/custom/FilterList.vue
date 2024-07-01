<script setup lang="ts">
const props = defineProps<{
  value: Modification
}>()
const emit = defineEmits<{
  'update:value': [value: Modification]
  'change': [value: Modification]
}>()

const { getAllParams } = useDiyStore()

// 筛选弹窗开关
const filte = ref(false)

// 筛选选项
const filterRes = ref<AllParamsRes[]>()

const show = async () => {
  const data = await getAllParams({
    productTypeID: props.value.productTypeID,
    page: 0,
    pageSize: 10,
  })
  filterRes.value = data

  filte.value = true
}

const selectRes = ref<{
  [key in Required<ProductParm>['id']]: ProductParm['v']
}>({})

const selected = (id: number, index: number | string | null, val: any) => {
  if (!selectRes.value[id]) {
    selectRes.value[id] = {}
  }
  if (index !== null) {
    if (selectRes.value[id][index] !== undefined) {
      if (selectRes.value[id][index]) {
        delete selectRes.value[id][index]
      }
      else {
        selectRes.value[id][index] = val
      }
    }
    else {
      selectRes.value[id][index] = val
    }
  }
  else {
    selectRes.value[id] = val
  }
}

// 确定筛选项
const confirmFn = () => {
  filte.value = false

  const res: ProductParm[] = []

  Object.keys(selectRes.value).forEach((item: any) => {
    if (selectRes.value[item]) {
      let value: any
      if (Object.hasOwn(selectRes.value[item], 'max') || Object.hasOwn(selectRes.value[item], 'min')) {
        value = selectRes.value[item]
      }
      else {
        value = []
        Object.values(selectRes.value[item]).forEach((v: any) => {
          value.push(v)
        })
      }
      res.push({
        id: Number(item),
        v: value,
      })
    }
  })

  emit('update:value', {
    ...props.value,
    params: res,
  })
  emit('change', {
    ...props.value,
    params: res,
  })
}

defineExpose({
  show,
})
</script>

<template>
  <div class="filters">
    <common-popup :show="filte" name="筛选" @close="filte = false">
      <div class="box">
        <template v-for="(list, index) in filterRes" :key="index">
          <template v-if="list.isGroup">
            <div class="item">
              <div class="title">
                {{ list.desc }}
                <div class="line" />
              </div>
              <div class="lists">
                <div class="list">
                  <template v-if="list.type === 'text'">
                    <input
                      class="input" confirm-type="search" :placeholder="`${list.desc}`"
                      :value="selectRes[list.id] || ''" @confirm="(e: any) => selected(list.id, null, e?.detail?.value)"
                    >
                  </template>
                  <template v-if="list.type === 'num'">
                    <input
                      class="input" type="number" confirm-type="search" :placeholder="`${list.desc}`"
                      :value="(selectRes[list.id] && selectRes[list.id].min) || ''"
                      @confirm="(e: any) => selected(list.id, 'min', Number(e?.detail?.value))"
                    >
                    <span>-</span>
                    <input
                      class="input" type="number" confirm-type="search" :placeholder="`${list.desc}`"
                      :value="(selectRes[list.id] && selectRes[list.id].max) || ''"
                      @confirm="(e: any) => selected(list.id, 'max', Number(e?.detail?.value))"
                    >
                  </template>
                  <template v-if="list.type === 'singleOption'">
                    <template v-for="(item, i) in JSON.parse(list.content)" :key="i">
                      <div
                        class="option" :class="{
                          active: selectRes[list.id] && (selectRes[list.id][i] === item),
                        }" @click="selected(list.id, i, item)"
                      >
                        {{ item }}
                      </div>
                    </template>
                  </template>
                  <template v-if="list.type === 'multipleOption'">
                    <template v-for="(item, i) in JSON.parse(list.content)" :key="i">
                      <div
                        class="option" :class="{
                          active: selectRes[list.id] && (selectRes[list.id][i] === item),
                        }" @click="selected(list.id, i, item)"
                      >
                        {{ item }}
                      </div>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </template>
        <div class="btns">
          <div
            class="btn" @click="() => {
              selectRes = {};
            }"
          >
            重置
          </div>
          <div class="btn confirm" @click="confirmFn">
            确定
          </div>
        </div>
      </div>
    </common-popup>
  </div>
</template>

<style lang="scss" scoped>
  .filters {
    .box {
      padding-bottom: calc(80rpx + env(safe-area-inset-bottom));

      .item {
        .title {
          font-size: 28rpx;
          font-weight: 600;
          line-height: 40rpx;
          display: inline-block;
          position: relative;
          z-index: 2;

          .line {
            background-color: rgba(167, 245, 34, .6);
            position: absolute;
            width: 100%;
            height: 12rpx;
            transform: translateY(-18rpx);
            z-index: -1;

          }
        }

        .lists {
          padding-top: 16rpx;
          padding-bottom: 32rpx;

          .list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 24rpx;

            .input {
              flex: 1;
              background: rgba(255, 255, 255, 0.2);
              padding: 12rpx 28rpx;
              border-radius: 8rpx;
              color: #A7F522;
              text-align: center;
            }

            .option {
              width: fit-content;
              padding: 4rpx 16rpx;
              font-size: 28rpx;
              border: 2rpx solid transparent;
              border-radius: 8rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              background: #6F706E;

              &.active {
                color: #A7F522;
                background-clip: padding-box, border-box;
                background-origin: padding-box, border-box;
                background-image: linear-gradient(to right, #6F706E, #6F706E), linear-gradient(109deg, rgba(#A7F522, 1), rgba(#fff, .1), rgba(#A7F522, 1));
              }
            }
          }
        }
      }

      .btns {
        @apply flex-around;
        position: fixed;
        bottom: env(safe-area-inset-bottom);
        left: 0;
        width: 100%;
        padding: 32rpx;
        z-index: 3;
        background-color: #272727;

        .btn {
          padding: 16rpx 100rpx;
          border-radius: 16rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          color: #1D2129;
          font-size: 28rpx;

          &.confirm {
            background-color: #A7F522;
          }
        }
      }
    }
  }

  .selectitembox {
    display: flex;
    flex-direction: column;

    .notselectitem {
      width: fit-content;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      padding: 0 16rpx;
      margin: 0 32rpx 32rpx 0;
      color: #fff;
      height: 72rpx;
      font-size: 28rpx;
      border: 2rpx solid transparent;
      border-radius: 8rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #6F706E;
    }

    .selectitem {
      box-sizing: border-box;
      width: fit-content;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      padding: 0 16rpx;
      margin: 0 32rpx 32rpx 0;
      color: #A7F522;
      height: 72rpx;
      font-size: 28rpx;
      border: 2rpx solid transparent;
      border-radius: 8rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #6F706E, #6F706E), linear-gradient(109deg, rgba(#A7F522, 1), rgba(#fff, .1), rgba(#A7F522, 1));
    }
  }
</style>
