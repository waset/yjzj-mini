import { icons } from './helper'

const PCIeTypes = {
  'PCIe 5.0': 3,
  'PCIe 4.0': 2,
  'PCIe 3.0': 1,
}

const banTypes = {
  'E-ATX': 4,
  'ATX': 3,
  'M-ATX': 2,
  'ITX': 1,
}

const validator = {
  CPU: (components) => {
    // 根结点，只判断电源功率是否匹配，电源功率不足导致显卡无法正常工作
    let res = []
    const [current, powerComponent, zhubanComponent, sanreComponent] = getComponents(components, ['CPU', '电源', '主板', 'CPU散热器'])
    if (!current)
      return res
    const [cpuSlotType, cpuKW] = getParamsValue(current?.product?.params, ['插槽类型', '基本功耗(W)'])

    if (powerComponent) {
      const powerWarning = validator['电源'](components, powerComponent)
      if (powerWarning.length > 0) {
        res = res.concat(powerWarning)
      }
    }
    if (zhubanComponent) {
      const [zhubanSlotType] = getParamsValue(zhubanComponent.product.params, ['CPU插槽类型'])

      if (zhubanSlotType !== cpuSlotType) {
        res.push({ key: '主板', message: '主板与CPU插槽类型不兼容' })
      }
    }
    if (sanreComponent) {
      const [sanrenSlot, sanreSize] = getParamsValue(sanreComponent.product.params, ['兼容平台', '水冷类型'])
      if (cpuKW >= 105 && sanreSize < 360) {
        res.push({ key: 'CPU散热器', message: 'CPU功耗高，请选择360及以上水冷散热器' })
      }
      if (!sanrenSlot.includes(cpuSlotType)) {
        res.push({ key: 'CPU散热器', message: 'CPU与CPU散热器插槽类型不兼容' })
      }
    }
    return res
  },
  主板: (components) => {
    // 验证CPU、机箱、内存、硬盘
    let res = []
    const [current, cpuComp, boxComp, neicunComp, SSDComp] = getComponents(components, ['主板', 'CPU', '机箱', '内存', '硬盘'])
    if (!current)
      return res
    const [zhubanPCIe, zhubanSize, zhubanSlotType] = getParamsValue(current?.product?.params, ['PCIe标准支持', '主板板型', 'CPU插槽类型'])
    if (cpuComp) {
      const [cpuSlotType] = getParamsValue(cpuComp.product.params, ['插槽类型'])

      if (zhubanSlotType !== cpuSlotType) {
        res.push({ key: '主板', message: '主板与CPU插槽类型不兼容' })
      }
    }

    if (boxComp) {
      const [containerSize] = getParamsValue(boxComp.product.params, ['最高主板板型'])
      if (banTypes[zhubanSize] > banTypes[containerSize]) {
        res = res.concat([
          { key: '主板', message: '主板与机箱板型不兼容' },
          { key: '机箱', message: '主板与机箱板型不兼容' },
        ])
      }
    }

    if (SSDComp) {
      const [interfaceType, channelType] = getParamsValue(SSDComp.product.params, ['接口类型'])
      if (interfaceType === 'M.2') {
        if (PCIeTypes[channelType] > PCIeTypes[zhubanPCIe]) {
          // 总线类型不兼容
          res = res.concat([
            {
              key: '主板',
              message: '主板与M.2硬盘PCIe版本不兼容',
            },
            {
              key: '硬盘',
              message: '主板与M.2硬盘PCIe版本不兼容',
            },
          ])
        }
      }
    }

    if (neicunComp) {
      const neicunWarning = validator['内存'](components, neicunComp)
      if (neicunWarning.length > 0) {
        res = res.concat(neicunWarning)
      }
    }

    return res
  },
  机箱: (components) => {
    // 验证电源、散热、硬盘、风扇、主板
    let res = []
    const [current, powerComponent, SSDComponent, sanreComponent, zhubanComponent] = getComponents(components, ['机箱', '电源', '硬盘', 'CPU散热器', '主板'])
    if (!current)
      return res

    const [containerSize, size2Number, size3Number, boxSanreTypes, powerSupportSize] = getParamsValue(current?.product?.params, ['最高主板板型', '2.5寸硬盘位', '3.5寸硬盘位', '水冷规格支持', '电源尺寸支持'])

    if (powerComponent) {
      // 电源
      const [powerSize] = getParamsValue(powerComponent.product.params, ['电源尺寸'])
      if (!powerSupportSize.includes(powerSize)) {
        res = res.concat([
          { key: '机箱', message: '机箱与电源尺寸不兼容' },
          { key: '电源', message: '机箱与电源尺寸不兼容' },
        ])
      }
    }

    if (SSDComponent) {
      // 硬盘
      const [interfaceType, ssdSize] = getParamsValue(SSDComponent.product.params, ['接口类型', '硬盘尺寸'])
      const size = Number.parseFloat(ssdSize)
      if (
        interfaceType === 'SATA'
        && ((size === 2.5 && SSDComponent.num > size2Number) || (size === 3.5 && SSDComponent.num > size3Number))
      ) {
        res = res.concat([
          {
            key: '机箱',
            message: 'SATA硬盘数量超过机箱支持的硬盘位',
          },
          {
            key: '硬盘',
            message: 'SATA硬盘数量超过机箱支持的硬盘位',
          },
        ])
      }
    }

    if (sanreComponent) {
      // 散热
      const [sanreSize] = getParamsValue(sanreComponent.product.params, ['水冷类型'])

      if (!boxSanreTypes.includes(sanreSize) && sanreSize > 1) {
        res = res.concat([
          { key: '机箱', message: '机箱与CPU散热器水冷规格不兼容' },
          { key: 'CPU散热器', message: '机箱与CPU散热器水冷规格不兼容' },
        ])
      }
    }

    if (zhubanComponent) {
      // 主板
      const [zhubanSize] = getParamsValue(zhubanComponent.product.params, ['主板板型'])
      if (banTypes[zhubanSize] > banTypes[containerSize]) {
        res = res.concat([
          { key: '主板', message: '主板与机箱板型不兼容' },
          { key: '机箱', message: '主板与机箱板型不兼容' },
        ])
      }
    }

    return res
  },
  内存: (components) => {
    // 验证主板
    const res = []
    const [current, zhubanComp] = getComponents(components, ['内存', '主板'])
    if (!current)
      return res
    if (zhubanComp) {
      const [supportType, supportNumber] = getParamsValue(zhubanComp.product.params, ['内存支持类型', '内存支持类型'])
      const [neicunType, number] = getParamsValue(current?.product?.params, ['内存类型', '内存数量'])
      if (supportNumber < current.num * number) {
        res.push({
          key: '主板',
          message: '内存数量超过主板支持的插槽数',
        })
      }
      if (supportType !== neicunType) {
        res.push({
          key: '内存',
          message: '内存类型与主板支持类型不兼容',
        })
      }
    }
    return res
  },
  硬盘: (components) => {
    // 验证主板，机械硬盘判断是否兼容机箱
    let res = []
    const [current, zhubanComponent, boxComponent] = getComponents(components, ['硬盘', '主板', '机箱'])
    if (!current)
      return res
    const [interfaceType, channelType, ssdSize] = getParamsValue(current?.product?.params, ['接口类型', '总线通道', '硬盘尺寸'])
    /*
            M.2类型验证主板  验证主板插槽类型 可向下兼容
            SATA类型验证机箱  根据机箱硬盘位和硬盘数量判断
        */
    if (zhubanComponent) {
      const [zhubanPCIe] = getParamsValue(zhubanComponent.product.params, ['PCIe标准支持'])
      if (interfaceType === 'M.2') {
        if (PCIeTypes[channelType] > PCIeTypes[zhubanPCIe]) {
          // 总线类型不兼容
          res = res.concat([
            {
              key: '主板',
              message: '主板与M.2硬盘PCIe版本不兼容',
            },
            {
              key: '硬盘',
              message: '主板与M.2硬盘PCIe版本不兼容',
            },
          ])
        }
      }
    }
    if (boxComponent && interfaceType === 'SATA') {
      // SATA类型验证机箱  根据机箱硬盘位和硬盘数量判断
      const [size2Number, size3Number] = getParamsValue(boxComponent.product.params, ['2.5寸硬盘位', '3.5寸硬盘位'])
      const size = Number.parseFloat(ssdSize)
      if ((size === 2.5 && current.num > size2Number) || (size === 3.5 && current.num > size3Number)) {
        res = res.concat([
          {
            key: '机箱',
            message: 'SATA硬盘数量超过机箱支持的硬盘位',
          },
          {
            key: '硬盘',
            message: 'SATA硬盘数量超过机箱支持的硬盘位',
          },
        ])
      }
    }
    return res
  },
  显卡: (components) => {
    // 验证电源、机箱
    let res = []
    let cpuKW = 0
    let powerKW = 0
    const [current, cpuComponent, powerComponent, boxComponent] = getComponents(components, ['显卡', 'CPU', '电源', '机箱'])
    if (!current)
      return res
    const [xiankaKW, xiankaSize] = getParamsValue(current?.product?.params, ['显卡功耗(W)', '整体尺寸(mm)'])

    if (powerComponent) {
      [powerKW] = getParamsValue(powerComponent.product.params, ['额定功率(W)'])
      if (cpuComponent) {
        [cpuKW] = getParamsValue(cpuComponent.product.params, ['Turbo功耗(最大功耗W)'])
      }
      if (powerKW < cpuKW + xiankaKW + 100) {
        // 功率不足
        res = [
          {
            key: '电源',
            message: '电源功率不足',
          },
          {
            key: '显卡',
            message: '电源功率不足',
          },
        ]
      }
    }

    if (boxComponent) {
      const [limitSize] = getParamsValue(boxComponent.product.params, ['显卡限长(mm)'])
      const [maxLength] = xiankaSize.split('*')
      if (maxLength > limitSize) {
        res = res.concat([
          {
            key: '显卡',
            message: '显卡尺寸超过机箱限长',
          },
          {
            key: '主板',
            message: '显卡尺寸超过机箱限长',
          },
        ])
      }
    }

    return res
  },
  CPU散热器: (components) => {
    // 验证CPU、机箱
    let res = []
    const [current, cpuComponent, boxComponent] = getComponents(components, ['CPU散热器', 'CPU', '机箱'])
    if (!current)
      return res
    const [sanrenSlot, sanreSize] = getParamsValue(current?.product?.params, ['兼容平台', '水冷类型'])
    if (cpuComponent) {
      // cpu验证
      const [cpuSlotType, cpuKW] = getParamsValue(cpuComponent.product.params, ['插槽类型', '基本功耗(W)'])
      if (cpuKW >= 105 && sanreSize < 240) {
        res.push({ key: 'CPU散热器', message: 'CPU功耗高，请选择240及以上水冷散热器' })
      }
      if (sanrenSlot && !sanrenSlot.includes(cpuSlotType)) {
        res.push({ key: 'CPU散热器', message: 'CPU与CPU散热器插槽类型不兼容' })
      }
    }

    if (boxComponent) {
      // 机箱验证
      const [sanreTypes] = getParamsValue(boxComponent.product.params, ['水冷规格支持'])

      if (!sanreTypes.includes(sanreSize) && sanreSize > 1) {
        res = res.concat([
          { key: '机箱', message: '机箱与CPU散热器水冷规格不兼容' },
          { key: 'CPU散热器', message: '机箱与CPU散热器水冷规格不兼容' },
        ])
      }
    }

    return res
  },
  电源: (components) => {
    // 筛选 cpu 显卡
    let res = []
    let cpuKW = 0
    let xiankaKW = 0
    const [current, cpuComponent, xiankaComponent, boxComponent] = getComponents(components, ['电源', 'CPU', '显卡', '机箱'])
    if (!current)
      return res
    const [powerKW, powerSize] = getParamsValue(current?.product?.params, ['额定功率(W)', '电源尺寸'])
    // 筛选cpu 显卡 电源额定功率数据
    if (cpuComponent) {
      [cpuKW] = getParamsValue(cpuComponent.product.params, ['Turbo功耗(最大功耗W)'])
    }
    if (xiankaComponent) {
      [xiankaKW] = getParamsValue(xiankaComponent.product.params, ['显卡功耗(W)'])
    }
    if (boxComponent) {
      const [powerSupportSize] = getParamsValue(boxComponent.product.params, ['电源尺寸支持'])
      if (!powerSupportSize.includes(powerSize)) {
        res = res.concat([
          { key: '机箱', message: '机箱与电源尺寸不兼容' },
          { key: '电源', message: '机箱与电源尺寸不兼容' },
        ])
      }
    }
    if (powerKW < cpuKW + xiankaKW + 100) {
      // 功率不足
      res = res.concat([
        {
          key: '电源',
          message: '电源功率不足',
        },
        {
          key: '显卡',
          message: '电源功率不足',
        },
      ])
    }
    return res
  },
}

