<template>
  <n-space class="go-mt-0" :wrap="false">
    <n-button v-for="item in comBtnList" :key="item.key" :type="item.type()" ghost @click="item.event">
      <template #icon>
        <component :is="item.icon"></component>
      </template>
      <span>{{ item.title() }}</span>
    </n-button>
  </n-space>

  <!-- 发布管理弹窗 -->
  <n-modal v-model:show="modelShow" @afterLeave="closeHandle">
    <n-list bordered class="go-system-setting">
      <template #header>
        <n-space justify="space-between">
          <n-h3 class="go-mb-0">发布管理</n-h3>
          <n-icon size="20" class="go-cursor-pointer" @click="closeHandle">
            <close-icon></close-icon>
          </n-icon>
        </n-space>
      </template>

      <n-list-item>
        <n-space :size="10">
          <n-alert :show-icon="false" :title="release ? '发布地址：' : '预览地址：'" type="success">
            {{ previewPathRef }}
          </n-alert>
          <n-space vertical>
            <n-button tertiary type="primary" @click="copyPreviewPath()"> 复制地址 </n-button>
            <n-button :type="release ? 'warning' : 'primary'" @click="sendHandle">
              {{ release ? '取消发布' : '发布大屏' }}
            </n-button>
          </n-space>
        </n-space>
      </n-list-item>

      <n-list-item>
        <n-space :size="10">
          <n-button @click="modelShowHandle">关闭弹窗</n-button>
        </n-space>
      </n-list-item>
    </n-list>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { PreviewEnum, PublishEnum } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { ResultEnum } from '@/enums/httpEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { syncData } from '../../ContentEdit/components/EditTools/hooks/useSyncUpdate.hook'
import { ProjectInfoEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { changeProjectReleaseApi } from '@/api/path'
import copy from 'copy-to-clipboard';
import {
  renderIcon,
  fetchPathByName,
  routerTurnByPath,
  setSessionStorage,
  getSessionStorage,
  httpErrorHandle,
  fetchRouteParamsLocation
} from '@/utils'
import { icon } from '@/plugins'
import { cloneDeep } from 'lodash'

const { BrowsersOutlineIcon, SendIcon, AnalyticsIcon, CloseIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()
const routerParamsInfo = useRoute()

const previewPathRef = computed(() => {
  const { id } = routerParamsInfo.params
  const projectId = typeof id === 'string' ? id : id[0]

  if (!projectId) return ''

  const { origin } = document.location
  const path = release.value
    ? fetchPathByName(PublishEnum.CHART_PUBLISHED_NAME, 'href')
    : fetchPathByName(PreviewEnum.CHART_PREVIEW_NAME, 'href')

  if (!path) return ''

  // 直接使用完整的路径，不重复拼接pathname
  return `${origin}${path}/${projectId}`
})

const modelShow = ref<boolean>(false)
const release = ref<boolean>(false)

watchEffect(() => {
  release.value = chartEditStore.getProjectInfo.release || false
})

// 关闭弹窗
const closeHandle = () => {
  modelShow.value = false
}

// 预览/发布
const previewHandle = () => {
  const { id } = routerParamsInfo.params
  if (!id) {
    window['$message'].error('项目ID不存在')
    return
  }

  // id 标识
  const projectId = typeof id === 'string' ? id : id[0]
  const isPublished = release.value

  // 根据发布状态选择路由
  const path = isPublished
    ? fetchPathByName(PublishEnum.CHART_PUBLISHED_NAME, 'href')
    : fetchPathByName(PreviewEnum.CHART_PREVIEW_NAME, 'href')

  if (!path) {
    window['$message'].error('路由配置错误')
    return
  }

  // 预览模式：需要同步当前编辑数据到sessionStorage
  if (!isPublished) {
    const storageInfo = chartEditStore.getStorageInfo()
    const sessionStorageInfo = getSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST) || []

    if (sessionStorageInfo?.length) {
      const repeatIndex = sessionStorageInfo.findIndex((e: { id: string }) => e.id === projectId)
      // 重复替换
      if (repeatIndex !== -1) {
        sessionStorageInfo.splice(repeatIndex, 1, {
          id: projectId,
          ...storageInfo
        })
        setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo)
      } else {
        sessionStorageInfo.push({
          id: projectId,
          ...storageInfo
        })
        setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo)
      }
    } else {
      setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [{ id: projectId, ...storageInfo }])
    }
  }

  // 跳转到对应页面
  routerTurnByPath(path, [projectId], undefined, true)

  // 显示提示信息
  const actionText = isPublished ? '查看发布页面' : '预览页面'
  window['$message'].success(`正在${actionText}...`)
}

// 模态弹窗
const modelShowHandle = () => {
  modelShow.value = !modelShow.value
}

// 复制预览地址
const copyPreviewPath = (successText?: string, failureText?: string) => {
  try {
    const result = copy(previewPathRef.value)

    if (result) {
      window['$message'].success(successText || '复制成功！')
    } else {
      window['$message'].error(failureText || '复制失败，请手动复制地址')
    }
  } catch (error) {
    console.error('复制失败:', error)
    window['$message'].error(failureText || '复制失败，请手动复制地址')
  }
}

// 发布
const sendHandle = async () => {
  const res = await changeProjectReleaseApi({
    id: fetchRouteParamsLocation(),
    // 反过来
    state: release.value ? -1 : 1
  })

  if (res && res.code === ResultEnum.SUCCESS) {
    modelShowHandle()
    if (!release.value) {
      copyPreviewPath('发布成功！已复制地址到剪贴板~', '发布成功！')
    } else {
      window['$message'].success(`已取消发布`)
    }
    chartEditStore.setProjectInfo(ProjectInfoEnum.RELEASE, !release.value)
  } else {
    httpErrorHandle()
  }
}

const btnList = [
  {
    select: true,
    title: () => '同步内容',
    type: () => 'primary',
    icon: renderIcon(AnalyticsIcon),
    event: syncData
  },
  {
    key: 'preview',
    title: () => (release.value ? '查看' : '预览'),
    type: () => 'default',
    icon: renderIcon(BrowsersOutlineIcon),
    event: previewHandle
  },
  {
    key: 'release',
    title: () => (release.value ? '已发布' : '发布'),
    icon: renderIcon(SendIcon),
    type: () => (release.value ? 'primary' : 'default'),
    event: modelShowHandle
  }
]

const comBtnList = computed(() => {
  if (chartEditStore.getEditCanvas.isCodeEdit) {
    return btnList
  }
  const cloneList = cloneDeep(btnList)
  cloneList.shift()
  return cloneList
})
</script>

<style lang="scss" scoped>
@include go('system-setting') {
  @extend .go-background-filter;
  min-width: 100px;
  max-width: 60vw;
  padding-bottom: 20px;

  @include deep() {
    .n-list-item:not(:last-child) {
      border-bottom: 0;
    }
  }
}
</style>
