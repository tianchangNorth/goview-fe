<template>
  <!-- vCharts 全局设置 -->
  <VChartGlobalSetting :optionData="optionData"></VChartGlobalSetting>
  <!-- 饼图配制 -->
  <collapse-item name="饼图" expanded>
    <SettingItemBox name="图形">
      <setting-item name="内圈范围">
        <n-input-number v-model:value="optionData.innerRadius" :step="0.1" :min="0" size="small"></n-input-number>
      </setting-item>
      <setting-item name="外圈范围">
        <n-input-number v-model:value="optionData.outerRadius" :step="0.1" :min="0" size="small"></n-input-number>
      </setting-item>
      <setting-item name="中心轴X">
        <n-input v-model:value="optionData.centerX" :step="1" :min="0" size="small"></n-input>
      </setting-item>
      <setting-item name="中心轴Y">
        <n-input v-model:value="optionData.centerY" :step="1" :min="0" size="small"></n-input>
      </setting-item>
    </SettingItemBox>
    <SettingItemBox name="标签">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.label.visible" size="small"></n-switch>
          <n-text>展示标签</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="位置">
        <n-select v-model:value="optionData.label.position" :options="labelConfig.position" size="small" />
      </SettingItem>
      <FontStyle :style="toRefs(optionData.label.style)"></FontStyle>
    </SettingItemBox>
    <setting-item-box name="内环形">
      <setting-item name="可见性">
        <n-space>
          <n-switch v-model:value="extensionMarkRef" size="small" @update:value="markerHandle"></n-switch>
        </n-space>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import { VChartGlobalSetting } from '@/components/Pages/VChartItemSetting'
import FontStyle from '@/components/Pages/VChartItemSetting/common/FontStyle.vue'
import type { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { labelConfig } from '@/packages/chartConfiguration/vcharts/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})

const a = toRefs(props.optionData.label.style)

const extensionMarkRef = ref(!!props.optionData?.extensionMark)

const markerHandle = (value: boolean) => {
  if (value) {
    props.optionData.extensionMark = []
  } else {
    delete props.optionData.extensionMark
  }
}
</script>
