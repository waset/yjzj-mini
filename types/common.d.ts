/**
 * 描述类
 */
type Desc<T> = Partial<{
  [K in keyof T as `${string & K}Desc`]: string
}> & T
