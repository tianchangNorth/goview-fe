import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlowChart03Config} from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    boxWidth:300,
    boxHeight:100,
    outBorderColor:'#045da2',
    inBorderColor:'#045da2',
    startColor:'#025596',
    endColor:'#052339',
    borderWidth:3
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = FlowChart03Config.key
    public chartConfig = cloneDeep(FlowChart03Config)
    public option = cloneDeep(option)
}
