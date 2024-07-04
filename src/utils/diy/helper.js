// 商品类型映射
export const typeConfig = {
  整机: { value: 2, type: 'computer' },
  DIY装机: { value: 6, type: 'diy' },
  DIY: { value: 6, type: 'diy' },
  笔记本: { value: 3, type: 'laptop' },
  组件: { value: 4, type: 'components' },
  外设: { value: 5, type: 'peripherals' },
  办公电脑: { value: 7, type: 'computer' },
  游戏电脑: { value: 8, type: 'computer' },
  专业电脑: { value: 9, type: 'computer' },
  轻薄笔记本: { value: 10, type: 'laptop' },
  游戏笔记本: { value: 11, type: 'laptop' },
  移动工作站: { value: 12, type: 'laptop' },
  CPU: { value: 13, type: 'components' },
  主板: { value: 14, type: 'components' },
  显卡: { value: 15, type: 'components' },
  内存: { value: 16, type: 'components' },
  硬盘: { value: 17, type: 'components' },
  机箱: { value: 18, type: 'components' },
  CPU散热器: { value: 19, type: 'components' },
  电源: { value: 20, type: 'components' },
  机箱风扇: { value: 21, type: 'components' },
  鼠标: { value: 22, type: 'peripherals' },
  键盘: { value: 23, type: 'peripherals' },
  鼠标垫: { value: 24, type: 'peripherals' },
  耳机: { value: 25, type: 'peripherals' },
  音响: { value: 26, type: 'peripherals' },
  电竞桌: { value: 27, type: 'peripherals' },
  电竞椅: { value: 28, type: 'peripherals' },
  显示器: { value: 31, type: 'peripherals' },
  推荐配置: { value: 29, type: 'diy' },
  完全定制: { value: 30, type: 'diy' },
}

// diy组件图标
export const icons = {
  CPU: 'icon-cpu',
  主板: 'icon-zhuban',
  内存: 'icon-neicun',
  硬盘: 'icon-yingpan',
  显卡: 'icon-xianka',
  CPU散热器: 'icon-a-sanrefengshan',
  电源: 'icon-dianyuan',
  机箱: 'icon-jixiang',
  电竞椅: 'icon-dianjingyi',
  电竞桌: 'icon-dianjingzhuo',
  耳机: 'icon-erji',
  鼠标垫: 'icon-shubiaodian',
  键盘: 'icon-jianpan',
  鼠标: 'icon-shubiao',
  机箱风扇: 'icon-a-sanrefengshan',
  音箱: 'icon-yinxiang',
  显示器: 'icon-xianshiqi',
}

// 商品类型映射（弃用）
export const goodsType = {
  2: 'computer',
  3: 'laptop',
  4: 'components',
  5: 'peripherals',
  6: 'diy',
}

// 商品类型映射  value值代表类型ID
export const goodsTypeValues = {
  'computer': { label: '整机', value: 2 },
  'laptop': { label: '笔记本', value: 3 },
  'components': { label: '组件', value: 4 },
  'peripherals': { label: '外设', value: 5 },
  'diy': { label: 'DIY', value: 6 },
  'diy-goods': { label: 'DIY', value: 6 },
}

// 订单状态
export const orderStatus = {
  1: { label: '待支付', color: '#A7F522' },
  2: { label: '支付成功', color: '#01B508' },
  3: { label: '支付失败', color: '#A7F522' },
  4: { label: '部分退款', color: '#FF8933' },
  5: { label: '全部退款', color: '#fff' },
  6: { label: '取消支付', color: '#fff' },
}

// 发货状态
export const expressStatus = {
  1: { label: '已发货', color: '#A7F522' },
  5: { label: '已完成订单', color: '#01B508' },
  7: { label: '已完成订单', color: '#01B508' },
}

// 通过canvas下载图片
export function exportImageFromCanvas(canvas, fileName) {
  const MIME_TYPE = 'image/png'
  const imgURL = canvas.toDataURL(MIME_TYPE)
  const dlLink = document.createElement('a')
  dlLink.download = fileName
  dlLink.href = imgURL
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}

// 针对配置单商品图片
export function getBanner(params) {
  let shareImage
  params.forEach((item) => {
    const tagTitle = item.tagTitle || item.typeName
    if (tagTitle.includes('机箱')) {
      shareImage = item?.banner ? item.banner[0] : (item?.productSnapshot ? item.productSnapshot.banner[0] : '')
    }
  })
  return shareImage
}
