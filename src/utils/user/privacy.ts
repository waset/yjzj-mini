/**
 * 手机号脱敏
 */
export function SensitivePhone(phone: string) {
  if (!phone || phone.length !== 11)
    return ''

  return `${phone.slice(0, 3)}****${phone.slice(7, 11)}`
}
