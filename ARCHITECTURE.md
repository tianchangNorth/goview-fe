# Atlats 项目架构文档

## 项目概述

Atlats 是一个基于 Vue3 的数据可视化低代码开发平台，提供了丰富的图表组件和可视化编辑功能。项目采用现代化的前端技术栈，支持拖拽式大屏设计和实时数据展示。

## 技术栈

### 核心技术
- **Vue 3.5.13** - 前端框架
- **TypeScript 4.6.3** - 类型安全
- **Vite 4.3.6** - 构建工具
- **NaiveUI 2.40.3** - UI 组件库
- **Pinia 2.0.13** - 状态管理
- **Vue Router 4.0.12** - 路由管理

### 图表库
- **ECharts 5.3.2** - 企业级图表库
- **VChart 2.0.0** - 字节跳动图表库
- **Three.js 0.145.0** - 3D 图形库

### 其他关键依赖
- **Monaco Editor** - 代码编辑器
- **Vue i18n** - 国际化
- **GSAP** - 动画库
- **Axios** - HTTP 请求
- **Crypto-js** - 加密工具

## 项目结构

```
go-view/
├── src/                          # 源代码目录
│   ├── api/                      # API 接口层
│   │   ├── axios.ts             # Axios 配置
│   │   ├── http.ts              # HTTP 封装
│   │   └── mock/                # Mock 数据
│   ├── assets/                  # 静态资源
│   │   ├── images/              # 图片资源
│   │   │   ├── canvas/          # 画布相关图片
│   │   │   ├── chart/           # 图表相关图片
│   │   │   ├── exception/       # 异常页面图片
│   │   │   ├── login/           # 登录页面图片
│   │   │   ├── project/         # 项目相关图片
│   │   │   └── tips/            # 提示相关图片
│   │   ├── logo.png             # Logo
│   │   └── videos/              # 视频资源
│   ├── components/              # 全局组件
│   │   ├── GoAppProvider/       # 应用提供者
│   │   ├── GoIconify/           # 图标组件
│   │   ├── GoLangSelect/        # 语言选择
│   │   ├── GoLoading/           # 加载组件
│   │   ├── GoReload/            # 重载组件
│   │   ├── GoSkeleton/          # 骨架屏组件
│   │   ├── GoSystemInfo/        # 系统信息组件
│   │   ├── GoSystemSet/         # 系统设置组件
│   │   ├── GoThemeSelect/       # 主题选择组件
│   │   ├── GoUserInfo/          # 用户信息组件
│   │   ├── GoVChart/            # VChart 图表组件
│   │   ├── I18n/                # 国际化组件
│   │   ├── Pages/               # 页面组件
│   │   ├── Plugins/             # 插件组件
│   │   └── Tips/                # 提示组件
│   ├── directives/              # 自定义指令
│   ├── enums/                   # 枚举定义
│   │   ├── editPageEnum.ts      # 编辑页枚举
│   │   ├── eventEnum.ts         # 事件枚举
│   │   ├── fileTypeEnum.ts      # 文件类型枚举
│   │   ├── httpEnum.ts          # HTTP 枚举
│   │   ├── pageEnum.ts          # 页面枚举
│   │   ├── pluginEnum.ts        # 插件枚举
│   │   ├── storageEnum.ts       # 存储枚举
│   │   └── styleEnum.ts         # 样式枚举
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── useCanvasInitOptions.hook.ts     # 画布初始化配置
│   │   ├── useChartDataFetch.hook.ts        # 图表数据获取
│   │   ├── useChartDataPondFetch.hook.ts    # 数据池获取
│   │   ├── useChartInteract.hook.ts         # 图表交互
│   │   ├── useCode.hook.ts                   # 代码处理
│   │   ├── useLang.hook.ts                  # 语言处理
│   │   ├── useLifeHandler.hook.ts           # 生命周期处理
│   │   ├── usePreviewScale.hook.ts          # 预览缩放
│   │   ├── useTheme.hook.ts                 # 主题处理
│   │   └── useVCharts.hook.ts               # VCharts 处理
│   ├── i18n/                    # 国际化配置
│   │   ├── en/                  # 英文配置
│   │   ├── zh/                  # 中文配置
│   │   └── index.ts             # 国际化入口
│   ├── layout/                  # 布局组件
│   │   ├── components/          # 布局子组件
│   │   │   ├── LayoutFooter/    # 页脚
│   │   │   ├── LayoutHeader/    # 头部
│   │   │   ├── LayoutHeaderPro/ # 专业头部
│   │   │   ├── LayoutMain/      # 主体
│   │   │   └── LayoutTransitionMain/ # 过渡主体
│   │   ├── index.vue            # 主布局
│   │   └── parentLayout.vue     # 父布局
│   ├── packages/                # 图表包
│   │   ├── chartConfiguration/  # 图表配置
│   │   │   ├── echarts/         # ECharts 配置
│   │   │   └── vcharts/         # VCharts 配置
│   │   ├── components/          # 图表组件
│   │   │   ├── Charts/          # 图表类组件
│   │   │   ├── Decorates/       # 装饰类组件
│   │   │   ├── Icons/           # 图标类组件
│   │   │   ├── Informations/    # 信息类组件
│   │   │   ├── Photos/          # 图片类组件
│   │   │   ├── Tables/          # 表格类组件
│   │   │   └── VChart/          # VChart 组件
│   │   ├── public/              # 公共配置
│   │   └── index.ts             # 包入口
│   ├── plugins/                 # 插件配置
│   │   ├── customComponents.ts  # 自定义组件
│   │   ├── directives.ts        # 指令配置
│   │   ├── icon.ts              # 图标配置
│   │   ├── index.ts             # 插件入口
│   │   ├── initFunction.ts      # 初始化函数
│   │   └── naive.ts             # NaiveUI 配置
│   ├── router/                  # 路由配置
│   │   ├── modules/             # 路由模块
│   │   │   ├── chart.route.ts   # 图表路由
│   │   │   ├── edit.route.ts    # 编辑路由
│   │   │   ├── index.ts         # 路由索引
│   │   │   ├── preview.route.ts # 预览路由
│   │   │   └── project.router.ts # 项目路由
│   │   ├── base.ts              # 基础路由
│   │   ├── constant.ts          # 常量路由
│   │   ├── index.ts             # 路由入口
│   │   ├── router-guards.ts     # 路由守卫
│   │   └── types.ts             # 路由类型
│   ├── settings/                # 设置配置
│   │   ├── animations/          # 动画设置
│   │   ├── chartThemes/         # 图表主题
│   │   ├── designColor.json     # 设计颜色
│   │   ├── designSetting.ts     # 设计设置
│   │   ├── pathConst.ts         # 路径常量
│   │   ├── systemSetting.ts     # 系统设置
│   │   └── vchartThemes/        # VChart 主题
│   ├── store/                   # 状态管理
│   │   ├── modules/             # 模块化状态
│   │   │   ├── chartEditStore/    # 图表编辑状态
│   │   │   ├── chartHistoryStore/ # 图表历史状态
│   │   │   ├── chartLayoutStore/  # 图表布局状态
│   │   │   ├── designStore/       # 设计状态
│   │   │   ├── langStore/         # 语言状态
│   │   │   ├── packagesStore/     # 包状态
│   │   │   └── settingStore/      # 设置状态
│   │   └── index.ts              # 状态入口
│   ├── styles/                  # 样式文件
│   │   ├── common/              # 公共样式
│   │   │   ├── animation.scss   # 动画样式
│   │   │   ├── _dark.scss       # 暗色主题
│   │   │   ├── format.scss      # 格式化样式
│   │   │   ├── _light.scss      # 亮色主题
│   │   │   ├── mixins/          # 混入样式
│   │   │   ├── style.scss       # 基础样式
│   │   │   ├── theme.scss       # 主题样式
│   │   │   └── var.scss         # 变量样式
│   │   └── pages/               # 页面样式
│   ├── utils/                   # 工具函数
│   │   ├── components.ts        # 组件工具
│   │   ├── crypto.ts            # 加密工具
│   │   ├── file.ts              # 文件工具
│   │   ├── index.ts             # 工具入口
│   │   ├── plugin.ts            # 插件工具
│   │   ├── router.ts            # 路由工具
│   │   ├── storage.ts           # 存储工具
│   │   ├── style.ts             # 样式工具
│   │   ├── type.ts              # 类型工具
│   │   └── utils.ts             # 通用工具
│   ├── views/                   # 页面视图
│   │   ├── chart/               # 图表页面
│   │   ├── edit/                # 编辑页面
│   │   ├── exception/           # 异常页面
│   │   ├── login/               # 登录页面
│   │   ├── preview/             # 预览页面
│   │   ├── project/             # 项目页面
│   │   └── redirect/            # 重定向页面
│   ├── App.vue                  # 根组件
│   └── main.ts                  # 入口文件
├── types/                       # TypeScript 类型定义
├── build/                       # 构建配置
├── public/                      # 公共资源
├── .husky/                      # Git hooks
├── plop/                        # 代码生成
└── .workflow/                   # 工作流配置
```

