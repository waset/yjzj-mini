<script setup lang="ts">
// 定义不同状态订单的操作按钮
const props = withDefaults(defineProps<{
  status: Order['status']
  express: Order['express']
  order: Order
}>(), {
})
const emit = defineEmits<{
  (e: 'updata'): void
}>()

const { continuePay, cancelPay, refund } = useSubmitOrderStore()
// 查看物流
const showExpress = ref(false)
// 物流弹窗内内容
const expressInfo = ref<Order['express']>()
// 显示查看物流弹窗
function viewLogistics(express: Order['express']) {
  showExpress.value = true
  expressInfo.value = express
}

// 计算物流的文本长度
const data = computed(() => expressInfo?.value?.snapshot?.lastResult?.data)
const dataLength = computed(() => data.value?.length)

// 退款确认弹窗
const showModel = ref(false)
function refundConfirm() {
  showModel.value = true
}

// 取消订单确认弹窗
const cancelOrder = ref(false)
function cancelConfirm() {
  cancelOrder.value = true
}

// 继续支付
const continueSubmit = async () => {
  await continuePay(props.order.id)
}

// 取消订单
const confirmcancelOrder = async () => {
  const code = await cancelPay(props.order.id)
  if (code === 200) {
    cancelOrder.value = false
    emit('updata')
  }
}

// 退款
const refundApply = async () => {
  // 关闭弹窗
  showModel.value = false
  // 退款
  const code = await refund(props.order.id)
  if (code === 200) {
    cancelOrder.value = false
    emit('updata')
  }
  else {
    uni.showToast({
      title: '退款失败，请联系客服处理',
      icon: 'none',
      duration: 2000,
    })
  }
}
</script>

