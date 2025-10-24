import { PublicConfigClass } from '@/packages/public'
import { CapsuleChartConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'

import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const option = {
  dataset: dataJson,
  colors: ['#c4ebad', '#6be6c1', '#a0a7e6', '#96dee8', '#3fb1e3' ],
  unit: '',
  itemHeight: 10,
  valueFontSize: 16,
  paddingRight: 50,
  paddingLeft: 50,
  showValue: true,
  backgroundColor: 'rgba(180, 180, 180, 0.1)', // 背景色自定义
  textGap: 20 // 文本和柱子之间的间隔
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = CapsuleChartConfig.key
  public attr = { ...chartInitConfig, zIndex: -1 }
  public chartConfig = cloneDeep(CapsuleChartConfig)
  public option = cloneDeep(option)
}
