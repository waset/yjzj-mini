/**
 * 获取日期
 * @param type
 * @returns string
 */
export const getDate = (type?: 'start' | 'end') => {
  const date = new Date()
  let year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (type === 'start') {
    year = year - 60
  }
  else if (type === 'end') {
    year = year + 2
  }

  function padZero(num: number) {
    return num < 10 ? `0${num}` : num
  }

  return `${year}-${padZero(month)}-${padZero(day)}`
}
