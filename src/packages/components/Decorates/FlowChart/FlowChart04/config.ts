import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlowChart04Config} from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    outCircle:15,
    inCircle:5,
    outCircleColor:'#3f5261',
    inCircleColor:'#fff',
    outCircleWidth:2
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = FlowChart04Config.key
    public chartConfig = cloneDeep(FlowChart04Config)
    public option = cloneDeep(option)
}
