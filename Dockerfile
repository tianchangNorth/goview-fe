# 构建阶段
FROM alibaba-atom-cs-registry.cn-beijing.cr.aliyuncs.com/openatom/pnpm:22.15.0-bookworm AS builder

# 设置工作目录
WORKDIR /app

# 复制包管理文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm run build

# 生产阶段 - 使用 nginx 服务静态文件
FROM alibaba-atom-cs-registry.cn-beijing.cr.aliyuncs.com/openatom/nginx:1.27.0-alpine3.19

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 4443

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]