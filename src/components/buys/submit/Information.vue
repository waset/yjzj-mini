<script setup lang="ts">
const props = withDefaults(defineProps<{
  info: orderinfoData
}>(), {
})

const showModel = ref(false)

const goService = () => {
  copyText(props.info.no || '')
  showModel.value = true
}
</script>

<template>
  <common-model v-model:show="showModel" msg="已为您复制订单号, 是否前往联系客服?" icon="i-svg-info" @ok="contact_customer_service()" />
  <div class="info">
    <template v-if="props.info">
      <div class="wrap">
        <div class="content">
          <!-- 订单信息 -->
          <div class="bg">
            <div class="money">
              <div class="total">
                <div class="text">
                  合计金额
                </div>
                <div class="price">
                  <span>￥</span>
                  <span>{{ props.info.sellPrice }}</span>
                </div>
              </div>
              <div class="activity">
                <div class="text">
                  活动优惠
                </div>
                <div class="price">
                  <span>-￥</span>
                  <span>0</span>
                </div>
              </div>
              <div class="coupon">
                <div class="text">
                  卡券优惠
                </div>
                <div class="price">
                  <span>-￥</span>
                  <span>{{ props.info.ticketPrice }}</span>
                </div>
              </div>
              <div class="freight">
                <div class="text">
                  运费
                </div>
                <div class="price">
                  <span>￥</span>
                  <span>0</span>
                </div>
              </div>
              <div class="actualPayment">
                <div class="text">
                  实付金额
                </div>
                <div class="price">
                  <span>￥</span>
                  <span>{{ props.info.payPrice }}</span>
                </div>
              </div>
            </div>
            <div class="line" />
            <div class="time">
              <div class="orderNumber">
                <div class="text">
                  订单编号
                </div>
                <div class="info">
                  <div class="num">
                    {{ props.info.no }}
                  </div>
                  <div class="replication" @click="copyText(props.info.no || '')">
                    | 复制
                  </div>
                </div>
              </div>
              <div class="create">
                <div class="text">
                  创建时间
                </div>
                <div class="info">
                  <div>{{ props.info.createdAt }}</div>
                </div>
              </div>
              <div v-if="props.info.payAt" class="pay">
                <div class="text">
                  付款时间
                </div>
                <div class="info">
                  <div>{{ props.info.payAt }}</div>
                </div>
              </div>
              <div v-if="props.info.updatedAt" class="finish">
                <div class="text">
                  成交时间
                </div>
                <div class="info">
                  <div>{{ props.info.updatedAt }}</div>
                </div>
              </div>
            </div>
            <div class="line" />
            <div class="message">
              <div class="remark">
                <div class="text">
                  备注
                </div>
                <div class="info">
                  <div>{{ props.info.remark || '无备注' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="service">
          <!-- 服务 -->
          <div class="body">
            <div class="title">
              遇到问题？
            </div>
            <div class="btn" @click="goService()">
              <div class="i-icons-service" />
              <div class="text">
                联系客服
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.info {

  .wrap {
    display: flex;
    flex-direction: column;

    gap: 32rpx;

    .content {
      background-image: linear-gradient(133.06deg, rgba(255, 255, 255, 0.4) 3.56%, rgba(238, 238, 238, 0.06) 99.09%);
      padding: 2rpx;
      border-radius: 32rpx;

      .bg {
        border-radius: 32rpx;
        background: rgba(0, 0, 0, 0.8);

        display: flex;
        flex-direction: column;
        gap: 16rpx;
        padding: 32rpx 32rpx;

        .money {
          display: flex;
          flex-direction: column;
          gap: 16rpx;

          .total,
          .activity,
          .coupon,
          .freight,
          .actualPayment {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .price {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 2rpx;

              font-size: 28rpx;
              font-weight: 500;

            }

          }

        }

        .line {
          width: 100%;
          height: 2rpx;
          background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.6), rgba(190, 190, 190, 0.6), rgba(190, 190, 190, 0.2));
        }

        .time {
          display: flex;
          flex-direction: column;
          gap: 16rpx;

          .orderNumber {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .info {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 8rpx;

              .num {
                color: #bebebe;
                font-size: 28rpx;
              }

              .replication {
                color: #ffffff;
                font-size: 28rpx;
                font-weight: 500;
              }

            }

          }

          .create,
          .pay,
          .finish {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .info {
              color: #bebebe;
              font-size: 28rpx;
              font-weight: 500;

            }

          }

        }

        .message {
          display: flex;
          flex-direction: column;
          gap: 16rpx;

          .remark {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            padding: 8rpx 0;

            gap: 40rpx;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .info {
              display: flex;
              justify-content: flex-end;

              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;

              font-size: 28rpx;
              width: 70%;
              font-weight: 500;

            }

          }

        }
      }
    }

    .service {
      background-image: linear-gradient(133.06deg, rgba(255, 255, 255, 0.4) 3.56%, rgba(238, 238, 238, 0.06) 99.09%);
      padding: 2rpx;
      border-radius: 32rpx;

      .body {
        border-radius: 32rpx;
        background: rgba(0, 0, 0, 0.8);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding: 32rpx 32rpx;

        .title {
          font-size: 28rpx;
          color: #ffffff;
        }

        .btn {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 4rpx;

          font-size: 28rpx;
          color: #ffffff;
        }

      }
    }
  }
}
</style>
