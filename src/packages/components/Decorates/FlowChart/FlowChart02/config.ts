import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlowChart02Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    boxWidth:100,
    boxHeight:200,
    cornerTip:30,
    startColor:'#3cb1e4',
    endColor:'#144b6b',
    strokeWidth:3
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = FlowChart02Config.key
    public chartConfig = cloneDeep(FlowChart02Config)
    public option = cloneDeep(option)
}