## 核心架构设计

### 1. 应用启动流程

**main.ts** 应用初始化流程：
1. 创建 GoAppProvider 应用提供者
2. 创建主应用实例
3. 注册 NaiveUI 全局组件
4. 注册自定义指令
5. 注册自定义组件
6. 挂载状态管理 (Pinia)
7. 挂载路由
8. 设置主题
9. 注册国际化
10. 挂载应用

### 2. 状态管理架构

使用 **Pinia** 进行状态管理，采用模块化设计：

- **chartEditStore**: 图表编辑状态管理
- **chartHistoryStore**: 图表历史记录管理
- **chartLayoutStore**: 图表布局管理
- **designStore**: 设计相关状态
- **langStore**: 语言设置
- **packagesStore**: 图表包管理
- **settingStore**: 系统设置

### 3. 路由架构

采用 **Vue Router 4** 的路由管理：
- **模块化路由**: 按功能模块划分路由配置
- **路由守卫**: 实现权限控制和页面访问管理
- **懒加载**: 页面组件按需加载

### 4. 组件架构

#### 全局组件
- **GoAppProvider**: 应用级状态提供者
- **GoIconify**: 图标渲染组件
- **GoLoading**: 加载状态组件
- **GoThemeSelect**: 主题选择组件

#### 图表组件
- **ECharts 系列**: 支持柱状图、折线图、饼图等
- **VChart 系列**: 字节跳动图表库集成
- **装饰组件**: 边框、装饰元素等
- **信息组件**: 文字、图片、视频等

