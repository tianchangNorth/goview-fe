<template>
  <CollapseItem name="线条" :expanded="true">
    <SettingItemBox name="具体">
      <SettingItem name="宽度">
        <n-input-number
            size="small"
            v-model:value="optionData.boxWidth"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="高度">
        <n-input-number
            size="small"
            v-model:value="optionData.boxHeight"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="角尖高度">
        <n-input-number
            size="small"
            v-model:value="optionData.cornerTip"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="边框粗细">
        <n-input-number
            size="small"
            v-model:value="optionData.strokeWidth"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="起点颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.startColor"></n-color-picker>
      </SettingItem>
      <SettingItem name="终点颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.endColor"></n-color-picker>
      </SettingItem>
    </SettingItemBox>

  </CollapseItem>

</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

</script>
