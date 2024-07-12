// 判断产品是否是可以购买的状态
export function ProductStatus(status: number) {
  const ProductStatus = ref<number[]>([1])
  return ProductStatus.value.includes(status)
}
