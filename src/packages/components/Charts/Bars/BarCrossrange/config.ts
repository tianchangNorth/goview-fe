import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarCrossrangeConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem: any = {
  type: 'bar',
  barWidth: null,
  label: {
    show: true,
    position: 'right',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: null,
    borderRadius: 0
  },
  showBackground: false,
  backgroundStyle: {
    color: 'rgba(180, 180, 180, 0.2)'
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
    type: 'value',
  },
  yAxis: {
    show: true,
    type: 'category'
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarCrossrangeConfig.key
  public chartConfig = cloneDeep(BarCrossrangeConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
