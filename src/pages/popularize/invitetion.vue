<script setup lang="ts">
import UQRCode from 'uqrcodejs'

const { levelall, inviterank, inviteuser } = storeToRefs(useInviteStore())
const { getInviteall, getInviteRank, becomePromoter, bandInviter } = useInviteStore()
const { user, shareCode, isLogin } = storeToRefs(useUserStore())
const { getUserInfo, hasGoLogin } = useUserStore()
onShow(async () => {
  await getInviteall()
  await getInviteRank()
})

// 打开绑定邀请人组件
const childRef = ref<any>(null)
function bandinvite() {
  childRef.value.openShow()
}

// 成为推广员
async function become() {
  if (hasGoLogin()) {
    return
  }
  const res = await becomePromoter()
  if (res.code === 200) {
    getUserInfo()
    uni.showToast({
      title: '加入成功',
      icon: 'none',
    })
  }
  else {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
}

// 确认换绑分享人弹窗显隐
const showModel = ref(false)
// 该分享邀请人邀请码
const shareCodeInner = ref('')
// 绑定邀请人
async function bindCode(code: string) {
  const res = await bandInviter(code)
  if (res.code === 200) {
    uni.showToast({
      title: '绑定成功',
      icon: 'none',
    })
    await getUserInfo()
  }
  else {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
}
async function bindShareCode(code: string) {
  // 没登陆
  if (!isLogin.value) {
    // 存储分享者邀请码
    shareCode.value = code
    return hasGoLogin()
  }
  // 登录且没有加入邀请人计划
  if (user.value.phone && user.value.promoterStatus !== 1) {
    await bindCode(code)
  }
  // 登录且加入邀请人计划
  if (user.value.phone && user.value.promoterStatus === 1) {
    // 分享者不是自己和已绑定的邀请人
    if (code !== user.value.inviteCode)
      showModel.value = true
  }
}

// 换绑分享人的邀请码
async function ChangeBind() {
  await bindCode(shareCodeInner.value)
  showModel.value = false
}

onLoad((params) => {
  if (params?.inviteCode) {
    shareCode.value = params?.inviteCode
    shareCodeInner.value = params.inviteCode
    bindShareCode(params.inviteCode)
  }
})

// #ifdef MP
onShareAppMessage(() => {
  // 如果是邀请人 则分享时携带邀请码
  const params = !user.value.inviteCode ? {} : { inviteCode: user.value.inviteCode }
  return {
    title: '快来加入推广人计划吧！',
    imageUrl: StaticUrl('/images/share_cover.png'),
    path: UrlAndParams('/pages/popularize/invitetion', params),
  }
})
// #endif

const shareModel = ref(false)
function openshare() {
  shareModel.value = true
}
// 海报生成完成了吗
const isDraw = ref(false)

function saveCode() {
  if (!isDraw.value) {
    uni.showToast({
      title: '生成中，请重新点击保存',
      icon: 'none',
    })
    return
  }

  uni.showLoading({
    title: '生成中',
  })

  uni.canvasToTempFilePath({
    canvasId: 'posterbg',
    width: 400,
    height: 310,
    success: (res) => {
      if (res?.tempFilePath) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            shareModel.value = false
            uni.hideLoading()
            uni.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
            })
          },
          fail: () => {
            uni.hideLoading()
            uni.showToast({
              title: '保存失败',
              icon: 'error',
              duration: 2000,
            })
          },
        })
      }
    },
  })
}
/**
 * 绘制海报页
 */
async function drawPoster() {
  const ctx = uni.createCanvasContext('posterbg')
  // 填充背景
  ctx.fillRect(0, 0, 400, 310)
  const imgbg = await uni.getImageInfo({
    src: StaticUrl('/images/poster.png'),
  })

  ctx.drawImage(imgbg.path, 0, 0, 400, 310)

  // 海报添加文字
  ctx.fillStyle = '#ffffff'
  ctx.font = '20px Arial'
  ctx.fillText(user.value.nickname, 92, 60)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'italic bold 18px Arial'
  ctx.fillText('扫一扫注册下单,优惠商品畅享不停。', 27, 110)
  // 把二维码添加到海报上
  uni.canvasToTempFilePath({
    canvasId: 'qrcode',
    success: (res) => {
      ctx.drawImage(res.tempFilePath, 266, 176, 104, 104)
      // 把头像添加到海报上
      uni.canvasToTempFilePath({
        canvasId: 'avatar',
        success: (res) => {
          ctx.drawImage(res.tempFilePath, 27, 27, 54, 54)
          ctx.draw()
          isDraw.value = true
        },
      })
    },
  })
}
/**
 * 绘制二维码
 */
