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
  ></v-chart>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watch, PropType } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { mergeTheme } from '@/packages/public/chart'
import config, { includes, seriesItem } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import isObject from 'lodash/isObject'
import cloneDeep from 'lodash/cloneDeep'

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

use([DatasetComponent, CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData: { dimensions: any, source: any[] }) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return

      // 支持单个柱子颜色自定义
      if (Array.isArray(newData?.source) && newData.source.length > 0) {
        const seriesArr: any[] = []

        // 处理每个数据系列
        for (let i = 1; i < newData.dimensions.length; i++) {
          const itemSeries = cloneDeep(seriesItem)

          // 将数据转换为支持单个颜色的格式
          const seriesData = newData.source.map((item: any) => {
            const value = item[newData.dimensions[i]]
            const colorKey = `${newData.dimensions[i]}Color`
            const customColor = item[colorKey]

            if (customColor) {
              return {
                value: value,
                itemStyle: {
                  color: customColor
                }
              }
            }
            return value
          })

          itemSeries.data = seriesData
          itemSeries.name = newData.dimensions[i]
          seriesArr.push(itemSeries)
        }

        // 更新y轴数据
        const categoryNames = newData.source.map(item => item[newData.dimensions[0]])
        if (props.chartConfig.option.yAxis) {
          props.chartConfig.option.yAxis.data = categoryNames
        }

        replaceMergeArr.value = ['series', 'yAxis']
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
