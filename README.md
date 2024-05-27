<p align="center">
  <img src="https://github.com/uni-helper/vitesse-uni-app/raw/main/.github/images/preview.png" width="300"/>
</p>

<h2 align="center">
Vitesse for uni-app
</h2>
<p align="center">
  <a href="https://vitesse-uni-app.netlify.app/">📱 在线预览</a>
  <a href="https://vitesse-docs.netlify.app/">📖 阅读文档</a>
</p>

## 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - 就是快！

- 🗂 [基于文件的路由](./src/pages)

- 📦 [组件自动化加载](./src/components)

- 📑 [布局系统](./src/layouts)

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [各种图标集为你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)

- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入

- 🦾 [TypeScript](https://www.typescriptlang.org/) & [ESLint](https://eslint.org/) - 保证代码质量

|--src 源代码文件

|---assets 静态资源
|----css 清理默认格式
|----iconts 用户交互图标
|----svg 提示/logo图标

|---components 组件
|----avatar 个人中心默认头像组件
|----buy 购物车模块
|----carousel 轮播图组件(效果)
|----common 通用组件
|-----Empty.vue 空状态组件
|-----Layout.vue 整体布局、导航栏+内容区+底栏
|-----Message.vue 成功消息提示组件
|-----Model.vue 选择性带按钮、文字、背景的弹窗
|-----Navbar.vue 头部导航（背景）
|-----Tabbar.vue 底部导航
|-----Popup.vue 弹窗？
|----index 首页
|-----carousel 首页三个轮播图的实现
|------Banner.vue 轮播大图
|------Hot.vue 热门商品轮播
|------Push.vue 推荐定制轮播
|-----product 笔记本板块商品详情
|------List.vue 笔记本返回的商品列表
|------SwtichType.vue 笔记本板块tab切换
|------Title.vue 笔记本标题
|----navbar 导航栏组件
|-----Home.vue 首页图标
|-----LogoSearch.vue 导航栏logo+搜索框
|----product 商品组件
|-----Image.vue 商品展示图(商品图+logo图)

|---composables 组合式API
|----const 默认值
|-----useNavbarSize.ts 顶部导航默认值
|-----useTabbarSize.ts 底部导航默认值
|----media
|-----useMenuButtonBounding.ts 菜单按钮边界
|-----useSafeAreaInsets.ts 设定安全区域

|---layouts 布局
|----default.vue 默认布局(?)
|----full.vue 全屏布局（？）
|----home.vue 页面布局

|---model
|----buy.ts 购物车的相关操作
|----product.ts 展示商品分类
|----user.ts 判断、展示用户信息
|----window.ts 获取商品信息、根据特定条件查找橱窗数据

|---pages 页面
|----buy.vue 购物车页面
|----custom.vue 智能推荐和邀请推广页面
|----index.vue 首页
|----me.vue 个人中心页面
|----menu.vue 商品分类页面

|---plugins 插件
|----pinia.ts
|----uview.ts

|---utils 工具
|----common 通用工具
|-----splicing_url.ts 将图片、资源转换为链接
|-----toast.ts 提示信息（显示内容、提示时间）
|----request 请求工具
|-----http.ts 请求信息（?）
|----router 路由工具
|-----jump.ts 页面跳转、并导出jump函数
|----user 用户工具
|-----privacy.ts 手机号脱离敏感信息

|---App.vue 首加载项

|---end.ts 定义组件类型和声明环境变量

|---main.ts 创建实例

|---manifest.json 应用配置

|---pages.json 页面路由配置

|---shims.d.ts 声明Vue全局变量

|---theme.json 主题配置（？）

|---uni.scss 控制整体风格（类似规范？）
