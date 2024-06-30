import areadata from './division.json'

export const getPcaIndexes = (pcaCode: string[]) => {
  const [p, c, a] = pcaCode
  let provinceIndex, cityIndex, areaIndex

  provinceIndex = areadata.findIndex(item => item.value === p)
  if (provinceIndex === -1)
    provinceIndex = 0

  const province = areadata[provinceIndex]
  cityIndex = province.children.findIndex(item => item.value === c)
  if (cityIndex === -1)
    cityIndex = 0

  const city = province.children[cityIndex]
  areaIndex = city.children.findIndex(item => item.value === a)
  if (areaIndex === -1)
    areaIndex = 0
  return [provinceIndex, cityIndex, areaIndex]
}
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
