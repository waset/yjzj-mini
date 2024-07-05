<script setup lang="ts">
const { isRegister } = storeToRefs(useUserStore())
const { user, uploadAvatar, getPhoneNumber, getUserInfo, authentication, register } = useUserStore()
onShow(async () => {
  await getUserInfo()
})

const form = ref(user)
const showDatePicker = ref(false)
const onChooseAvatar = async (e: any) => {
  const { avatarUrl } = e.detail
  form.value.avatar = await uploadAvatar(avatarUrl)
}
const getphonenumber = async (e: GetPhoneNumberRes) => {
  form.value.phone = await getPhoneNumber(e.detail)
}
const showAuthentication = ref(false)

const goAuthentication = async () => {
  if (!form.value.IDCard || !form.value.realName) {
    uni.showToast({
      title: '请填写姓名和身份证号',
      icon: 'none',
    })
    return
  }
  if (!ChineseName(form.value.realName)) {
    uni.showToast({
      title: '请输入正确的姓名',
      icon: 'none',
    })
    return
  }
  if (!IDCard(form.value.IDCard)) {
    uni.showToast({
      title: '请输入正确的身份证号',
      icon: 'none',
    })
    return
  }
  const res = await authentication({
    realName: form.value.realName,
    IDCard: form.value.IDCard,
  })
  if (res) {
    showAuthentication.value = false
    uni.showToast({
      title: '认证成功',
      icon: 'none',
    })
  }
}

const goRegister = async () => {
  if (!form.value.birthday) {
    form.value.birthday = getDate()
  }
  if (!form.value.avatar) {
    uni.showToast({
      title: '请上传头像',
      icon: 'none',
    })
    return
  }
  if (!form.value.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    })
    return
  }
  if (!form.value.nickname) {
    uni.showToast({
      title: '请输入昵称',
      icon: 'none',
    })
    return
  }
  const res = await register(form.value)
  if (res) {
    uni.showToast({
      title: `${isRegister ? '更新' : '注册'}成功`,
      icon: 'none',
    })
    setTimeout(() => {
      isRegister.value = true
      Back(2)
    }, 1000)
  }
}
onLoad(async (params) => {
  // 认证
  if (params && params.type === 'authentication') {
    showAuthentication.value = true
  }
})
</script>

