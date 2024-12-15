<template>
  <!-- 图例 -->
  <Legends :optionData="optionData"></Legends>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'
import Legends from './Legends.vue'

const props = defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})
</script>
