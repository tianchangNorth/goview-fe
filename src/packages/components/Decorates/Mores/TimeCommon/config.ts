import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TimeCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗'
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold'
}

export const option = {
  // 数据说明
  timeSize: 24,
  timeLineHeight: 50,
  timeTextIndent: 2,
  timeColor: '#E6F7FF',
  fontWeight: 'normal',

  // 渐变配置
  gradient: {
    enabled: false,
    type: 'linear', // linear 或 radial
    direction: 'horizontal', // horizontal 或 vertical
    angle: 360, // 自定义角度（0-360度）
    startColor: '#FFFFFF',
    startColorStop: 1.18, // 起始颜色位置（百分比）
    endColor: '#5D98FF',
    endColorStop: 100, // 结束颜色位置（百分比）
    useCustomStops: false // 是否使用自定义位置
  },

  //阴影
  showShadow:  true,
  hShadow: 0,
  vShadow: 0,
  blurShadow: 8,
  colorShadow: '#0075ff'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TimeCommonConfig.key
  public attr = { ...chartInitConfig, w: 300, h: 50, zIndex: -1 }
  public chartConfig = cloneDeep(TimeCommonConfig)
  public option = cloneDeep(option)
}
