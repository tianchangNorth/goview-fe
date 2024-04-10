import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlowChart07Config} from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
    outRect:80,
    outRectColor:'#2b93c6',
    backColor:'#0e457b'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = FlowChart07Config.key
    public chartConfig = cloneDeep(FlowChart07Config)
    public option = cloneDeep(option)
}
