/**
 * product 是否为 DIY
 * @param product
 * @returns boolean
 */
export function product_is_diy(product: null | object & { typeParentID: number }): boolean {
  return product?.typeParentID === 6
}
