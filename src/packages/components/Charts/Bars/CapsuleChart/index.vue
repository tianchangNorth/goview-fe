<template>
  <div
    v-if="state.mergedConfig"
    class="go-dv-capsule-chart"
    :style="{
      fontSize: numberSizeHandle(state.mergedConfig.valueFontSize),
      paddingLeft: numberSizeHandle(state.mergedConfig.paddingLeft),
      paddingRight: numberSizeHandle(state.mergedConfig.paddingRight)
    }"
  >
    <div class="label-column">
      <div
        v-for="item in state.mergedConfig.dataset.source"
        :key="item[state.mergedConfig.dataset.dimensions[0]]"
        :style="{ height: state.capsuleItemHeight, lineHeight: state.capsuleItemHeight }"
      >
        {{ item[state.mergedConfig.dataset.dimensions[0]] }}
      </div>
      <div class="laset">&nbsp;</div>
    </div>

    <div class="capsule-container">
      <div
        v-for="(capsule, index) in state.capsuleLength"
        :key="index"
        class="capsule-item"
        :style="{ height: state.capsuleItemHeight }"
      >
        <div
          class="capsule-item-column"
          :style="`width: ${capsule * 100}%; background-color: ${state.mergedConfig.colors[index % state.mergedConfig.colors.length]
            };height:calc(100% - ${2}px);`"
        >
          <div v-if="state.mergedConfig.showValue" class="capsule-item-value">
            {{ state.capsuleValue[index] }}
          </div>
        </div>
      </div>

      <div class="unit-label">
        <div v-for="(label, index) in state.labelData" :key="label + index">
          {{ label }}
        </div>
      </div>
    </div>

    <div v-if="state.mergedConfig.unit" class="unit-text">
      {{ state.mergedConfig.unit }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, reactive, computed, PropType } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import config, { option } from './config'
import cloneDeep from 'lodash/cloneDeep'

type DataProps = {
  name: string | number
  value: string | number
  [key: string]: string | number
}

interface StateProps {
  defaultConfig: {
    dataset: {
      dimensions: Array<string>
      source: Array<DataProps>
    }
    colors: Array<string>
    unit: string
    showValue: boolean
    itemHeight: number
    valueFontSize: number
    paddingLeft: number
    paddingRight: number
  }
  mergedConfig: any
  capsuleLength: Array<number>
  capsuleValue: Array<string | Object>
  labelData: Array<number>
  capsuleItemHeight: string
}

const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    default: () => ({})
  }
})

const state = reactive<StateProps>({
  defaultConfig: option,
  mergedConfig: null,
  capsuleLength: [],
  capsuleValue: [],
  labelData: [],
  capsuleItemHeight: ''
})

watch(
  () => props.chartConfig.option,
  newVal => {
    calcData(newVal)
  },
  {
    deep: true
  }
)

const calcData = (data: any, type?: string) => {
  let cloneConfig = cloneDeep(props.chartConfig.option || {})
  state.mergedConfig = cloneConfig
  if (type == 'preview') {
    cloneConfig.dataset = data
  }
  calcCapsuleLengthAndLabelData(state.mergedConfig.dataset)
}

// 数据解析
const calcCapsuleLengthAndLabelData = (dataset: any) => {
  try {
    const { source } = dataset
    if (!source) return

    if (source.length === 0) {
      // 清空数据
      state.capsuleLength = []
      state.labelData = []
      return
    }

    state.capsuleItemHeight = numberSizeHandle(state.mergedConfig.itemHeight)
    const capsuleValue = source.map((item: DataProps) => item[state.mergedConfig.dataset.dimensions[1]])

    const maxValue = Math.max(...capsuleValue)

    state.capsuleValue = capsuleValue

    // 生成规范刻度
    const labelData = generateNiceScale(maxValue, 6)
    state.labelData = labelData

    // 使用刻度最大值而不是数据最大值来计算柱状图长度
    const scaleMaxValue = Math.max(...labelData)
    state.capsuleLength = capsuleValue.map((v: any) => (scaleMaxValue ? v / scaleMaxValue : 0))
  } catch (error) {
    console.warn(error)
  }
}

const numberSizeHandle = (val: string | number) => {
  return val + 'px'
}

// 生成规范的刻度值
const generateNiceScale = (maxValue: number, tickCount: number = 6) => {
  if (maxValue === 0) return Array(tickCount).fill(0)

  // 计算合适的刻度间隔
  const range = maxValue
  const roughStep = range / (tickCount - 1)

  // 规范化刻度间隔到 1, 2, 5, 10, 20, 50, 100 等标准值
  const exponent = Math.floor(Math.log10(roughStep))
  const fraction = roughStep / Math.pow(10, exponent)

  let niceStep
  if (fraction <= 1) {
    niceStep = Math.pow(10, exponent)
  } else if (fraction <= 2) {
    niceStep = 2 * Math.pow(10, exponent)
  } else if (fraction <= 5) {
    niceStep = 5 * Math.pow(10, exponent)
  } else {
    niceStep = 10 * Math.pow(10, exponent)
  }

  // 计算起始值（调整为0或niceStep的整数倍）
  const niceMin = 0
  const niceMax = Math.ceil(maxValue / niceStep) * niceStep

  // 生成刻度数组
  const ticks = []
  for (let i = 0; i < tickCount; i++) {
    const value = niceMin + (i * niceStep)
    if (value <= niceMax) {
      ticks.push(Math.round(value))
    }
  }

  // 确保最大值被包含
  if (ticks[ticks.length - 1] < maxValue) {
    ticks.push(niceMax)
  }

  return ticks
}

// 安全地获取背景色
const backgroundColor = computed(() => {
  return state.mergedConfig?.backgroundColor || 'rgba(180, 180, 180, 0.1)'
})

// 安全地获取文本间隔
const textGap = computed(() => {
  return (state.mergedConfig?.textGap || 20) + 'px'
})

onMounted(() => {
  calcData(props.chartConfig.option)
})

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  calcData(newData, 'preview')
})
</script>

<style lang="scss" scoped>
@include go('dv-capsule-chart') {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 20px;
  padding-right: 50px;
  color: #b9b8cc;

  .label-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 10px;
    text-align: right;

    >div:not(:last-child) {
      margin: 5px v-bind('textGap');
    }
  }

  .capsule-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .capsule-item {
    height: 10px;
    margin: 5px 0px;
    background-color: v-bind('state.mergedConfig?.backgroundColor || "rgba(180, 180, 180, 0.1)"');

    .capsule-item-column {
      position: relative;
      height: 8px;
      margin-top: 1px;
      transition: all 0.3s;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .capsule-item-value {
        padding-left: 10px;
        transform: translateX(100%);
      }
    }
  }

  .unit-label {
    height: 20px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .unit-text {
    text-align: right;
    display: flex;
    align-items: flex-end;
    line-height: 20px;
    margin-left: 10px;
  }
}
</style>
