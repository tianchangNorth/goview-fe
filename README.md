## 总览

![logo](readme/logo-t-y.png)

**`master-fetch` 分支是带有后端接口请求的分支**

**后端项目地址：[https://gitee.com/MTrun/go-view-serve](https://gitee.com/MTrun/go-view-serve)**

**接口说明地址：[https://docs.apipost.cn/preview/5aa85d10a59d66ce/ddb813732007ad2b?target_id=84dbc5b0-158f-4bcb-8f74-793ac604ada3#3e053622-1e76-43f9-a039-756aee822dbb](https://docs.apipost.cn/preview/5aa85d10a59d66ce/ddb813732007ad2b?target_id=84dbc5b0-158f-4bcb-8f74-793ac604ada3#3e053622-1e76-43f9-a039-756aee822dbb)**

## 使用

所有的接口地址位置：`src\api\path\*`

接口地址修改：`.env`

### 🤯 后端项目

后端项目 gitee 地址：[https://gitee.com/MTrun/go-view-serve](https://gitee.com/MTrun/go-view-serve)

接口说明地址：[https://docs.apipost.cn/preview/5aa85d10a59d66ce/ddb813732007ad2b?target_id=84dbc5b0-158f-4bcb-8f74-793ac604ada3#3e053622-1e76-43f9-a039-756aee822dbb](https://docs.apipost.cn/preview/5aa85d10a59d66ce/ddb813732007ad2b?target_id=84dbc5b0-158f-4bcb-8f74-793ac604ada3#3e053622-1e76-43f9-a039-756aee822dbb)

技术点：

- 框架：基于 `Vue3` 框架编写，使用 `hooks` 写法抽离部分逻辑，使代码结构更加清晰；

- 类型：使用 `TypeScript` 进行类型约束，减少未知错误发生概率，可以大胆修改逻辑内容；

- 性能：多处性能优化，使用页面懒加载、组件动态注册、数据滚动加载等方式，提升页面渲染速度；

- 存储：拥有本地记忆，部分配置项采用 `storage` 存储本地，提升使用体验；

- 封装：项目进行了详细的工具类封装如：路由、存储、加/解密、文件处理、主题、NaiveUI 全局方法、组件等

工作台：
![项目截图](readme/go-view-canvas.png)

请求配置：
![项目截图](readme/go-view-fetch.png)

数据过滤：
![项目截图](readme/go-view-filter.png)

主题色：
![项目截图](readme/go-view-color.png)

主要技术栈为：

| 名称                | 版本  | 名称        | 版本   |
| ------------------- | ----- | ----------- | ------ |
| Vue                 | 3.2.x | TypeScript4 | 4.6.x  |
| Vite                | 4.2.x | NaiveUI     | 2.34.x |
| ECharts             | 5.3.x | Pinia       | 2.0.x  |
| 详见 `package.json` | 😁    | 🥰          | 🤗     |

开发环境:

| 名称 | 版本    | 名称    | 版本  |
| ---- | ------- | ------- | ----- |
| node | 16.16.x | npm     | 8.5.x |
| pnpm | 7.1.x   | windows | 11    |

已完成图表：

| 分类   | 名称             | 名称             | 名称     |
| ------ | ---------------- | ---------------- | -------- |
| 图表   | 柱状图           | 横向柱状图       | 折线图   |
| \*     | 单/多 折线面积图 | 饼图             | 水球图   |
| \*     | 环形图           | NaiveUI 多种进度 | 🤠       |
| 信息   | 文字             | 图片             | 😶       |
| 列表   | 滚动排名列表     | 滚动表格         | 🤓       |
| 小组件 | 边框-01~13       | 装饰-01~05       | 数字翻牌 |

## 浏览器支持

开发和测试平台均在 `Google` 和最新版 `EDGE` 上完成，暂未测试 `IE11` 等其它浏览器，如有需求请自行测试与兼容。

## 安装

本项目采用` pnpm` 进行包管理

```shell
# port
VITE_DEV_PORT = '8080'

# development path
VITE_DEV_PATH = 'http://127.0.0.1:8080'

# production path
VITE_PRO_PATH = 'http://127.0.0.1:8080'
```

公共前缀修改：`src\settings\httpSetting.ts`

```shell
// 请求前缀
export const axiosPre = '/api/goview'
```

接口封装：`src\api\http.ts`

```ts
import axiosInstance from './axios'
import { RequestHttpEnum, ContentTypeEnum } from '@/enums/httpEnum'

export const get = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.GET,
    params: params,
  })
}

export const post = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.POST,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const put = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.PUT,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const del = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.DELETE,
    params
  })
}

// 获取请求函数，默认get
export const http = (type?: RequestHttpEnum) => {
  switch (type) {
    case RequestHttpEnum.GET:
      return get

    case RequestHttpEnum.POST:
      return post

    case RequestHttpEnum.PUT:
      return put

    case RequestHttpEnum.DELETE:
      return del

    default:
      return get
  }
}

```

## 代码提交

* feat: 新功能
* fix: 修复 Bug
* docs: 文档修改
* perf: 性能优化
* revert: 版本回退
* ci: CICD集成相关
* test: 添加测试代码
* refactor: 代码重构
* build: 影响项目构建或依赖修改
* style: 不影响程序逻辑的代码修改
* chore: 不属于以上类型的其他类型(日常事务)

## 交流

QQ 群：1030129384

![QQ群](readme/go-view-qq.png)

![渲染海报](readme/logo-poster.png)
