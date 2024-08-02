<script setup lang="ts">
import UQRCode from 'uqrcodejs'

const { getUserInfo } = useUserStore()
const { user } = storeToRefs(useUserStore())
const { getRebatelist, getWithdrawlist } = usePopularizeStore()
const { rebatelist, withdrawlist } = storeToRefs(usePopularizeStore())
onShow(async () => {
  await getUserInfo()
  getRebatelist({ page: 1, pageSize: 20 })
  getWithdrawlist({ page: 1, pageSize: 20 })
})
// 提现弹窗显示隐藏
const showWithdraw = ref(false)
function openWithdraw() {
  showWithdraw.value = true
}
// 打开绑定邀请人组件
const childRef = ref<ComponentInstance['PopularizeBindInviter']>()
function bandinvite() {
  childRef.value?.openShow()
}

// 海报生成完成了吗
const isDraw = ref(false)

function save() {
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
  ctx.font = 'bold 18px Arial'
  ctx.fillText(user.value.nickname, 90, 60)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'italic bold 18px Arial'
  ctx.fillText('扫一扫注册下单,优惠商品畅想不停', 27, 110)
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

onMounted(async () => {
  await drawCode()
  await drawAvatar()
  await drawPoster()
})
</script>

<template>
  <div class="popularize">
    <navbar-back text="邀请推广" />
    <canvas id="avatar" class="fixed left-1000" canvas-id="avatar" style="width:54px;height: 54px;" />
    <canvas id="posterbg" class="fixed left-1000" canvas-id="posterbg" style="width:400px;height: 310px;" />
    <canvas id="qrcode" class="fixed left-1000" canvas-id="qrcode" style="width: 116px;height: 116px;" />
    <!-- 推广邀请 -->
    <popularize-info @bandinvite="bandinvite" @openwith="openWithdraw" @savecode="save" />
    <!-- 返利记录 & 提现记录 -->
    <popularize-record-list :rebatelist="rebatelist" :withdrawlist="withdrawlist" />
    <!-- 立即提现 & 提现弹窗 -->
    <common-popup v-model:show="showWithdraw" name="申请提现">
      <popularize-withdraw />
    </common-popup>
    <!-- 邀请人弹窗 -->
    <popularize-bind-inviter ref="childRef" :user="user" />
    <div class="c-[#BEBEBE] mx-10 text-center mt-6 text-sm">
      *特别说明：由于相关业务数据复杂，可能存在误差及计算延迟情况，若有疑问请联系客服。给您带来不便，敬请谅解。
    </div>
  </div>
</template>
