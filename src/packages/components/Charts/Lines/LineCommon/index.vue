<template>
  <v-chart
    ref="vChartRef"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :update-options="{
      replaceMerge: replaceMergeArr
    }"
    autoresize
  >
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, computed, watch, ref, nextTick } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import config, { includes, seriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
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

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
  const mergedOption = mergeTheme(props.chartConfig.option, props.themeSetting, includes)

  // 应用自定义颜色
  if (mergedOption.series) {
    mergedOption.series.forEach((series: any) => {
      if (series.customColor?.enabled) {
        // 设置线条颜色
        if (series.customColor.lineColor) {
          if (!series.lineStyle) series.lineStyle = {}
          series.lineStyle.color = series.customColor.lineColor
        }

        // 设置实心点颜色
        if (series.customColor.itemColor) {
          if (!series.itemStyle) series.itemStyle = {}
          series.itemStyle.color = series.customColor.itemColor
        }
      }
    })
  }

  // 处理稀疏X轴配置
  if (mergedOption.xAxis) {
    // 确保sparseAxis配置存在，提供默认值
    if (!mergedOption.xAxis.sparseAxis) {
      mergedOption.xAxis.sparseAxis = {
        enabled: false,
        maxLabels: 5,
        interval: 'auto'
      }
    }

    if (mergedOption.xAxis.sparseAxis.enabled) {
      const sparseConfig = mergedOption.xAxis.sparseAxis
      const xAxisData = mergedOption.dataset?.source?.map((item: any) => item[0]) || []

      if (xAxisData.length > 0) {
        let interval: string | number = 'auto'

        if (sparseConfig.interval !== 'auto') {
          interval = parseInt(sparseConfig.interval) as number
        } else {
          // 自动计算间隔以达到最大显示标签数
          const totalLabels = xAxisData.length
          const maxLabels = sparseConfig.maxLabels || 5

          if (totalLabels > maxLabels) {
            interval = Math.ceil(totalLabels / maxLabels)
          } else {
            interval = 0 // 显示所有标签
          }
        }

        // 应用稀疏配置
        if (!mergedOption.xAxis.axisLabel) {
          mergedOption.xAxis.axisLabel = {}
        }
        mergedOption.xAxis.axisLabel.interval = interval
      }
    }
  }

  return mergedOption
})

// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData: { dimensions: any }) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = []
        const currentSeries = props.chartConfig.option.series || []
        for (let i = 0; i < newData.dimensions.length - 1; i++) {
          // 保留现有series的配置，如果不存在则使用默认配置
          if (currentSeries[i]) {
            const existingSeries = cloneDeep(currentSeries[i])
            // 确保必要的属性存在，但保留用户自定义设置
            seriesArr.push({
              ...seriesItem,
              ...existingSeries,
              // 保留自定义颜色配置
              customColor: existingSeries.customColor || cloneDeep(seriesItem.customColor)
            })
          } else {
            seriesArr.push(cloneDeep(seriesItem))
          }
        }
        replaceMergeArr.value = ['series']
        props.chartConfig.option.series = seriesArr
        nextTick(() => {
          replaceMergeArr.value = []
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})
</script>
