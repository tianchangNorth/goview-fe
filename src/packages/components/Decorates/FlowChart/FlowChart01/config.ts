import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlowChart01Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    endWidth: 15,
    lineLength: 150,//水平层级距离
    lineWidth:2,//线条粗细
    lineNum:2,//向下数量
    lineNumUp:2,//向上数量
    lineColLength:50,//纵向层级距离
    backgroundCol:'#303a4c',//线条背景
    animateCol:'#3788ea'//流动动画背景
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = FlowChart01Config.key
    public chartConfig = cloneDeep(FlowChart01Config)
    public option = cloneDeep(option)
}
