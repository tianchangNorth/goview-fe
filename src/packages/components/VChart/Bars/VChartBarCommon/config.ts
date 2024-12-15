import { PublicConfigClass } from '@/packages/public'
import { VChartBarCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import { type ISpec } from '@visactor/vchart'

export const includes = ['legends']
export const option: ISpec & { dataset?: any } = {
  type: 'bar',
  dataset: data,
  stack: true,
  xField: 'type',
  yField: 'value',
  seriesField: 'country'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartBarCommonConfig.key
  public chartConfig = cloneDeep(VChartBarCommonConfig)
  // 图表配置项
  public option = vChartOptionPrefixHandle(option, includes)
}
