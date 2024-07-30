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

function save() {
  uni.canvasToTempFilePath({
    canvasId: 'qrcode',
    width: 200,
    height: 200,
    x: -10,
    y: -10,

    success: (res) => {
      if (res?.tempFilePath) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
            })
          },
          fail: () => {
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

onMounted(() => {
  // 获取uQRCode实例
  const qr = new UQRCode()
  // 设置二维码内容
  const url = MobilelUrl('/login?inviteCode=') + user.value.inviteCode
  qr.data = url
  qr.size = 200
  qr.background = '#ffffff'
  qr.x = -10
  qr.y = -10
  qr.margin = 10
  qr.border = false
  // 调用制作二维码方法
  qr.make()
  // 获取canvas上下文
  const canvasContext: UniApp.CanvasContext = uni.createCanvasContext('qrcode', this) // 如果是组件，this必须传入
  // 设置uQRCode实例的canvas上下文
  qr.canvasContext = canvasContext
  // 调用绘制方法将二维码图案绘制到canvas上
  qr.drawCanvas()
})
</script>

<template>
  <div class="popularize">
    <navbar-back text="邀请推广" />
    <canvas id="qrcode" class="fixed left-1000" canvas-id="qrcode" style="width: 200px;height: 200px;" />
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
    <div class="c-#BEBEBE mx-10 text-center mt-6 text-sm">
      *特别说明：由于相关业务数据复杂，可能存在误差及计算延迟情况，若有疑问请联系客服。给您带来不便，敬请谅解。
    </div>
  </div>
</template>
