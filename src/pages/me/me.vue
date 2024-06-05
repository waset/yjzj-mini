<script lang="ts" setup>
const { getUserInfo } = useUserStore()
const { userDesc, isRegister, token } = storeToRefs(useUserStore())

const { orders } = storeToRefs(useOrderStore())

const orderNum = ref(orders.value[0].totalNumber)

onShow(async () => {
  if (token.value) {
    await getUserInfo()
  }
})

/**
 * 订单类型
 */
const orderTypes = [
  {
    icon: 'i-icons-payment',
    text: '待付款',
    num: 9,
  },
  {
    icon: 'i-icons-delivery',
    text: '待发货',
    num: 0,
  },
  {
    icon: 'i-icons-receive',
    text: '待收货',
    num: 9999,
  },
]
/**
 * 菜单
 */
const menus = [
  {
    icon: 'i-icons-setting',
    text: '配置单',
    path: '',
  },
  {
    icon: 'i-icons-coupon',
    text: '优惠券',
    path: '',
  },
  {
    icon: 'i-icons-address',
    text: '收货地址',
    path: '',
  },
]
/**
 * 跳转登录
 */
function goLogin() {
  if (token.value)
    return

  Jump('/pages/me/login')
}
</script>

<template>
  <div class="personal">
    <navbar-home text="个人中心" />
    <div class="user">
      <div class="wrap" @click="goLogin">
        <div class="avatar">
          <avatar :src="ImageUrl(userDesc?.avatar || '')" />
          <div v-if="isRegister" class="edit" @click="Jump('/pages/me/info')">
            <div class="btn">
              <div class="i-icons-edit" />
            </div>
          </div>
        </div>
        <template v-if="isRegister">
          <div class="info">
            <div class="name">
              {{ userDesc.nickname }}
            </div>
            <div class="phone">
              {{ userDesc.phoneDesc }}
            </div>
            <div class="public">
              <span> 公众号 </span>
              <span>{{ userDesc.isSubDesc }}</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="info">
            登录/注册
          </div>
        </template>
      </div>
      <div class="line" />
    </div>
    <div class="order">
      <div class="title">
        <div class="text">
          我的订单
        </div>
        <div class="more" @click="Jump('/pages/me/form')">
          <span>全部订单</span>
          <span class="num">{{ orderNum }}</span>
          <div class="i-icons-right" />
        </div>
      </div>
      <div class="body">
        <div class="wrap">
          <div class="types">
            <template v-for="(item, index) in orderTypes" :key="index">
              <div class="item">
                <div class="icon">
                  <div :class="item.icon" />
                  <template v-if="item.num && item.num < 99">
                    <div class="num">
                      {{ item.num }}
                    </div>
                  </template>
                  <template v-if="item.num && item.num > 99">
                    <div class="num">
                      ···
                    </div>
                  </template>
                </div>
                <div class="text">
                  {{ item.text }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="promotion">
      <div class="wrap">
        <div class="box">
          <div class="title">
            <div class="left">
              我的邀请
            </div>
            <div class="right">
              邀请推广>>
            </div>
          </div>
          <div class="body">
            <div class="items">
              <div class="item">
                <div class="number">
                  <span v-if="1 > 0" class="units">￥</span>
                  <span>{{ 1.00 }}</span>
                </div>
                <div class="text">
                  当前收益
                </div>
              </div>
              <div class="item">
                <div class="number">
                  <span v-if="0" class="units">￥</span>
                  <span>{{ 0 }}</span>
                </div>
                <div class="text">
                  可提现
                </div>
              </div>
              <div class="item">
                <div class="number">
                  <span>{{ 1 }}</span>
                  <span class="units">/人</span>
                </div>
                <div class="text">
                  已邀请
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="func">
      <div class="wrap">
        <div class="items">
          <template v-for="(item, index) in menus" :key="index">
            <div class="item">
              <div class="left">
                <div class="icon">
                  <div :class="item.icon" />
                </div>
                <div class="name">
                  {{ item.text }}
                </div>
              </div>
              <div class="right">
                <div class="i-icons-right" />
              </div>
            </div>
            <div v-if="index !== menus.length - 1" class="line" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .personal {
    padding: 0 32rpx;

    .line {
      width: 100%;
      height: 2rpx;
      background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.2));
    }

    .user {
      position: relative;
      padding: 16rpx 0;

      .wrap {
        display: flex;
        align-items: center;
        padding: 32rpx 16rpx;

        .avatar {
          position: relative;

          .edit {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 2rpx;
            background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.2));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 64rpx;
              height: 64rpx;
              color: #000;
              border-radius: 50%;
              background: rgba(#fff, 1);
            }
          }

        }

        .info {
          flex: 1;
          padding: 0 24rpx;

          .name {
            font-weight: 600;
            font-size: 32rpx;
            color: #F5F5F5;
            line-height: 40rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }

          .phone {
            padding: 16rpx 0;
          }

          .phone,
          .public {
            font-weight: 400;
            font-size: 24rpx;
            color: #F5F5F5;
            line-height: 40rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }

    .promotion {
      padding: 16rpx 0;

      .wrap {
        border-radius: 32rpx;
        padding: 2rpx;
        background-image: linear-gradient(113.84deg, rgba(255, 255, 255, 0.8) -6.55%, rgba(255, 255, 255, 0.08) 46.47%, rgba(255, 255, 255, 0.8) 92.28%);

        .box {
          padding: 32rpx;
          padding-bottom: 56rpx;
          border-radius: 32rpx;
          background-color: #000;

          .title {
            @apply flex-between;
            background: linear-gradient(150deg, rgba(190, 190, 190, 0) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0) 92.04%);
            border-radius: 0rpx 4rpx 4rpx 0rpx;
            padding: 8rpx;
            padding-top: 24rpx;

            .left {
              text-shadow: 8rpx 8rpx 0 rgba(167, 245, 34, 0.2);
            }

            .right {

              @apply underline underline-offset-3;
              font-size: 28rpx;
            }
          }

          .body {
            padding-top: 32rpx;

            .items {
              @apply flex-around;

              .item {
                flex: 1;
                text-align: center;

                .number {
                  .units {
                    font-size: 20rpx;
                    color: #BEBEBE;
                  }
                }

                .text {
                  font-weight: 400;
                  font-size: 24rpx;
                  color: #BEBEBE;
                  line-height: 40rpx;
                  text-align: center;
                  font-style: normal;
                  text-transform: none;
                }
              }
            }
          }
        }
      }
    }

    .order {
      padding: 16rpx 0;
      position: relative;
      z-index: 0;

      .title {
        @apply flex-between;

        .text {
          position: relative;
          padding: 12rpx 24rpx;
          font-weight: bold;
          z-index: 1;
          font-size: 28rpx;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 120%;
            background: #000;
            border-radius: 32rpx 32rpx 0 0;
            z-index: -1;
          }
        }

        .more {
          font-weight: 400;
          font-size: 24rpx;
          color: #BEBEBE;
          line-height: 40rpx;
          text-align: center;
          font-style: normal;
          text-transform: none;

          .num {
            padding: 0 8rpx;
          }
        }
      }

      .body {
        position: relative;
        z-index: 1;
        border-radius: 32rpx;
        padding: 2rpx;
        background-image: linear-gradient(113.84deg, rgba(255, 255, 255, 0.8) -6.55%, rgba(255, 255, 255, 0.08) 46.47%, rgba(255, 255, 255, 0.8) 92.28%);

        .wrap {
          border-radius: 32rpx;
          background-color: #000;

          .types {
            @apply flex-around;

            .item {
              flex: 1;
              @apply flex-center;
              flex-direction: column;
              padding: 32rpx;

              .icon {
                position: relative;
                font-size: 56rpx;

                .num {
                  @apply flex-center;
                  position: absolute;
                  font-size: 20rpx;
                  width: 36rpx;
                  height: 36rpx;
                  top: 9rpx;
                  right: -9rpx;
                  border-radius: 50%;
                  border: 4rpx solid #fff;
                  background-color: #F53F3FFF;
                }
              }

              .text {
                padding-top: 16rpx;
                font-weight: 400;
                font-size: 28rpx;
                color: #FFFFFF;
                line-height: 40rpx;
                text-align: center;
                font-style: normal;
                text-transform: none;
              }
            }
          }
        }
      }
    }

    .func {
      padding: 16rpx 0;

      .wrap {
        border-radius: 32rpx;
        padding: 2rpx;
        background-image: linear-gradient(113.84deg, rgba(255, 255, 255, 0.8) -6.55%, rgba(255, 255, 255, 0.08) 46.47%, rgba(255, 255, 255, 0.8) 92.28%);

        .items {
          padding: 32rpx;
          border-radius: 32rpx;
          background-color: #000;

          .item {
            @apply flex-between;
            padding: 24rpx 0;

            .left {
              @apply flex-center;

              .icon {
                @apply flex-center;
                font-size: 40rpx;
                padding-right: 8rpx;
              }
            }
          }
        }
      }
    }
  }
</style>

<route lang="json">
{
  "layout": "home"
}
</route>
