/**
 * 订单状态枚举
 */
export enum OrderStatus {
  /**
   * 全部订单
   */
  All = 0,
  /**
   * 待付款订单
   */
  Wait = 1,
  /**
   * 已付款订单
   */
  PaymentSuccessful = 2,
  /**
   * 支付失败订单
   */
  PaymentFailed = 3,
  /**
   * 部分退款订单
   */
  PartialRefund = 4,
  /**
   * 全部退款订单
   */
  FullRefund = 5,
  /**
   * 取消支付订单
   */
  CancelPayment = 6,
}
