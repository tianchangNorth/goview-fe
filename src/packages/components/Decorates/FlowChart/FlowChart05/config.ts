import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlowChart05Config} from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    outRect:80,
    outRectColor:'#2b93c6',
    backColor:'#0e457b'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = FlowChart05Config.key
    public chartConfig = cloneDeep(FlowChart05Config)
    public option = cloneDeep(option)
}