### 5. Hooks 设计

采用 **Composition API** 设计自定义 Hooks：
- **useChartDataFetch**: 图表数据获取
- **useCanvasInitOptions**: 画布初始化
- **useTheme**: 主题管理
- **usePreviewScale**: 预览缩放
- **useChartInteract**: 图表交互

### 6. 插件系统

- **customComponents**: 自定义组件注册
- **directives**: 自定义指令
- **naive**: NaiveUI 组件配置
- **icon**: 图标系统

## 配置文件

### 构建配置 (vite.config.ts)
- **端口**: 3020
- **别名配置**: @ 指向 src，/# 指向 types
- **全局样式**: SCSS 预处理器配置
- **插件**: Monaco Editor、Mock 服务、压缩等

### TypeScript 配置 (tsconfig.json)
- **目标**: esnext
- **严格模式**: 启用严格类型检查
- **路径映射**: 支持 @ 和 /# 别名

## 开发规范

### 目录命名
- **小写命名**: 所有目录使用小写
- **连字符分隔**: 多单词目录使用连字符分隔
- **语义化命名**: 目录名称应具有语义化

### 文件命名
- **组件文件**: 使用 PascalCase (如 GoAppProvider.vue)
- **工具文件**: 使用 camelCase (如 utils.ts)
- **类型文件**: 使用 .ts 扩展名
- **样式文件**: 使用 .scss 扩展名

### 代码组织
- **模块化**: 按功能模块组织代码
- **分层架构**: 清晰的层次结构
- **类型安全**: 使用 TypeScript 确保类型安全

## 性能优化

### 1. 构建优化
- **代码分割**: 按需加载
- **压缩优化**: Gzip 压缩
- **Tree Shaking**: 移除未使用代码

### 2. 运行时优化
- **懒加载**: 页面和组件懒加载
- **虚拟滚动**: 长列表优化
- **缓存策略**: 合理的数据缓存

### 3. 开发体验
- **热更新**: 快速的开发反馈
- **类型检查**: 实时类型错误提示
- **代码规范**: ESLint + Prettier 统一代码风格

## 部署相关

### 环境要求
- **Node.js**: >= 16.14
- **pnpm**: 推荐使用 pnpm 作为包管理器

### 构建命令
- **开发**: `pnpm dev`
- **构建**: `pnpm build`
- **预览**: `pnpm preview`
- **代码检查**: `pnpm lint`

## 特色功能

### 1. 拖拽式编辑
支持拖拽式大屏设计，实时预览效果

### 2. 丰富的图表库
集成 ECharts 和 VChart，提供多种图表类型

### 3. 主题系统
支持明暗主题切换，自定义主题颜色

### 4. 国际化支持
支持中英文切换，可扩展多语言

### 5. 实时预览
支持实时预览和多种屏幕适配

## 总结

Atlats 项目采用了现代化的前端架构设计，具有以下特点：

1. **技术先进**: 基于 Vue3 + TypeScript + Vite 的现代化技术栈
2. **架构清晰**: 模块化设计，层次分明
3. **类型安全**: 完整的 TypeScript 类型系统
4. **性能优秀**: 多重性能优化策略
5. **开发友好**: 完善的开发工具和规范
6. **功能丰富**: 丰富的图表组件和编辑功能

该架构设计为数据可视化应用提供了坚实的技术基础，具有良好的可维护性和扩展性。