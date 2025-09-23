<template>
  <collapse-item name="属性" :expanded="true">
    <setting-item-box name="路径" :alone="true">
      <setting-item>
        <n-space>
          <n-input v-model:value="optionData.dataset" size="small" placeholder="请输入图片URL或上传图片"></n-input>
          <n-upload
            :show-file-list="false"
            :customRequest="handleImageUpload"
            @before-upload="beforeImageUpload"
            accept="image/*"
          >
            <n-button size="small" type="primary">
              <template #icon>
                <n-icon>
                  <component :is="icon.carbon.DocumentAddIcon" />
                </n-icon>
              </template>
              上传
            </n-button>
          </n-upload>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="类型">
        <n-select
          v-model:value="optionData.fit"
          size="small"
          :options="fitList"
        ></n-select>
      </setting-item>
      <setting-item name="圆角">
        <n-input-number
          v-model:value="optionData.borderRadius"
          size="small"
          :min="0"
          placeholder="圆角"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'
import { icon } from '@/plugins'
import { uploadFile } from '@/api/path'
import { ResultEnum } from '@/enums/httpEnum'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { getUUID } from '@/utils'
import { md5 } from 'js-md5'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})

// 图片上传前的校验
const beforeImageUpload = (data: { file: File }) => {
  const { file } = data
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    window['$message'].error('请上传图片文件！')
    return false
  }
  // if (!isLt5M) {
  //   window['$message'].error('图片大小不能超过 5MB！')
  //   return false
  // }
  return true
}

// 生成基于文件内容的MD5文件名
const generateFileNameByContent = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        // 使用文件内容生成MD5哈希
        const hash = md5(e.target.result as string)
        const fileExt = file.name.split('.').pop()
        resolve(`${hash}.${fileExt}`)
      } else {
        // 如果MD5生成失败，使用UUID作为备选
        const fileExt = file.name.split('.').pop()
        resolve(`${getUUID()}.${fileExt}`)
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

// 处理图片上传
const handleImageUpload = async (options: any) => {
  const { file, onFinish, onError } = options
  const systemStore = useSystemStore()

  // 生成唯一文件名避免重名
  const originalFile = file.file || file
  const uniqueFileName = await generateFileNameByContent(originalFile)

  // 创建新文件对象
  const renamedFile = new File([originalFile], uniqueFileName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified
  })

  const formData = new FormData()
  formData.append('object', renamedFile)

  try {
    const result = await uploadFile(formData)

    if (result && result.code === ResultEnum.SUCCESS) {
      // 上传成功，更新图片URL
      if (result.data.fileurl) {
        props.optionData.dataset = result.data.fileurl
      } else {
        props.optionData.dataset = `${systemStore.getFetchInfo.OSSUrl}${result.data.fileName}`
      }
      window['$message'].success('图片上传成功！')
      onFinish()
    } else {
      window['$message'].error(`上传失败：${result?.message || '未知错误'}`)
      onError()
    }
  } catch (error) {
    console.error('图片上传失败:', error)
    window['$message'].error('图片上传失败，请重试！')
    onError()
  }
}

// 适应类型
const fitList = [
  {
    value: 'fill',
    label: 'fill'
  },
  {
    value: 'contain',
    label: 'contain'
  },
  {
    value: 'cover',
    label: 'cover'
  },
  {
    value: 'scale-down',
    label: 'scale-down'
  },
  {
    value: 'none',
    label: 'none'
  },
]
</script>
