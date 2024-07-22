type TermsCode = 'agreement' | 'privacy'

interface Terms {
  name: string // 名称
  desc: string // 描述
  code: string // 页面id
  content: string // 内容
  status: TermsStatus // 状态
}

enum TermsStatus {
  Normal = 1,
  Disable = 2,
}
