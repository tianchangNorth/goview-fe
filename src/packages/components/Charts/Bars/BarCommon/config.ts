import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']

export const seriesItem = {
  type: 'bar',
  barWidth: 15,
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: '#5470c6',
    borderRadius: 2
  },
  // 每个柱子的颜色配置
  itemColors: [],
  // 渐变配置
  gradient: {
    enabled: false,
    type: 'linear', // linear 或 radial
    direction: 'vertical', // vertical 或 horizontal
    startColor: '#667eea',
    endColor: '#764ba2'
  }
}
export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarCommonConfig.key
  public chartConfig = cloneDeep(BarCommonConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
