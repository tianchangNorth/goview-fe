<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    name="单折线面积图"
    :expanded="true"
  >
    <SettingItemBox name="线条">
      <SettingItem name="平滑">
        <n-space>
          <n-switch v-model:value="item.smooth" size="small" />
          <n-text>平滑效果</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="宽度">
        <n-input-number
          v-model:value="item.lineStyle.width"
          :min="1"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="类型">
        <n-select
          v-model:value="item.lineStyle.type"
          size="small"
          :options="lineConf.lineStyle.type"
        ></n-select>
      </SettingItem>
      <SettingItem name="自定义颜色">
        <n-space>
          <n-switch v-model:value="item.customColor.enabled" size="small" />
          <n-text>启用自定义颜色</n-text>
        </n-space>
      </SettingItem>
      <SettingItem v-if="item.customColor && item.customColor.enabled" name="线条颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.customColor.lineColor" placeholder="线条颜色"></n-color-picker>
      </SettingItem>
      <SettingItem v-if="item.customColor && item.customColor.enabled" name="渐变开始颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.customColor.gradientStart" placeholder="渐变开始颜色"></n-color-picker>
      </SettingItem>
      <SettingItem v-if="item.customColor && item.customColor.enabled" name="渐变结束颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.customColor.gradientEnd" placeholder="渐变结束颜色"></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox name="实心点">
      <SettingItem name="显示">
        <n-space>
          <n-switch v-model:value="item.showSymbol" size="small" />
          <n-text>显示实心点</n-text>
        </n-space>
      </SettingItem>
      <SettingItem name="大小">
        <n-input-number
          v-model:value="item.symbolSize"
          :min="1"
          :max="100"
          size="small"
          placeholder="自动计算"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <setting-item-box name="标签">
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.label.show" size="small" />
          <n-text>展示标签</n-text>
        </n-space>
      </setting-item>
      <setting-item name="大小">
        <n-input-number
          v-model:value="item.label.fontSize"
          size="small"
          :min="1"
        ></n-input-number>
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.label.color"
        ></n-color-picker>
      </setting-item>
      <setting-item name="位置">
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: 'top', value: 'top' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'bottom', value: 'bottom' },
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { lineConf } from '@/packages/chartConfiguration/echarts/index'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  },
})

// 确保series都有customColor配置
const ensureCustomColorConfig = (series: any[]) => {
  series.forEach((item: any) => {
    if (!item.customColor) {
      item.customColor = {
        enabled: false,
        lineColor: '',
        gradientStart: '',
        gradientEnd: ''
      }
    }
  })
}

const seriesList = computed(() => {
  const series = props.optionData.series
  if (Array.isArray(series)) {
    ensureCustomColorConfig(series)
  }
  return series
})
</script>
