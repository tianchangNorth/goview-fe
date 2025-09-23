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
import config, { includes, seriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
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
  const mergedOption = mergeTheme(props.chartConfig.option, props.themeSetting, includes)

  // 处理单个柱子颜色和渐变
  if (mergedOption.series && mergedOption.dataset) {
    mergedOption.series.forEach((series: any, seriesIndex: number) => {
      // 处理单个柱子颜色
      if (series.itemColors && series.itemColors.length > 0) {
        const colors = series.itemColors.map((itemColor: any) => itemColor.color)

        // 处理渐变
        if (series.gradient && series.gradient.enabled) {
          series.itemStyle.color = (params: any) => {
            const dataIndex = params.dataIndex
            const color = colors[dataIndex] || series.itemStyle.color || '#5470c6'

            if (series.gradient.type === 'linear') {
              // 线性渐变
              const coords = series.gradient.direction === 'vertical'
                ? [0, 0, 0, 1] // 垂直：从上到下
                : [0, 0, 1, 0] // 水平：从左到右

              return {
                type: 'linear',
                x: coords[0],
                y: coords[1],
                x2: coords[2],
                y2: coords[3],
                colorStops: [
                  {
                    offset: 0,
                    color: series.gradient.startColor
                  },
                  {
                    offset: 1,
                    color: series.gradient.endColor
                  }
                ]
              }
            } else {
              // 径向渐变
              return {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: series.gradient.startColor
                  },
                  {
                    offset: 1,
                    color: series.gradient.endColor
                  }
                ]
              }
            }
          }
        } else {
          // 纯色，为每个柱子设置不同颜色
          series.itemStyle.color = (params: any) => {
            return colors[params.dataIndex] || series.itemStyle.color || '#5470c6'
          }
        }
      } else if (series.gradient && series.gradient.enabled) {
        // 没有单个柱子颜色配置，但启用了渐变
        series.itemStyle.color = (params: any) => {
          if (series.gradient.type === 'linear') {
            const coords = series.gradient.direction === 'vertical'
              ? [0, 0, 0, 1]
              : [0, 0, 1, 0]

            return {
              type: 'linear',
              x: coords[0],
              y: coords[1],
              x2: coords[2],
              y2: coords[3],
              colorStops: [
                {
                  offset: 0,
                  color: series.gradient.startColor
                },
                {
                  offset: 1,
                  color: series.gradient.endColor
                }
              ]
            }
          } else {
            return {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: series.gradient.startColor
                },
                {
                  offset: 1,
                  color: series.gradient.endColor
                }
              ]
            }
          }
        }
      }
    })
  }

  return mergedOption
})

// dataset 无法变更条数的补丁
watch(
  () => props.chartConfig.option.dataset,
  (newData: { dimensions: any }, oldData) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return
      if (Array.isArray(newData?.dimensions)) {
        const seriesArr = []
        // 对oldData进行判断，防止传入错误数据之后对旧维度判断产生干扰
        // 此处计算的是dimensions的Y轴维度，若是dimensions.length为0或1，则默认为1，排除X轴维度干扰
        const oldDimensions = Array.isArray(oldData?.dimensions)&&oldData.dimensions.length >= 1 ? oldData.dimensions.length : 1; 
        const newDimensions = newData.dimensions.length >= 1 ? newData.dimensions.length : 1;
        const dimensionsGap = newDimensions - oldDimensions;
        if (dimensionsGap < 0) {
          props.chartConfig.option.series.splice(newDimensions - 1)
        } else if (dimensionsGap > 0) {
          if(!oldData || !oldData?.dimensions || !Array.isArray(oldData?.dimensions) || !oldData?.dimensions.length ) {
              props.chartConfig.option.series=[]
          }
          for (let i = 0; i < dimensionsGap; i++) {
            seriesArr.push(cloneDeep(seriesItem))
          }
          props.chartConfig.option.series.push(...seriesArr)
        }
        replaceMergeArr.value = ['series']
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
