<template>
  <v-chart
    ref="vChartRef"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option.value"
    :update-options="{
      replaceMerge: replaceMergeArr
    }"
    autoresize
  >
  </v-chart>
</template>

<script setup lang="ts">
import { reactive, watch, PropType, nextTick, ref } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes, createSeriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { chartColorsSearch, defaultTheme } from '@/settings/chartThemes/index'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { useChartDataFetch } from '@/hooks'
import { isPreview, colorGradientCustomMerge} from '@/utils'
import isObject from 'lodash/isObject'
import { cloneDeep } from 'lodash'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])
const chartEditStore = useChartEditStore()

const option = reactive({
  value: {}
})

const replaceMergeArr = ref<string[]>()

// 渐变色处理
watch(
  () => chartEditStore.getEditCanvasConfig.chartThemeColor,
  (newColor: keyof typeof chartColorsSearch) => {
    try {
      if (!isPreview()) {
        const themeColor =
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[newColor] ||
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]
        props.chartConfig.option.series.forEach((value: any, index: number) => {
          // 使用循环的颜色索引，支持任意数量的series
          const colorIndex = (index % (chartColorsSearch[defaultTheme].length - 3)) + 3
          value.areaStyle.color = new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: themeColor[colorIndex]
            },
            {
              offset: 1,
              color: 'rgba(0,0,0, 0)'
            }
          ])
        })
      }
      option.value = mergeTheme(props.chartConfig.option, props.themeSetting, includes)
      props.chartConfig.option = option.value
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true
  }
)

// 动态处理数据集变化，支持任意数量的series
watch(
  () => props.chartConfig.option.dataset,
  (newData: { dimensions: any }) => {
    try {
      if (isObject(newData) && Array.isArray(newData?.dimensions)) {
        const currentSeries = props.chartConfig.option.series || []
        const requiredSeriesCount = newData.dimensions.length - 1
        const themeColor =
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[chartEditStore.getEditCanvasConfig.chartThemeColor] ||
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]

        if (currentSeries.length !== requiredSeriesCount) {
          const seriesArr = []
          for (let i = 0; i < requiredSeriesCount; i++) {
            // 保留现有series的配置，如果不存在则创建新的
            if (currentSeries[i]) {
              const existingSeries = cloneDeep(currentSeries[i])
              // 更新颜色以支持新的索引
              const colorIndex = (i % (chartColorsSearch[defaultTheme].length - 3)) + 3
              existingSeries.areaStyle.color = new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: themeColor[colorIndex]
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0, 0)'
                }
              ])
              seriesArr.push(existingSeries)
            } else {
              // 创建新的series
              const colorIndex = (i % (chartColorsSearch[defaultTheme].length - 3)) + 3
              seriesArr.push(createSeriesItem(colorIndex))
            }
          }
          replaceMergeArr.value = ['series']
          props.chartConfig.option.series = seriesArr
          nextTick(() => {
            replaceMergeArr.value = []
          })
        }
      }
      option.value = props.chartConfig.option
    } catch (error) {
      console.log(error)
      option.value = props.chartConfig.option
    }
  },
  {
    immediate: true,
    deep: false
  }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})
</script>
