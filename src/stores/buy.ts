export const useBuyStore = defineStore('buy', {
  state: (): {
    shoppingCart: Array<Product & { quantity: number, select: boolean }>
  } => ({
    shoppingCart: [],
  }),
})