<template>
  <navbar-back :text="isRegister ? '个人资料' : '注册'" />
  <common-popup v-model:show="showAuthentication" name="实名认证" @close="getUserInfo">
    <div class="authentication">
      <div class="top">
        请填写当前登录微信关联的实名信息
      </div>
      <div class="form">
        <div class="item">
          <div class="label must">
            姓名
          </div>
          <div class="form">
            <input v-model="form.realName" class="input" type="text" placeholder="请输入您的真实姓名">
          </div>
        </div>
        <div class="item">
          <div class="label must">
            证件号码
          </div>
          <div class="form">
            <input v-model="form.IDCard" class="input" type="idcard" placeholder="请输入您的身份证号">
          </div>
        </div>
        <div class="prompt">
          <div class="icon ">
            <div class="i-icons-info" />
          </div>
          <div class="text">
            实名认证仅用于提现打款时校验身份，不会对信息做
            任何采集和保留，请放心使用。
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="btn" @click="goAuthentication">
          立即认证
        </div>
      </div>
    </div>
  </common-popup>
  <div class="info">
    <div class="wrap">
      <div class="box">
        <div class="body">
          <div class="avatar">
            <button class="wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" @click="onChooseAvatar">
              <avatar :src="form.avatar" />
            </button>
          </div>
          <div class="personal">
            <div class="item">
              <div class="label must">
                昵称
              </div>
              <div class="form">
                <input
                  :value="form.nickname" type="nickname" :maxlength="10"
                  @change="(e: any) => form.nickname = e.detail.value"
                >
              </div>
              <div class="right">
                <div class="i-icons-right" />
              </div>
            </div>
            <div class="item" @click="showDatePicker = true">
              <div class="label">
                生日
              </div>
              <div class="form">
                <picker
                  mode="date" :value="form.birthday" :start="getDate('start')" :end="getDate('end')"
                  @change="(e: any) => form.birthday = e.detail.value"
                >
                  <view class="uni-input">
                    {{ form.birthday || getDate() }}
                  </view>
                </picker>
              </div>
              <div class="right">
                <div class="i-icons-right" />
              </div>
            </div>
          </div>
          <div class="information">
            <div class="item">
              <div class="label must">
                手机号
              </div>
              <div class="form">
                <button class="btn" open-type="getPhoneNumber" @getphonenumber="getphonenumber">
                  {{ form.phone || '绑定手机号' }}
                </button>
              </div>
              <div class="right">
                <div class="i-icons-right" />
              </div>
            </div>
            <div class="item">
              <div class="label">
                实名认证
              </div>
              <div class="form">
                <div class="btn" @click="user.realName ? '' : showAuthentication = true">
                  {{ user.realName ? '已认证' : '未认证' }}
                </div>
              </div>
              <div class="right">
                <div class="i-icons-right" />
              </div>
            </div>
          </div>
          <div class="btns">
            <div
              class="btn" :class="{
                disable: form === user,
              }" @click="goRegister"
            >
              {{ isRegister ? '更新' : '注册' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    padding: 32rpx;
    height: var(--body-min-height);

    .wrap {
      @apply i-svg-info-bg;
      width: 100%;
      height: 100%;
      padding: 56rpx 64rpx;

      .box {
        @apply i-svg-info-box;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 64rpx 48rpx;

        .body {
          width: 100%;

          .avatar {
            .wrapper {
              background: transparent;
            }
          }

          .item {
            display: flex;
            align-items: center;
            padding: 16rpx 32rpx;
            margin: 16rpx 0;
            color: rgba(190, 190, 190, 1);
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;

            background: linear-gradient(150deg, rgba(190, 190, 190, 0) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0) 92.04%);

            .label {
              display: inline-block;
              position: relative;
              padding-left: 16rpx;
              width: 35%;

              &.must {
                &::after {
                  content: '*';
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  color: #f53f3f;
                }
              }
            }

            .form {
              display: inline-block;
              width: 55%;
              color: #fff;
              font-size: 24rpx;
              text-align: center;

              .btn {
                background: transparent;
                color: #fff;
                border: 0;
                box-shadow: 0;
                font-size: 24rpx;
                font-weight: 400;
                line-height: 40rpx;
                text-align: center;
                padding: 0;

                &::after {
                  border: 0;
                }
              }
            }

            .right {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 10%;
            }
          }

          .btns {
            padding: 48rpx 32rpx;
            padding-bottom: 0;

            .btn {
              padding: 20rpx 40rpx;
              border-radius: 4rpx;
              text-align: center;
              color: #1D2129;
              font-size: 28rpx;
              font-weight: 400;
              line-height: 40rpx;
              background-color: #A7F522;
              box-shadow: 8rpx 8rpx 0 0 #A7F52233;

              &.disabled {
                color: #F5F5F5;
                background-color: #8D8D8D;
                box-shadow: 8rpx 8rpx 0 0 #8D8D8D;
              }
            }
          }
        }
      }
    }
  }

  .authentication {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    padding: 0 32rpx;
    color: #BEBEBE;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 40rpx;

    .top {
      text-align: center;
      padding-bottom: 32rpx;
    }

    .form {
      flex: 1;

      .item {
        @apply flex-between;
        border-radius: 8rpx;
        padding: 32rpx;
        margin-bottom: 32rpx;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));

        .label {
          flex: 0 0 25%;
        }

        .form {
          flex: 1;

          .input {
            color: #fff;
          }
        }
      }

      .prompt {
        @apply flex items-start justify-center;
      }
    }

    .btns {
      padding: 32rpx;
      text-align: center;

      .btn {
        display: inline-block;
        width: 440rpx;
        background-color: red;
        border-radius: 4rpx;
        padding: 20rpx 40rpx;

        color: #1D2129;
        @apply bg-green;
        font-size: 28rpx;
        line-height: 40rpx;
        font-weight: 400;
      }
    }
  }
</style>
