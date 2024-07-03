import areadata from './division.json'

export const getPcaDetails = (pcaCode: string[]) => {
  const [p, c, a] = pcaCode
  const province = areadata.find(item => item.value === p)
  const city = province?.children.find(item => item.value === c)
  const area = city?.children.find(item => item.value === a)

  if (!province || !city || !area) {
    return '未找到对应地区'
  }
  return `${province?.label} ${city?.label} ${area?.label}`
}

export default areadata
