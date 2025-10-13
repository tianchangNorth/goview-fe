<template>
  <collapse-item name="表格设置" :expanded="true">
    <n-tag type="primary">若配置无响应，请在预览页面查看效果</n-tag>
    <setting-item-box :alone="true" name="对齐方式">
      <setting-item :alone="true">
        <n-select
          v-model:value="optionData.align"
          size="small"
          :options="[
            { label: '靠左', value: 'left' },
            { label: '居中', value: 'center' },
            { label: '靠右', value: 'right' }
          ]"
        />
      </setting-item>
    </setting-item-box>
    <setting-item-box :alone="false" name="分页设置">
      <setting-item name="显示分页" :alone="true">
        <n-select v-model:value="optionData.pagination.show" size="small" :options="showPaginationOptions" />
      </setting-item>
      <setting-item name="默认页码" :alone="true">
        <n-input-number v-model:value="optionData.pagination.page" size="small" placeholder="字体大小"></n-input-number>
      </setting-item>
      <setting-item name="分页" :alone="true">
        <n-select v-model:value="optionData.pagination.pageSize" size="small" :options="page" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :alone="false" name="表格数据">
      <SettingItem name="表头名称" class="form_name">
        <div style="width: 260px">
          <n-input v-model:value="header" size="small" placeholder="表头数据(英文','分割)"></n-input>
        </div>
      </SettingItem>
    </setting-item-box>
    <setting-item-box :alone="false" name="表格样式">
      <SettingItem name="显示边框" :alone="true">
        <n-select v-model:value="(optionData as any).style.border" size="small" :options="borderFlag" />
      </SettingItem>
      <SettingItem name="底部边框" :alone="true">
        <n-select
          v-model:value="(optionData as any).style.bottomBordered"
          size="small"
          :options="bottom_borderedFlag"
        />
      </SettingItem>
      <SettingItem name="列分割线" :alone="true">
        <n-select v-model:value="(optionData as any).style.singleLine" size="small" :options="columnFlag" />
      </SettingItem>
      <SettingItem name="行分割线" :alone="true">
        <n-select v-model:value="(optionData as any).style.singleColumn" size="small" :options="lineFlag" />
      </SettingItem>
      <SettingItem name="斑马条纹" :alone="true">
        <n-select v-model:value="(optionData as any).style.striped" size="small" :options="stripedFlag" />
      </SettingItem>
      <setting-item name="字体大小" :alone="true">
        <n-input-number
          v-model:value="optionData.style.fontSize"
          :min="12"
          size="small"
          placeholder="字体大小"
        ></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box :alone="false" name="表头样式">
      <setting-item name="字体大小" :alone="true">
        <n-input-number
          v-model:value="optionData.style.headerFontSize"
          :min="12"
          size="small"
          placeholder="表头字体大小"
        ></n-input-number>
      </setting-item>
      <setting-item name="字体颜色" :alone="true">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.style.headerFontColor"></n-color-picker>
      </setting-item>
      <setting-item name="字体粗细" :alone="true">
        <n-select v-model:value="optionData.style.headerFontWeight" size="small" :options="fontWeightOptions" />
      </setting-item>
    </setting-item-box>

    <setting-item-box :alone="false" name="表体样式">
      <setting-item name="字体大小" :alone="true">
        <n-input-number
          v-model:value="optionData.style.bodyFontSize"
          :min="12"
          size="small"
          placeholder="表体字体大小"
        ></n-input-number>
      </setting-item>
      <setting-item name="字体颜色" :alone="true">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.style.bodyFontColor"></n-color-picker>
      </setting-item>
      <setting-item name="字体粗细" :alone="true">
        <n-select v-model:value="optionData.style.bodyFontWeight" size="small" :options="fontWeightOptions" />
      </setting-item>
      <setting-item name="行高" :alone="true">
        <n-input-number
          v-model:value="optionData.style.rowHeight"
          :min="20"
          :max="200"
          size="small"
          placeholder="行高"
        ></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box :alone="false" name="表格样式">
      <setting-item name="边框宽度" :alone="true">
        <n-input-number
          v-model:value="optionData.style.borderWidth"
          :min="0"
          size="small"
          placeholder="边框宽度"
        ></n-input-number>
      </setting-item>
      <setting-item name="边框颜色" :alone="true">
        <n-color-picker size="small" :modes="['rgb']" v-model:value="optionData.style.borderColor"></n-color-picker>
      </setting-item>
      <setting-item name="边框样式" :alone="true">
        <n-select v-model:value="optionData.style.borderStyle" size="small" :options="borderStyleFlag" />
      </setting-item>
      <SettingItem name="表格搜索（前端静态搜索）" :alone="true">
        <n-select v-model:value="optionData.inputShow" size="small" :options="inputSelect" />
      </SettingItem>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, watch, ref } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const page = [
  { label: '2', value: 2 },
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '30', value: 30 }
]
const borderFlag = [
  { label: '显示', value: 'on' },
  { label: '不显示', value: 'off' }
]
const columnFlag = [
  { label: '显示', value: 'off' },
  { label: '不显示', value: 'on' }
]
const lineFlag = [
  { label: '显示', value: 'off' },
  { label: '不显示', value: 'on' }
]
const bottom_borderedFlag = [
  { label: '显示', value: 'on' },
  { label: '不显示', value: 'off' }
]
const stripedFlag = [
  { label: '显示', value: 'on' },
  { label: '不显示', value: 'off' }
]
const borderStyleFlag = [
  { label: '实线边框', value: 'solid' },
  { label: '虚线边框', value: 'dashed' },
  { label: '点状边框', value: 'dotted' },
  { label: '双线边框', value: 'double' }
]
const inputSelect = [
  { label: '停用', value: 'none' },
  { label: '启用', value: 'flex' }
]
const showPaginationOptions = [
  { label: '显示', value: true },
  { label: '隐藏', value: false }
]
const fontWeightOptions = [
  { label: '正常', value: 'normal' },
  { label: '粗体', value: 'bold' },
  { label: '较粗', value: 'bolder' },
  { label: '较细', value: 'lighter' },
  { label: '100', value: '100' },
  { label: '200', value: '200' },
  { label: '300', value: '300' },
  { label: '400', value: '400' },
  { label: '500', value: '500' },
  { label: '600', value: '600' },
  { label: '700', value: '700' },
  { label: '800', value: '800' },
  { label: '900', value: '900' }
]
const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const header = ref()
const median = ref<string[]>([])
props.optionData.dataset.dimensions.forEach(item => {
  median.value.push(item.title)
})

//转string
watch(
  () => props.optionData,
  () => {
    median.value = []
    props.optionData.dataset.dimensions.forEach(item => {
      median.value.push(item.title)
    })
    header.value = median.value.toString()
  },
  {
    deep: false,
    immediate: true
  }
)

//更新columns
watch([header], ([headerNew], [headerOld]) => {
  if (headerNew !== headerOld) {
    headerNew.split(',').forEach((item: string, index: number) => {
      if (index + 1 <= props.optionData.dataset.dimensions.length) {
        props.optionData.dataset.dimensions[index].title = headerNew.split(',')[index]
      }
    })
  }
})
</script>