export const componentFilter = {
  CPU(components, props) {
    // 根据主板类型过滤
    const [zhubanComponent] = getComponents(components, ['主板'])
    if (!zhubanComponent)
      return []
    const [cpuSlotType] = getParamsValue(zhubanComponent.product?.params, ['CPU插槽类型'], 'object')
    return [{ id: props.filterProps['插槽类型'], v: [cpuSlotType.value] }]
  },
  主板(components, props) {
    // 根据CPU插槽类型，内存类型过滤
    const res = []
    const [zhubanComponent, neicunComp] = getComponents(components, ['主板', '内存'])
    if (zhubanComponent) {
      const [cpuSlotType] = getParamsValue(zhubanComponent.product?.params, ['CPU插槽类型'], 'object')
      res.push({ id: props.filterProps['CPU插槽类型'], v: [cpuSlotType.value] })
    }
    if (neicunComp) {
      const [neicunType] = getParamsValue(neicunComp.product?.params, ['内存类型'], 'object')
      res.push({ id: props.filterProps['内存支持类型'], v: [neicunType.value] })
    }
    return res
  },
  机箱() {
    // 根据CPU插槽类型，内存类型过滤
    return []
  },
  内存(components, props) {
    // 根据主板内存支持类型过滤
    const [zhubanComponent] = getComponents(components, ['主板'])
    if (!zhubanComponent)
      return []
    const [neicunType] = getParamsValue(zhubanComponent.product?.params, ['内存支持类型'], 'object')
    return [{ id: props.filterProps['内存类型'], v: [neicunType.value] }]
  },
  硬盘() {
    // 全部
    return []
  },
  显卡() {
    // 全部
    return []
  },
  CPU散热器(components, props) {
    // 根据CPU基本功耗过滤，多选满足条件的散热器水冷类型
    const res = []
    const [cpuComponent] = getComponents(components, ['CPU'])
    if (!cpuComponent)
      return []
    const [powerKw] = getParamsValue(cpuComponent.product?.params, ['基本功耗(W)'], 'object')

    if (powerKw.value > 105) {
      res.push({ id: props.filterProps['水冷类型'], v: ['120', '240', '280', '360', '480'] })
    }
    return res
  },
  电源(components, props) {
    /**
     * 根据整机功耗计算，查询整机功耗至整机功耗+500W，比如整机功耗算出来860W，
     * 默认查询条件是860-1350W，用户也可自行修改功率范围再次查询；
     * 如果机箱最高主板板型是ITX，电源尺寸选择SFX
     */
    const res = []
    const [zhubanComponent] = getComponents(components, ['机箱'])
    if (zhubanComponent) {
      const [banxingType] = getParamsValue(zhubanComponent.product?.params, ['最高主板板型'], 'object')
      if (banxingType.value === 'ITX') {
        res.push({ id: props.filterProps['电源尺寸'], v: ['SFX'] })
      }
    }
    if (props.totalKW) {
      res.push({ id: props.filterProps['额定功率(W)'], v: { min: props.totalKW, max: props.totalKW + 500 } })
    }
    return res
  },
}

