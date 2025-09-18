# GoView Frontend

一个基于 Vue 3 + TypeScript 的可视化拖拽编辑器前端项目，支持快速构建数据可视化大屏。

## ✨ 特性

- 🎨 **拖拽编辑** - 支持组件拖拽、缩放、旋转等操作
- 📊 **丰富图表** - 集成 ECharts、VChart 等多种图表库
- 🎯 **实时预览** - 所见即所得的实时预览功能
- 🔧 **灵活配置** - 支持自定义组件、主题、样式等
- 🌐 **国际化** - 支持多语言切换
- 📱 **响应式设计** - 适配多种屏幕尺寸
- 🚀 **性能优化** - 基于 Vite 的快速构建和热更新

## 🛠️ 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite 4.3.6
- **UI 组件**: Naive UI
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **图表库**: ECharts、VChart、Three.js
- **地图**: 高德地图
- **代码编辑器**: Monaco Editor
- **样式**: SCSS
- **工具**: Axios、Day.js、GSAP 等

## 📦 安装

```bash
# 安装依赖
pnpm install
```

## 🚀 开发

```bash
# 启动开发服务器
pnpm run dev

# 使用 PM2 启动
pnpm run dev:pm2

# 构建生产版本
pnpm run build

# 预览构建结果
pnpm run preview
```

## ⚙️ 配置

### 项目配置
新建 `vite.config.local.js` 文件，用于配置项目：

```js
import { mergeConfig, loadEnv } from 'vite';
import { axiosPre } from './src/settings/httpSetting';

export default function localViteConfig(defaultConfig, { mode }) {
  return mergeConfig(defaultConfig, {
    server: {
      host: true,
      open: true,
      port: 37258,   // 选一个你喜欢的端口
      proxy: {
        [axiosPre]: {
          target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
          changeOrigin: true,
          ws: true,
          secure: true,
        }
      }
    },
  });
}

```

### 环境变量配置

项目根目录的 `.env` 文件用于配置环境变量：

```env
# 端口配置
VITE_DEV_PORT = '8080'

# 开发环境 API 地址
VITE_DEV_PATH = 'http://127.0.0.1:8080'

# 生产环境 API 地址
VITE_PRO_PATH = 'http://127.0.0.1:8080'
```

## 📝 Git 提交规范

项目使用 CommitLint 确保提交信息的规范性：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档修改
- `perf`: 性能优化
- `revert`: 版本回退
- `ci`: CI/CD 集成相关
- `test`: 添加测试代码
- `refactor`: 代码重构
- `build`: 影响项目构建或依赖修改
- `style`: 不影响程序逻辑的代码修改
- `chore`: 不属于以上类型的其他类型

## 🤝 相关项目

- **后端项目**: [go-view-serve](https://gitee.com/MTrun/go-view-serve)
- **API 文档**: [接口说明](https://docs.apipost.cn/preview/5aa85d10a59d66ce/ddb813732007ad2b?target_id=84dbc5b0-158f-4bcb-8f74-793ac604ada3#3e053622-1e76-43f9-a039-756aee822dbb)

## 📄 许可证

[MIT License](LICENSE)

---
