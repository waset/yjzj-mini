import areadata from '@/assets/json/division.json'

export const getPcaDetails = (pcaCode: string[]) => {
  const [p, c, a] = pcaCode
  const province = areadata.find(item => item.value === p)
  const city = province?.children.find(item => item.value === c)
  const area = city?.children.find(item => item.value === a)

  return `${province?.label} ${city?.label} ${area?.label}`
}