export function getParamsValue(params, names, resultType = '') {
  if (!Array.isArray(names)) {
    throw new TypeError('参数错误')
  }
  const res = []
  if (!params) {
    return res
  }
  names.forEach((name, idx) => {
    res[idx] = null
    for (let i = 0, l = params.length; i < l; i++) {
      const item = params[i]
      const title = item.paramDesc || item.desc
      if (name === title) {
        res[idx] = resultType === 'object' ? { value: item.paramValue, id: item.paramID } : item.paramValue
        break
      }
    };
  })
  return res
}

export function getComponents(components, componentNames) {
  if (!Array.isArray(componentNames)) {
    throw new TypeError('参数错误')
  }
  const res = []
  componentNames.forEach((name, idx) => {
    res[idx] = null
    for (let i = 0, l = components.length; i < l; i++) {
      const item = components[i]
      if (!item) {
        break
      }
      const tagTitle = item.tagTitle
      if (name === tagTitle && item.product.params) {
        res[idx] = item
        break
      }
    }
  })

  return res
}

export function createErrors(components) {
  let errors = []
  const tagTitles = Object.keys(icons)
  tagTitles.forEach((item) => {
    if (validator[item]) {
      const err = validator[item](components)
      errors = errors.concat(err)
    }
  })
  return errors
}

export default validator