<template>
  <div class="action">
    <common-popup v-model:show="showExpress" name="物流详情">
      <div class="express-info">
        <div class="express">
          <div class="head">
            <div class="bg">
              <div class="company">
                {{ expressInfo?.companyName }}
              </div>
              <div class="number">
                <div class="text">
                  快递单号：
                </div>
                <div class="no">
                  {{ expressInfo?.no }}
                </div>
              </div>
            </div>
          </div>
          <div class="info">
            <div v-if="dataLength" class="timelineInfo">
              <template v-for="(item, index) in expressInfo?.snapshot?.lastResult?.data" :key="index">
                <div class="timeline">
                  <div
                    class="timeline-item"
                    :class="{ 'first-item': index === 0, 'last-item': index === dataLength - 1 }"
                  >
                    <div class="timeline-content">
                      <div class="text">
                        {{ item.context }}
                      </div>
                      <div class="time">
                        {{ item.time }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-else class="empty">
              <common-empty text="暂无物流信息" />
            </div>
          </div>
        </div>
      </div>
    </common-popup>
    <common-model v-model:show="showModel" msg="确认退款吗" icon="i-svg-warn" @ok="refundApply" />
    <common-model v-model:show="cancelOrder" msg="取消后订单将无法恢复，确认取消吗？" icon="i-svg-warn" @ok="confirmcancelOrder" />
    <div v-if="props.status === OrderStatus.Wait">
      <div class="wait">
        <div class="cancel" @click.stop="cancelConfirm">
          取消订单
        </div>
        <div class="waitPay" @click.stop="continueSubmit">
          继续付款
        </div>
      </div>
    </div>
    <div v-else-if="props.status === OrderStatus.PaymentSuccessful">
      <div class="ordered">
        <div v-if="props.express" class="express">
          <div class="shipped">
            <div class="logistics" @click.stop="viewLogistics(props.express)">
              查看物流
            </div>
          </div>
        </div>
        <div v-else class="refund">
          <div class="text" @click.stop="refundConfirm">
            退款
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.action {

  .express-info {

    .express {
      display: flex;
      flex-direction: column;
      gap: 40rpx;

      .head {
        background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.2));
        padding: 2rpx;
        border-radius: 32rpx;

        .bg {
          background: #161616;
          border-radius: 32rpx;
          padding: 32rpx 32rpx;

          display: flex;
          flex-direction: column;
          gap: 16rpx;

          .company {
            font-size: 28rpx;
            color: #ffffff;
            font-weight: 600;
          }

          .number {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8rpx;

            .text {
              font-size: 24rpx;
              color: #bebebe;
              font-weight: 400;
            }

            .no {
              font-size: 24rpx;
              color: #ffffff;
              font-weight: 400;
            }

          }
        }
      }

      .info {

        .timeline {
          // 整体
          position: relative;
          list-style-type: none;

          padding: 0 32rpx;
        }

        .timeline-item {
          // 元素
          position: relative;
          margin-bottom: 20rpx;
        }

        .timeline-item:not(.last-item)::before {
          // 线
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2rpx;
          height: 50%;
          background: #bebebe;
          //居中
          margin: auto 0;
          /* 显示线 */
          display: block;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 30rpx;
          bottom: 0;
          width: 2rpx;
          height: 50%;
          background: #bebebe;
          //居中
          margin: auto 0;
          /* 默认不显示线 */
          display: none;
        }

        .timeline-content {
          // 内容
          display: flex;
          flex-direction: column;
          gap: 4rpx;

          padding-left: 40rpx;
          padding-bottom: 80rpx;

          .text {
            font-size: 28rpx;
            color: #bebebe;
            font-weight: 400;
          }

          .time {
            font-size: 28rpx;
            color: #bebebe;
            font-weight: 400;
          }
        }

        .first-item .timeline-content {
          // 内容
          display: flex;
          flex-direction: column;
          gap: 4rpx;

          padding-left: 40rpx;
          padding-bottom: 60rpx;

          .text {
            font-size: 28rpx;
            color: #a7f522;
            font-weight: 400;
          }

          .time {
            font-size: 28rpx;
            color: #a7f522;
            font-weight: 400;
          }
        }

        .last-item .timeline-item::before {
          // 最后一个元素的线
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          height: 50%;
          background: #bebebe;
          //居中
          margin: auto 0;
        }

        .timeline-content:before {
          // 圆
          content: '';
          position: absolute;
          left: -10rpx;
          top: 8rpx;
          height: 20rpx;
          width: 20rpx;
          background: #d9d9d9;
          border: 2rpx solid #ddd;
          border-radius: 50%;
        }

        .first-item .timeline-content:before {
          // 第一个元素的圆
          content: '';
          position: absolute;
          left: -10rpx;
          top: 8rpx;
          height: 20rpx;
          width: 20rpx;
          background: #a7f522;
          box-shadow: 0 0 0 10rpx #343b26;
          border-radius: 50%;
        }

        .last-item .timeline-content:before {
          // 最后一个元素的圆
          position: absolute;
          left: -10rpx;
          top: 8rpx;
          height: 20rpx;
          width: 20rpx;
          background: #d9d9d9;
          border: 2rpx solid #ddd;
          border-radius: 50%;
        }
      }
    }
  }

  .wait {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;

    .cancel {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #ffffff;
      border-radius: 4rpx;
    }

    .waitPay {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #a7f522;
      border-radius: 4rpx;
    }
  }

  .ordered {

    .shipped {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16rpx;

      .logistics {
        padding: 12rpx 32rpx;
        font-size: 28rpx;
        color: #1d2129;
        background-color: #ffffff;
        border-radius: 4rpx;
      }

      .received {
        padding: 12rpx 32rpx;
        font-size: 28rpx;
        color: #1d2129;
        background-color: #a7f522;
        border-radius: 4rpx;
      }
    }

    .refund {

      .text {
        padding: 12rpx 32rpx;
        font-size: 28rpx;
        color: #1d2129;
        background-color: #ffffff;
        border-radius: 4rpx;
      }

    }
  }

  .closed {

    .add {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #a7f522;
      border-radius: 4rpx;
    }
  }
}
</style>
