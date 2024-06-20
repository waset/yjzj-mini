/**
 * product 是否为 DIY
 * @param product
 * @returns
 */
export function product_is_diy(product: Product): boolean {
  return product.typeParentID === 6
}
