interface BuyProduct extends Product {
  quantity: number
  select: boolean
  delete: boolean
}

interface goodsListInfo {
  name: string
  price: number
  number: number
}

interface delobj {
  ids: number[]
  alls: number[]
}