function drawCode() {
  // 获取uQRCode实例
  const qr = new UQRCode()
  // 设置二维码内容
  const url = MobilelUrl('/login?inviteCode=') + user.value.inviteCode
  qr.data = url
  qr.size = 116
  qr.background = '#ffffff'
  qr.x = -2
  qr.y = -2
  qr.margin = 2
  qr.border = false
  qr.make()
  const canvasContext: UniApp.CanvasContext = uni.createCanvasContext('qrcode')
  qr.canvasContext = canvasContext
  qr.drawCanvas()
}
/**
 * 绘制头像为圆形
 */
async function drawAvatar() {
  const canvasAvatar = uni.createCanvasContext('avatar')
  const img = await uni.getImageInfo({
    src: user.value.avatar,
  })
  canvasAvatar.save()
  canvasAvatar.beginPath()
  canvasAvatar.arc(54 / 2 + 0, 54 / 2 + 0, 54 / 2, 0, Math.PI * 2, true)
  canvasAvatar.clip()
  canvasAvatar.drawImage(img.path, 0, 0, 54, 54)
  canvasAvatar.restore()
  canvasAvatar.closePath()
  canvasAvatar.draw()
}

onReady(async () => {
  await drawCode()
  await drawAvatar()
  await drawPoster()
})
</script>

<template>
  <div class="invietion">
    <navbar-back text="邀请推广" />
    <canvas id="avatar" class="fixed left-1000" canvas-id="avatar" style="width:54px;height: 54px;" />
    <canvas id="posterbg" class="fixed left-1000" canvas-id="posterbg" style="width:400px;height: 310px;" />
    <canvas id="qrcode" class="fixed left-1000" canvas-id="qrcode" style="width: 116px;height: 116px;" />
    <!-- 海报 -->
    <invite-banner
      :inviteuser="inviteuser" :user="user" @bandinvite="bandinvite" @become="become"
      @openshare="openshare"
    />
    <div :style="`background-image: url(${StaticUrl('/svg/invite-mainbg.svg')})`" class="main">
      <!-- 推广等级 -->
      <invite-level :user="user" :levelall="levelall" />
      <!-- 榜单排名 -->
      <invite-ranking :inviterank="inviterank" />
      <image style="width: 100%;" class="mt-20" :src="StaticUrl('/svg/invite-program.svg')" mode="widthFix" />
      <!-- 按钮图片 -->
      <div class="flex justify-center">
        <template v-if="user.promoterStatus !== 1">
          <image style="width: 90%;" src="@/assets/background/invite-btn.svg" mode="widthFix" @click="become" />
        </template>
        <template v-else>
          <image
            class="mt-4" style="width: 90%;" src="@/assets/background/invite-btned.svg" mode="widthFix"
            @click="shareModel = true"
          />
        </template>
      </div>
    </div>
    <popularize-bind-inviter ref="childRef" :user="user" />
    <common-model v-model:show="showModel" msg="确认邀请人换绑为该分享者" icon="i-svg-warn" @ok="ChangeBind" />
    <common-model v-model:show="shareModel" msg="邀请好友加入" @ok="ChangeBind">
      <template #footer>
        <div class="flex-around w-[80%] pb-[50rpx]">
          <div class="py-[12rpx] px-[20rpx] bg-[rgba(167,245,34,1)] color-[#000] rounded-[8rpx]" @click="saveCode">
            保存邀请码
          </div>
          <button class="sharebtn" open-type="share">
            <div class="py-[12rpx] px-[20rpx] bg-[#fff] color-[#000] rounded-[8rpx]" @click="shareModel = false">
              分享小程序
            </div>
          </button>
        </div>
      </template>
    </common-model>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.sharebtn {
  all: unset;
  display: inline-block;
  position: static;

  &::after {
    all: unset;
  }
}
</style>

<style>
page {
  background-image: none;
  background-color: #08050C;
}
</style>
