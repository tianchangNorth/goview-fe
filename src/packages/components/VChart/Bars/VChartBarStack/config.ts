import { PublicConfigClass } from '@/packages/public'
import { VChartBarStackConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import { type ISpec } from '@visactor/vchart'

export const includes = ['legends']
export const option: ISpec & { dataset?: any } = {
  type: 'bar',
  dataset: data,
  xField: 'State',
  yField: 'Population',
  seriesField: 'Age',
  stack: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartBarStackConfig.key
  public chartConfig = cloneDeep(VChartBarStackConfig)
  // 图表配置项
  public option = vChartOptionPrefixHandle(option, includes)
}
