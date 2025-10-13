import { RouteRecordRaw } from 'vue-router'
import { PublishEnum } from '@/enums/pageEnum'

const publishedRoutes: RouteRecordRaw = {
  path: PublishEnum.CHART_PUBLISHED,
  name: PublishEnum.CHART_PUBLISHED_NAME,
  component: () => import('@/views/published/wrapper.vue'),
  meta: {
    title: '发布',
    isRoot: true,
    requireAuth: false // 发布页面通常不需要登录验证
  }
}

export default publishedRoutes