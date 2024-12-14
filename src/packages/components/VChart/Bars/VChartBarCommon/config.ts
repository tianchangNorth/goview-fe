import { PublicConfigClass } from '@/packages/public'
import { VChartBarCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartBarCommonConfig.key
  public chartConfig = cloneDeep(VChartBarCommonConfig)
  // 图表配置项
  public option = cloneDeep(option)
}
