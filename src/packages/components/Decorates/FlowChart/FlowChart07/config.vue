<template>
  <CollapseItem name="线条" :expanded="true">
    <SettingItemBox name="具体">
      <SettingItem name="大小">
        <n-input-number
            size="small"
            v-model:value="optionData.outRect"
        ></n-input-number>
      </SettingItem>
      <SettingItem name="外边框颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.outRectColor"></n-color-picker>
      </SettingItem>

      <SettingItem name="斜线背景颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backColor"></n-color-picker>
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
